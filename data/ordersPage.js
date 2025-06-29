import { orders } from './data/orders.js';
import { products } from './data/products.js';

export function renderOrdersPage() {
  let ordersHTML = '';

  orders.forEach((order) => {
    let productsHTML = '';

    order.cartItems.forEach((cartItem) => {
      const product = products.find(p => p.id === cartItem.productId);

      productsHTML += `
        <div class="product-image-container">
          <img src="${product.image}">
        </div>
        <div class="product-details">
          <div class="product-name">${product.name}</div>
          <div class="product-delivery-date">Arriving on: ${order.estimatedDelivery}</div>
          <div class="product-quantity">Quantity: ${cartItem.quantity}</div>
          <button class="buy-again-button button-primary">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>
        <div class="product-actions">
          <a href="tracking.html">
            <button class="track-package-button button-secondary">Track package</button>
          </a>
        </div>
      `;
    });

    ordersHTML += `
      <div class="order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${order.orderDate}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${order.totalPrice.toFixed(2)}</div>
            </div>
          </div>
          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>
        <div class="order-details-grid">${productsHTML}</div>
      </div>
    `;
  });

  document.querySelector('.orders-grid').innerHTML = ordersHTML;
}
