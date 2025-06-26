import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { loadProducts, loadProductsFetch } from '../data/products.js';
import { cart, loadCart } from '../data/cart.js';
import { products } from '../data/products.js';
import { addOrder } from '../data/orders.js';

async function loadPage() {
  try {
    await loadProductsFetch();

    await new Promise((resolve) => {
      loadCart(() => {
        resolve();
      });
    });

    const quantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelector('.js-cart-quantity').textContent =
      `${quantity} ${quantity === 1 ? 'item' : 'items'}`;

    renderOrderSummary();
    renderPaymentSummary();
  } catch (error) {
    console.log('Unexpected error. Please try again later.');
  }
}

loadPage();

document.querySelector('.place-order-button')
  .addEventListener('click', () => {
    const orderId = crypto.randomUUID();

    const orderDate = new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric'
    });

    const estimatedDelivery = new Date(Date.now() + 4 * 24 * 60 * 60 * 1000)
      .toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric'
      });

    const totalPrice = cart.reduce((sum, item) => {
      const product = products.find(p => p.id === item.productId);
      return sum + (product.priceCents * item.quantity) / 100;
    }, 0);

    addOrder({
      id: orderId,
      orderDate,
      estimatedDelivery,
      totalPrice,
      cartItems: [...cart]
    });

    cart.length = 0;
    localStorage.setItem('cart', JSON.stringify(cart));

    window.location.href = 'orders.html';
  });


/*
Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  })

]).then((values) => {
  console.log(values);
  renderOrderSummary();
  renderPaymentSummary();
});
*/

/*
new Promise((resolve) => {
  loadProducts(() => {
    resolve('value1'); 
  });

}).then((value) => {
  console.log(value);

  return new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  });

}).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
});
*/

/*
loadProducts(() => {
  loadCart(() => {
    renderOrderSummary();
    renderPaymentSummary();
  });
});
*/
