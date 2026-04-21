import { ProductCard } from './ProductCard.ts'
import { ensureElement } from '../../utils/utils.ts'
import { categoryMap, CDN_URL  } from '../../utils/constants.ts'
import { IEvents } from '../base/Events.ts';

export class CardPreview extends ProductCard {
  protected categoryElement: HTMLElement;
  protected descriptionElement: HTMLElement;
  protected imageElement: HTMLImageElement;
  protected buttonElement: HTMLButtonElement;

  constructor(container: HTMLElement, events: IEvents) {
    super(container);
    this.categoryElement = ensureElement<HTMLElement>('.card__category', this.container);
    this.descriptionElement = ensureElement<HTMLElement>('.card__text', this.container);
    this.imageElement = ensureElement<HTMLImageElement>('.card__image', this.container);
    this.buttonElement = ensureElement<HTMLButtonElement>('.card__button', this.container);
    this.buttonElement.addEventListener('click', () => {
      events.emit('card:click');
    });
    };


  set category(value: string) {
    this.categoryElement.textContent = value;
    for (const key in categoryMap) {
      this.categoryElement.classList.toggle(
        categoryMap[key as keyof typeof categoryMap],
        key === value
      );
    }
  }

  set description (value: string) {
    this.descriptionElement.textContent = value;
  }
  
  set image (value: string) {
    this.imageElement.setAttribute('src',  CDN_URL + value);
  }

    set buttonState (value: { text: string, disabled: boolean }) {
      this.buttonElement.textContent = value.text;
      this.buttonElement.disabled = value.disabled;
  }

    }