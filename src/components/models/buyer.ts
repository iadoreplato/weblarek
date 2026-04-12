import  { IBuyer } from '../../types/index.ts'
import { IEvents } from '../base/Events.ts';

export class Buyer {
protected _buyer: IBuyer  = {
    payment: '',
    email: '',
    phone: '',
    address: ''
};
protected _events: IEvents;

  constructor(events: IEvents) {
  this._events = events;
  }


getBuyerData(): IBuyer {
  return this._buyer;
}

clearBuyerData(): void {
  this._buyer = {
    payment: '',
    email: '',
    phone: '',
    address: ''
};
this._events.emit('buyer:data-changed');
}

setPurchaseData(data: Partial<IBuyer>): void {
this._buyer = {...this._buyer, ...data};
this._events.emit('buyer:data-changed');
}

dataValidation(data: Partial<IBuyer>): Partial<Record<keyof IBuyer, string>> {
const inputValidation: Partial<Record<keyof IBuyer, string>>  = {}
  if (!data.address) inputValidation.address = 'Укажите адрес';
  if (!data.email) inputValidation.email = 'Укажите имэйл';
  if (!data.payment) inputValidation.payment = 'Укажите способ оплаты';
  if (!data.phone) inputValidation.phone = 'Укажите телефон';
return inputValidation;
}
}