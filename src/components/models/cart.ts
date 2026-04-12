import  { IProduct } from '../../types/index' 
import { IEvents } from '../base/Events.ts';

export class Cart {
  protected _selectedProducts: IProduct[];
  protected _events: IEvents;
  
  constructor(events: IEvents) {
    this._selectedProducts = [];
    this._events = events;
  }

  getSelectedProducts(): IProduct[] {
    return this._selectedProducts;
  }

  addProduct(product: IProduct):  void {
    this._selectedProducts.push(product);
    this._events.emit('cart:changed');
  }

  deleteProduct(product: IProduct): void {
   this._selectedProducts.splice(this._selectedProducts.indexOf(product), 1);
   this._events.emit('cart:changed');
  }

  clearCart(): void {
    this._selectedProducts = [];
    this._events.emit('cart:changed');
  } 

  getTotalNumber(): number {
    return this._selectedProducts.length;
    }

  getTotalPrice(): number {
  return this._selectedProducts.reduce((amount, product) => {
    return amount + (product.price ?? 0);
    }, 0);
  }

  isAvailable(id: string): boolean {
     return this._selectedProducts.some((product) => product.id === id);
  }
}