import { ProductCard } from './ProductCard.ts'
import { ensureElement } from '../../utils/utils.ts'
import { categoryMap,  CDN_URL } from '../../utils/constants.ts'

export class CatalogueItem extends ProductCard {
  protected categoryElement: HTMLElement;
  protected imageElement: HTMLImageElement;

  constructor(container: HTMLElement, actions: { onClick: () => void }) {
    super(container);
    this.categoryElement = ensureElement<HTMLElement>('.card__category', this.container);
    this.imageElement = ensureElement<HTMLImageElement>('.card__image', this.container);
    this.container.addEventListener('click', actions.onClick);
  }

  set category(value: string) {
    this.categoryElement.textContent = value;
    for (const key in categoryMap) {
      this.categoryElement.classList.toggle(
        categoryMap[key as keyof typeof categoryMap],
        key === value
      );
    }
  }

  set image (value: string) {
    this.imageElement.setAttribute('src',  CDN_URL + value);
  }
}