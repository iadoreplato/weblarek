import  { IProduct } from '../../types/index' 

export class Cart {
  protected _selectedProducts: IProduct[];

  constructor() {
    this._selectedProducts = [];
  }

  getSelectedProducts(): IProduct[] {
    return this._selectedProducts;
  }

  addProduct(product: IProduct):  void {
    this._selectedProducts.push(product);
  }

  deleteProduct(product: IProduct): void {
   this._selectedProducts.splice(this._selectedProducts.indexOf(product), 1);
  }

  clearCart(): void {
    this._selectedProducts = [];
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