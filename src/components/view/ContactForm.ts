import { Form } from './Form.ts'
import { ensureElement } from '../../utils/utils.ts'
import { IEvents } from '../base/Events.ts' 
import { ContactData } from '../../types/index.ts';

export class ContactForm extends Form<ContactData> {
  protected emailInputElement: HTMLInputElement;
  protected phoneInputElement: HTMLInputElement;

  constructor(container: HTMLElement, events: IEvents) {
    super(container, events, 'order:pay' );
    this.emailInputElement = ensureElement<HTMLInputElement>('[name=email]', this.container);
    this.phoneInputElement = ensureElement<HTMLInputElement>('[name=phone]', this.container);
    this.emailInputElement.addEventListener('input', () => {
      events.emit('contacts:changed', { email: this.emailInputElement.value })
    });
     this.phoneInputElement.addEventListener('input', () => {
      events.emit('contacts:changed', { phone: this.phoneInputElement.value })
    });
  }

set email (value: string) {
  this.emailInputElement.value = value;
  }

set phone (value: string) { 
   this.phoneInputElement.value = value;
  }
}