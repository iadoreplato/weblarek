import { ModalData } from '../../types/index.ts'
import { Component } from '../base/Component.ts'
import { ensureElement } from '../../utils/utils.ts'

export class Modal extends Component<ModalData> {
  protected closeButton: HTMLButtonElement;
  protected modalContent: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);
    this.closeButton = ensureElement<HTMLButtonElement>('.modal__close', this.container);
    this.modalContent = ensureElement<HTMLElement>('.modal__content', this.container);
    this.closeButton.addEventListener('click', () => {
    this.close();
    });
    this.container.addEventListener('click', (e) => {
       if (e.target === this.container) {
        this.close()
      }
    });
  }
  
  set content (item: HTMLElement) {
    this.modalContent.replaceChildren(item);
  }
  open() {
      this.container.classList.add('modal_active');
  }

  close() {
    this.container.classList.remove('modal_active');
  }
}