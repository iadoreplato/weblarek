import { Buyer } from './components/models/buyer.ts';
import { Catalogue } from './components/models/catalogue.ts';
import { Cart } from './components/models/cart.ts';
import { ShopApi } from './components/base/ShopApi.ts';
import { Api } from './components/base/Api.ts';
import { API_URL } from './utils/constants.ts';
import { apiProducts } from './utils/data.ts';
import './scss/styles.scss';

const productsModel = new Catalogue();
productsModel.setProducts(apiProducts.items);
console.log('Массив товаров из каталога:', productsModel.getAllProducts());
console.log('Один товар по id:', productsModel.getProduct('854cef69-976d-4c2a-a18c-2aa45046c390'));
productsModel.setProductCard(apiProducts.items[0]);
console.log('Выбрана карточка', productsModel.getProductCard());

const shoppingCart = new Cart();
shoppingCart.addProduct(apiProducts.items[0]);
shoppingCart.addProduct(apiProducts.items[1]);
shoppingCart.addProduct(apiProducts.items[2]); 
console.log('Выбраны товары:', shoppingCart.getSelectedProducts());
console.log('Общее количество товаров:', shoppingCart.getTotalNumber());
console.log('Общая сумма:', shoppingCart.getTotalPrice());
shoppingCart.deleteProduct(apiProducts.items[0]);
console.log('Выбраны товары послу удаления 1 товара:', shoppingCart.getSelectedProducts());
shoppingCart.clearCart();
console.log('Выбраны товары после очистки корзины:', shoppingCart.getSelectedProducts());

let buyer1 = new Buyer();
buyer1.setPurchaseData({email: 'email@email.com', phone: '9977786'});
console.log('Данные покупателя:', buyer1.getBuyerData());
console.log('Валидация (не все поля):', buyer1.dataValidation(buyer1.getBuyerData()));
buyer1.setPurchaseData({address: 'Альфа-Центавра', payment: 'cash'});
console.log('Валидация (все поля):', buyer1.dataValidation(buyer1.getBuyerData()));
buyer1.clearBuyerData();
console.log('Валидация (после очистки):', buyer1.dataValidation(buyer1.getBuyerData()));

const api = new Api(API_URL);
const shopApi = new ShopApi(api);
shopApi.getProducts().then((products) => {
productsModel.setProducts(products);
console.log('Товары с сервера:', productsModel.getAllProducts());
});
console.log('API_URL:', API_URL);