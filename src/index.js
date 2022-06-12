import Carousel from './models/Carousel/index.js';
import slides from './models/Slides/slides.js';

import RibbonMenu from './models/RibbonMenu/index.js';
import categories from './models/Categories/categories.js';

import StepSlider from './models/StepSlider/index.js';
import ProductsGrid from './models/ProductsGrid/index.js';

import CartIcon from './models/CartIcon/index.js';
import Cart from './models/Cart/index.js';

import './styles/filters.css';


export default class Main {

  constructor() {
  }

  async render() {

    Promise.all([this.carouselAdd(), this.ribbonMenuAdd(), this.sliderStepsAdd(), this.cartIconAdd()]);

    this.products = await this.fetchProducts();
    await this.productGridAdd();

    document.body.addEventListener('product-add', (event) => {
      let product = this.products.find(item => item.id == event.detail);
      this.cart.addProduct(product);
    });
    this.stepSlider.elem.addEventListener('slider-change', (event) => {
      this.productsGrid.updateFilter({
        maxSpiciness: event.detail
      });
    });
    this.ribbon.elem.addEventListener('ribbon-select', (event) => {
      this.productsGrid.updateFilter({
        category: event.detail
      });
    });
    document.getElementById('nuts-checkbox').onchange = (event) => {
      this.productsGrid.updateFilter({
        noNuts: event.target.checked
      });
    };
    document.getElementById('vegeterian-checkbox').onchange = (event) => {
      this.productsGrid.updateFilter({
        vegeterianOnly: event.target.checked
      });
    };
  }
  carouselAdd() {
    let carousel = new Carousel(slides);
    let containerCarousel = document.body.querySelector(`[data-carousel-holder]`);
    containerCarousel.append(carousel.elem);
  }
  ribbonMenuAdd() {
    this.ribbon = new RibbonMenu(categories);
    let container = document.querySelector(`[data-ribbon-holder]`);
    container.append(this.ribbon.elem);
  }
  sliderStepsAdd() {
    this.stepSlider = new StepSlider({
      steps: 5,
      value: 3
    });
    let container = document.querySelector(`[data-slider-holder]`);
    container.append(this.stepSlider.elem);
  }
  cartIconAdd() {
    this.cartIcon = new CartIcon();
    let cartIconHolder = document.querySelector('[data-cart-icon-holder]');
    cartIconHolder.append(this.cartIcon.elem);
    this.cart = new Cart(this.cartIcon);
  }
  productGridAdd() {
    this.productsGrid = new ProductsGrid(this.products);
    let container = document.querySelector('[data-products-grid-holder]');
    container.innerHTML = "";
    container.append(this.productsGrid.elem);
  }
  async fetchProducts() {
    let products = await fetch("./src/products.json");
    return await products.json();
  }
}


  

let main = new Main();

main.render()
  .then(() => console.log('Страница готова!'));
