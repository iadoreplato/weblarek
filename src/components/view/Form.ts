import { FormData } from '../../types/index.ts'
import { Component } from '../base/Component.ts'
import { ensureElement } from '../../utils/utils.ts'
import { IEvents } from '../base/Events.ts'

export abstract class Form<T extends FormData = FormData> extends Component<T>  {
  protected submitButton: HTMLButtonElement
  protected errorField: HTMLElement

  constructor(container: HTMLElement, events: IEvents, submitEvent: string) {
    super(container);
    this.submitButton = ensureElement<HTMLButtonElement>('[type=submit]', this.container);
    this.errorField = ensureElement<HTMLElement>('.form__errors', this.container);
    this.container.addEventListener('submit', (e) => {
      e.preventDefault();
      events.emit(submitEvent);
    });
  }

  set valid (value: boolean) {
    if (value === true) {
      this.submitButton.removeAttribute('disabled')
    } else this.submitButton.setAttribute('disabled', '');
  }

  set error (value: string) { 
      this.errorField.textContent = value;
  }
}