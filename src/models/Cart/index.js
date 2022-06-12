import createElement from '../createElement/create-element.js';
import escapeHtml from '../escapeHtml/escape-html.js';

import Modal from '../Modal/index.js';

import "./index.css";

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
    this.addEventListeners();
  }

  addProduct(product) {
    if (product !== undefined && product !== null) {
      const card = {
        product: product,
        count: 1
      };
      const indexCard = this.cartItems.findIndex(item => item.product.name === product.name);

      if (indexCard >= 0) {
        this.cartItems[indexCard].count++;
      } else {
        this.cartItems.push(card);
      }
      this.onProductUpdate(product);
    }
  }

  updateProductCount(productId, amount) {
    this.cartItems.forEach((item, index) => {
      if (amount == -1) {
        if (item.product.id == productId) {
          if (item.count > 1) {
            item.count--;
          } else {
            item.count--;
            this.cartItems.splice(index, 1);         
          }
        } 
      } else if (amount == 1) {
        if (item.product.id == productId) {
          item.count++;
        }
      } 
      this.onProductUpdate(item);
    });
    
  }

  isEmpty() {
    if (this.cartItems.length > 0) {
      return false;
    } else {
      return true;
    }
  }

  getTotalCount() {
    let count = 0;
    this.cartItems.forEach(item => {
      count += item.count;
    });
    return count;
  }

  getTotalPrice() {
    let price = 0;
    this.cartItems.forEach(item => {
      price += item.product.price * item.count;
    });
    return price;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
  product.id
}">
      <div class="cart-product__img">
        <img src="./assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="./assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="./assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${(product.price * count).toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
    2
  )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }
  submitFormSuccess() {
    return createElement(`
    <div class="modal__body-inner">
      <p>
        Order successful! Your order is being cooked :) <br>
        We’ll notify you about delivery time shortly.<br>
        <img src="./assets/images/delivery.gif">
      </p>
    </div>
    `);
  }
  renderModal() {
    this.modal = new Modal();
    this.modal.setTitle("Your order");
    this.div = document.createElement('DIV');

    this.cartItems.forEach(item => {
      this.div.append(this.renderProduct(item.product, item.count));  
    });
    this.div.append(this.renderOrderForm());
    this.modal.setBody(this.div);
    this.modal.open();

    this.div.querySelector('.cart-form').addEventListener('submit', (event) => this.onSubmit(event));
    
    this.div.addEventListener('click', event => {
      const minusBtn = event.target.closest('.cart-counter__button_minus');
      const plusBtn = event.target.closest('.cart-counter__button_plus');

      if (minusBtn) {
        this.updateProductCount(event.target.closest('.cart-product').dataset.productId, -1);
      }
      if (plusBtn) {
        this.updateProductCount(event.target.closest('.cart-product').dataset.productId, 1);
      }
      
    });
    
    
  }

  onProductUpdate(cartItems) {
    this.cartIcon.update(this);
    if (document.body.classList.contains('is-modal-open')) {
      const productId = cartItems.product.id;
      const modalBody = this.div;

      let productCount = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
      let productPrice = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
      let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);

      productCount.innerHTML = `${cartItems.count}`;
      productPrice.innerHTML = `€${(cartItems.product.price * cartItems.count).toFixed(2)}`; 
      infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;

      if (cartItems.count == 0) {
        modalBody.querySelector(`[data-product-id="${productId}"]`).remove();
      }
      if (this.isEmpty()) {
        this.modal.close();
      }
    }
    
  }

  onSubmit(event) {
    event.preventDefault();
    event.target.querySelector('.cart-buttons__button').classList.add("is-loading");
  
    let form = document.querySelector('.cart-form');
    let formData = new FormData(form);
    formData.append('products', JSON.stringify(this.cartItems));
    
    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: formData
    })
    .then(() => {
      this.modal.setTitle("Success!");
      this.cartItems.length = 0;
      document.querySelector('.cart-icon').classList.remove('cart-icon_visible');
      this.modal.setBody(this.submitFormSuccess());  
    });
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

