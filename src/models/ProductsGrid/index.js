import createElement from '../createElement/create-element.js';
import ProductCard from '../ProductCard/index.js';
import "./index.css";

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.createGrid = createElement(`<div class="products-grid">
      <div class="products-grid__inner"></div>
    </div>`);
    this.productInner = this.createGrid.querySelector('.products-grid__inner');
    this.renderProduct();
  }

  renderProduct(productsFilter) {
    if (productsFilter == undefined) {
      for (let product of this.products) {
        let card = new ProductCard(product);
        this.productInner.append(card.elem);
      }
    } else {
      for (let product of productsFilter) {
        let card = new ProductCard(product);
        this.productInner.append(card.elem);
      }
    }   
  }
  updateFilter = filters => {
    Object.assign(this.filters, filters);
    this.addFilterProduct();
  }
  addFilterProduct() {
    let productsFilter = this.products;
    for (let property in this.filters) {
      if (property == 'noNuts' && this.filters[property]) {
        productsFilter = productsFilter.filter(item => (item.nuts == false || !item.nuts));
      }
      if (property == 'vegeterianOnly' && this.filters[property]) {
        productsFilter = productsFilter.filter(item => (item.vegeterian == true));
      }
      if (property == 'maxSpiciness') {
        productsFilter = productsFilter.filter(item => (item.spiciness <= this.filters[property])); 
      }
      if (property == 'category' && this.filters[property]) {
        productsFilter = productsFilter.filter(item => item.category == this.filters[property]);
      }
    }
    this.productInner.innerHTML = '';
    this.renderProduct(productsFilter);
  }
  get elem() {
    return this.createGrid;
  }
}
