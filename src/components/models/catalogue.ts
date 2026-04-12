import  { IProduct } from '../../types/index'
import { IEvents } from '../base/Events.ts'

export class Catalogue {
  protected _products: IProduct[] ;
  protected _productCard: IProduct | null;
  protected _events: IEvents;
  
  constructor(events: IEvents) {
    this._products = [];
    this._productCard = null;
    this._events = events;
  }

  setProducts(products: IProduct[]): void {
    this._products = products;
    this._events.emit('catalogue:products-changed');
  }

  getAllProducts(): IProduct[] {
    return this._products;
  }

  getProduct(id: string): IProduct | undefined {
    const product = this._products.find((product) => product.id === id);
    return product;
  }

  setProductCard(productCard: IProduct): void {
    this._productCard = productCard;
    this._events.emit('catalogue:card-changed');
  }

  getProductCard(): IProduct | null {
    return this._productCard;
  }
}