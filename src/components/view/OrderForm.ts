import { Form } from './Form.ts'
import { ensureElement } from '../../utils/utils.ts'
import { OrderData, TPayment } from '../../types/index.ts';
import { IEvents } from '../base/Events.ts' 

export class OrderForm extends Form<OrderData> {
  protected addressInputElement: HTMLInputElement;
  protected cardButtonElement: HTMLButtonElement;
  protected cashButtonElement: HTMLButtonElement

  constructor(container: HTMLElement, events: IEvents) {
    super(container, events, 'order:next');
    this.addressInputElement = ensureElement<HTMLInputElement>('.form__input', this.container);
    this.cardButtonElement = ensureElement<HTMLButtonElement>('[name=card]', this.container);
    this.cashButtonElement = ensureElement<HTMLButtonElement>('[name=cash]', this.container);
    this.addressInputElement.addEventListener('input', () => {
      events.emit('order:changed', { address: this.addressInputElement.value })
    });
     this.cardButtonElement.addEventListener('click', () => {
      events.emit('order:changed', { payment: 'card' })
    });
      this.cashButtonElement.addEventListener('click', () => {
      events.emit('order:changed', { payment: 'cash' })
    });
  }

set paymentMethod(value: TPayment) {
    this.cardButtonElement.classList.toggle('button_alt-active', value === 'card');
    this.cashButtonElement.classList.toggle('button_alt-active', value === 'cash');
}

set addressInput(value: string) { 
      this.addressInputElement.value = value;
  }
}