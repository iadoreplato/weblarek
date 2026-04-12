import { CartData } from '../../types/index.ts'
import { Component } from '../base/Component.ts'
import { ensureElement } from '../../utils/utils.ts'
import { IEvents } from '../base/Events.ts'

export class CartView extends Component<CartData> {
  protected productList: HTMLElement;
  protected totalAmountElement: HTMLElement;
  protected orderButton: HTMLButtonElement;

  constructor(container: HTMLElement, events: IEvents) {
    super(container);
    this.productList = ensureElement<HTMLElement>('.basket__list', this.container);
    this.totalAmountElement = ensureElement<HTMLElement>('.basket__price', this.container);
    this.orderButton = ensureElement<HTMLButtonElement>('.basket__button', this.container);
    this.orderButton.addEventListener('click', () => {
      events.emit('cart:purchase')
    });
  }

  set content (items: HTMLElement[]) {
    this.productList.replaceChildren(...items);
    if (items.length === 0) {
      this.orderButton.setAttribute('disabled', '');
  } else {
      this.orderButton.removeAttribute('disabled');
  }
  }

  set totalAmount (value: number) {
    this.totalAmountElement.textContent = String(value) + ' синапсов';
  }
}