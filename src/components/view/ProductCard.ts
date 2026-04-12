import { ProductCardData } from '../../types/index.ts'
import { Component } from '../base/Component.ts'
import { ensureElement } from '../../utils/utils.ts'

export abstract class ProductCard extends Component<ProductCardData> {
  protected titleElement: HTMLElement;
  protected priceElement: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);
    this.titleElement = ensureElement<HTMLElement>('.card__title', this.container);
    this.priceElement = ensureElement<HTMLElement>('.card__price', this.container);
    }

  set title (value: string) {
    this.titleElement.textContent = value;
  }

  set price (value: number | null) {
       this.priceElement.textContent = value ? String(value) + ' синапсов' : 'Бесценно';
  }
}
