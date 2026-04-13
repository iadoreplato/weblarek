import { Catalogue } from './components/models/catalogue.ts';
import { Cart } from './components/models/cart.ts';
import { Buyer } from './components/models/buyer.ts';
import { ShopApi } from './components/base/ShopApi.ts';
import { Api } from './components/base/Api.ts';
import { API_URL } from './utils/constants.ts';
import { EventEmitter } from './components/base/Events.ts';
import { IBuyer, IProduct } from './types/index.ts';
import './scss/styles.scss';
import { Gallery } from './components/view/Gallery.ts';
import { Header } from './components/view/Header.ts';
import { Modal } from './components/view/Modal.ts';
import { CatalogueItem } from './components/view/CatalogueItem.ts';
import { BasketProductCard } from './components/view/BasketProductCard.ts';
import { cloneTemplate, ensureElement } from './utils/utils.ts';
import { CardPreview } from './components/view/CardPreview.ts';
import { CartView } from './components/view/CartView.ts';
import { OrderForm } from './components/view/OrderForm.ts'
import { ContactForm } from './components/view/ContactForm.ts';
import { OrderSuccess } from './components/view/OrderSuccess.ts';
const events = new EventEmitter();
const api = new Api(API_URL);
const shopApi = new ShopApi(api);
const catalogue = new Catalogue(events);
const cart = new Cart(events);
const buyer = new Buyer(events);

shopApi.getProducts().then((products) => {
    catalogue.setProducts(products);
}).catch(err => console.error(err));


const gallery = new Gallery(ensureElement<HTMLElement>('.gallery'));
const header = new Header(ensureElement<HTMLElement>('.header'), events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'));
const cardPreview = new CardPreview(cloneTemplate('#card-preview')); 
const cartView = new CartView(cloneTemplate('#basket'), events);
const orderForm = new OrderForm(cloneTemplate('#order'), events);
const contactForm = new ContactForm(cloneTemplate('#contacts'), events);
const orderSuccess = new OrderSuccess(cloneTemplate('#success'), events);

events.on('catalogue:products-changed', () => {
    const cards = catalogue.getAllProducts().map((product) => {
        const card = new CatalogueItem(cloneTemplate('#card-catalog'), {
            onClick: () => events.emit('card:selected', product)
        });
        return card.render(product);
    });
    gallery.render({ catalogue: cards });
});

events.on('card:selected', (product: IProduct) => {
    cardPreview.setOnClick(() => {
        if (cart.isAvailable(product.id)) {
            cart.deleteProduct(product)
        } else {
            cart.addProduct(product)
        }
        modal.close();
    });
    const isInCart = cart.isAvailable(product.id);
    modal.render({
        content: cardPreview.render({
            ...product,
            buttonState: {
                text: product.price === null ? 'Недоступно' : isInCart ? 'Удалить из корзины' : 'В корзину',
                disabled: product.price === null
            }
        })
    });
    modal.open();
});



events.on('cart:delete', (data: { id: string }) => {
    const product = catalogue.getProduct(data.id);
    if (!product) return;
    cart.deleteProduct(product);
});

events.on('cart:changed', () => {
    header.render({ counter: cart.getTotalNumber() });
    const cards = cart.getSelectedProducts().map((product, index) => {
        const card = new BasketProductCard(cloneTemplate('#card-basket'), {
            onClick: () => events.emit('cart:delete', { id: product.id })
        });
        card.counter = index + 1;
        return card.render(product);
    });
    cartView.content = cards;
    cartView.totalAmount = cart.getTotalPrice();
});

events.on('cart:open', () => {
    modal.render({
        content: cartView.render()
    });
    modal.open();
})

let activeForm: 'order' | 'contacts' | null = null;

events.on('cart:purchase', () => {
    activeForm = 'order';
    const buyerData = buyer.getBuyerData();
    const errors = buyer.dataValidation(buyerData);
    const isValid = !errors.payment && !errors.address;
    modal.render({
        content: orderForm.render({ 
            valid: isValid, 
            error: errors.payment ?? errors.address ?? '' ,
            addressInput: buyerData.address,
            paymentMethod: buyerData.payment
        })
    });
    modal.open();
});

events.on('order:changed', (data: Partial<IBuyer>) => {
    buyer.setPurchaseData(data);
});

events.on('contacts:changed', (data: Partial<IBuyer>) => {
    buyer.setPurchaseData(data);
});

events.on('buyer:data-changed', () => {
    const errors = buyer.dataValidation(buyer.getBuyerData());
    if (activeForm === 'order') {
        const isValid = !errors.payment && !errors.address;
        const buyerData = buyer.getBuyerData();
         orderForm.render({ 
            valid: isValid, 
            error: errors.payment ?? errors.address ?? '',
            paymentMethod: buyerData.payment,
            addressInput: buyerData.address
        });
    }
    if (activeForm === 'contacts') {
        const isValid = !errors.email && !errors.phone;
        contactForm.render({ valid: isValid, error: errors.email ?? errors.phone ?? '' });
    }
});

events.on('order:next', () => {
    activeForm = 'contacts';
    modal.render({
        content: contactForm.render({ valid: false, error: '' })
    })
    modal.open();
});


events.on('order:pay', () => {
    const items = cart.getSelectedProducts().map(item => item.id);
    const total = cart.getTotalPrice();
    shopApi.createOrder({
        ...buyer.getBuyerData(),
        items: items,
        total: total
    }).then(() => {
        cart.clearCart();
        buyer.clearBuyerData();
        modal.render({
            content: orderSuccess.render({
                totalAmount: total
            })
        });
        modal.open();
    }).catch(err => console.error(err));
})

events.on('order:success', () => {
    modal.close();
})