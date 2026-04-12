import { HeaderData } from '../../types/index.ts'
import { Component } from '../base/Component.ts'
import { ensureElement } from '../../utils/utils.ts'
import { IEvents } from '../base/Events.ts'

export class Header extends Component<HeaderData> {
  protected basketButton: HTMLButtonElement;
  protected counterElement: HTMLElement;

  constructor(container: HTMLElement, events: IEvents) {
    super(container);
    this.basketButton = ensureElement<HTMLButtonElement>('.header__basket', this.container);
    this.counterElement = ensureElement<HTMLButtonElement>('.header__basket-counter', this.container);
    this.basketButton.addEventListener('click', () => {
      events.emit('cart:open')
    });
  }
  
  set counter (value: number) {
    this.counterElement.textContent = String(value);
  }
}
