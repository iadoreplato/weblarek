import { IApi, IProduct, IOrderRequest, IOrderResponse, IProductsList } from '../../types/index.ts';

export class ShopApi {
  protected _api: IApi;

  constructor(api: IApi) {
    this._api = api;
  }

 getProducts(): Promise<IProduct[]> {
  return this._api.get<IProductsList>('/product/').then((data) => data.items);
 }

 createOrder(order: IOrderRequest): Promise<IOrderResponse> {
  return this._api.post('/order/', order);
 }
}