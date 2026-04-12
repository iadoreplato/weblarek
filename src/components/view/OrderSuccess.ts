import { OrderSuccessData } from '../../types/index.ts'
import { Component } from '../base/Component.ts'
import { ensureElement } from '../../utils/utils.ts'
import { IEvents } from '../base/Events.ts' 

export class OrderSuccess extends Component<OrderSuccessData> {
  protected amountElement: HTMLElement;
  protected nextButton: HTMLButtonElement;

  constructor(container: HTMLElement, events: IEvents) {
    super(container);
    this.amountElement = ensureElement<HTMLElement>('.order-success__description', this.container);
    this.nextButton = ensureElement<HTMLButtonElement>('.order-success__close', this.container);
    this.nextButton.addEventListener('click', () => {
      events.emit('order:success');
    })
  }
  
  set totalAmount (value: number) {
    this.amountElement.textContent = String(value) + ' синапсов';
  }
}