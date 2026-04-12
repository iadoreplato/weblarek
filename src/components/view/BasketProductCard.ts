import { ProductCard } from './ProductCard.ts'
import { ensureElement } from '../../utils/utils.ts'

export class BasketProductCard extends ProductCard {
  protected counterElement: HTMLElement;
  protected trashBinElement: HTMLButtonElement;

  constructor(container: HTMLElement, actions: { onClick: () => void }) {
    super(container);
    this.counterElement = ensureElement<HTMLElement>('.basket__item-index', this.container);
    this.trashBinElement = ensureElement<HTMLButtonElement>('.basket__item-delete', this.container);
    this.trashBinElement.addEventListener('click', actions.onClick)
  }

set counter (value: number) {
  this.counterElement.textContent = String(value);
}
}