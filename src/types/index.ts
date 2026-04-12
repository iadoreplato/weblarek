export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';
export type TPayment = 'card'|'cash'|'';
export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export interface IProduct {
  id: string,
  description: string,
  image: string,
  title: string, 
  category: string,
  price: number | null
}

export interface IBuyer {
  payment: TPayment,
  email: string,
  phone: string,
  address: string; 
} 

export interface IProductsList {
  total: number,
  items: IProduct[],
} 
export interface IOrderRequest extends IBuyer {
  items: string[],
  total: number,
}
export interface IOrderResponse {
  id: string,
  total: number,
}

export interface ProductCardData {
  title: string,
  price: number | null,
  buttonState?: { text: string, disabled: boolean }
}

export interface CatalogueItemData {
  category: string,
  image: string
}

export interface CardPreviewData {
  category: string,
  description: string,
  image: string,
}

export interface BasketProductCardData {
  counter: number
}

export interface CartData {
  content: HTMLElement[],
  totalAmount: number
}
export interface FormData {
  valid: boolean,
  error: string
}

export interface OrderData {
  addressInput : string,
  paymentMethod: TPayment,
  valid: boolean,
  error: string
}

export interface ContactData extends FormData {
  email: string,
  phone: string
}

export interface ModalData {
  content: HTMLElement
}
export interface OrderSuccessData {
  totalAmount: number
}
export interface HeaderData {
 counter: number 
}
export interface GalleryData {
 catalogue: HTMLElement[]
}