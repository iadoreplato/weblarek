import  { IProduct } from '../../types/index'
export class Catalogue {
  protected _products: IProduct[] ;
  protected _productCard: IProduct | null;

  constructor() {
    this._products = [];
    this._productCard = null;
  }

  setProducts(products: IProduct[]): void {
    this._products = products;
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
  }

  getProductCard(): IProduct | null {
    return this._productCard;
  }
}