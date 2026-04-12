import { GalleryData } from '../../types/index.ts'
import { Component } from '../base/Component.ts'

export class Gallery extends  Component<GalleryData>{
  constructor(container: HTMLElement) {
    super(container);
  }
  set catalogue (items: HTMLElement[]) {
    this.container.replaceChildren(...items);
  }
}