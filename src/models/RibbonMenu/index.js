import createElement from '../createElement/create-element.js';
import "./index.css";

export default class RibbonMenu {
  #elem;
  constructor(categories) {
    this.categories = categories;
    this.#elem = this.createMenu();
  }
  get elem () {
    return this.#elem;
  }

  createMenu() {
    this.RibbonMenu = createElement(`
    <div class="ribbon">
    
      <button class="ribbon__arrow ribbon__arrow_left">
        <img src="./assets/images/icons/angle-icon.svg" alt="icon">
      </button>

      <nav class="ribbon__inner">
      </nav>
      
      <button class="ribbon__arrow ribbon__arrow_right">
        <img src="./assets/images/icons/angle-icon.svg" alt="icon">
      </button>
  </div>
    `);

    let ribbonInner = this.RibbonMenu.querySelector('.ribbon__inner');
    
    for (let item of this.categories) {
      let RibbonMenuItem = createElement(`
      <a href="#" class="ribbon__item" data-id="${item.id}">${item.name}</a>
      `);
      ribbonInner.append(RibbonMenuItem); 
    }

    this.addEventListner();
    this.preventDefaul();
    return this.RibbonMenu; 
  }

  addEventListner() {
    let leftButton = this.RibbonMenu.querySelector('.ribbon__arrow_left');
    let rightButton = this.RibbonMenu.querySelector('.ribbon__arrow_right');
    let ribbonInner = this.RibbonMenu.querySelector('.ribbon__inner');

    rightButton.classList.add("ribbon__arrow_visible"); 
   
    rightButton.addEventListener('click', event => {
      ribbonInner.scrollBy(350, 0);
    });
    leftButton.addEventListener('click', event => {
      ribbonInner.scrollBy(-350, 0); 
    });
    ribbonInner.addEventListener('scroll', event => {
      let scrollWidth = ribbonInner.scrollWidth;
      let scrollLeft = ribbonInner.scrollLeft;
      let clientWidth = ribbonInner.clientWidth;
      let scrollRight = scrollWidth - scrollLeft - clientWidth;

      if (scrollLeft < 1) {
        leftButton.classList.remove("ribbon__arrow_visible"); 
      } else if (scrollRight < 1) {
        rightButton.classList.remove("ribbon__arrow_visible");
      } else {
        rightButton.classList.add("ribbon__arrow_visible"); 
        leftButton.classList.add("ribbon__arrow_visible"); 
      }
    });
    
  }
  preventDefaul() {
    let link = this.RibbonMenu.querySelectorAll('.ribbon__item');

    for (let i = 0; i < link.length; i++) {
      link[i].addEventListener('click', event => {
        event.preventDefault(); 
        const customEvent = new CustomEvent("ribbon-select", {
          detail: this.categories[i].id,
          bubbles: true
        });
        
        link[i].dispatchEvent(customEvent);
      });
    }
  }
}
