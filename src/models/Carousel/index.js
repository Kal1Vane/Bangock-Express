import createElement from '../createElement/create-element.js';
import "./index.css";

export default class Carousel {
  #elem;
  constructor(slides) {
    this.slides = slides;
    this.divCarousel = this.createSlider();
    this.#elem = this.addClickButton();
  }
  get elem () {
    return this.#elem;
  }
  addClickButton() {
    let rightButton = this.divCarousel.querySelector('.carousel__arrow_right');
    let leftButton = this.divCarousel.querySelector('.carousel__arrow_left');
    let photoCarousel = this.divCarousel.querySelector('.carousel__inner');
    
    let lengthCarousel = this.divCarousel.querySelectorAll('.carousel__slide');
  
    let widthCarousel;
    let carouselCurrentPosition = 0;
    leftButton.style.display = 'none';

    rightButton.addEventListener('click', function () {
      widthCarousel = photoCarousel.offsetWidth;
      carouselCurrentPosition -= widthCarousel;
      checkPostion();    
    });
    leftButton.addEventListener('click', function () {
      widthCarousel = photoCarousel.offsetWidth;
      carouselCurrentPosition += widthCarousel;
      checkPostion();  
    });
    function checkPostion() {
      if (carouselCurrentPosition === 0) {
        leftButton.style.display = 'none';
      } else if (carouselCurrentPosition === -(lengthCarousel.length - 1) * widthCarousel) {
        rightButton.style.display = 'none';
      } else {
        leftButton.style.display = '';
        rightButton.style.display = '';
      }
      photoCarousel.style.transform = `translateX(${carouselCurrentPosition}px)`;
    }
    

    return this.divCarousel;
  }
  createOneSlide() {
    
    this.div = document.createElement('DIV');
    this.div.classList.add('carousel');

    this.divInner = document.createElement('DIV');
    this.divInner.classList.add('carousel__inner');

    this.leftArrow = document.createElement('DIV');
    this.leftArrow.classList.add('carousel__arrow_right');
    this.leftArrow.classList.add('carousel__arrow');

    this.rightArrow = document.createElement('DIV');
    this.rightArrow.classList.add('carousel__arrow_left');
    this.rightArrow.classList.add('carousel__arrow');

    this.rightArrow.append(this.createImgLeft());
    this.leftArrow.append(this.createImgRight());

    this.divInner.innerHTML = this.slides 
        .map(item => `
        <div class="carousel__slide" data-id="penang-shrimp">
            <img src="./assets/images/carousel/${item.image}" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">€${item.price.toFixed(2)}</span>
            <div class="carousel__title">${item.name}</div>
            <button type="button" class="carousel__button">
              <img src="./assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>
        `)
        .join(``);
    this.div.append(this.leftArrow);
    this.div.append(this.rightArrow);
    this.div.append(this.divInner);
    

    let button = this.div.querySelectorAll('.carousel__button');

    for (let i = 0; i < button.length; i++) {
      button[i].addEventListener('click', () => {
        const customEvent = new CustomEvent("product-add", {
          detail: this.slides[i].id,
          bubbles: true
        });
        button[i].dispatchEvent(customEvent);
      });
    }
    
    return this.div;
  }
  createSlider() {
    this.oneSlider = this.createOneSlide(); 
    return this.oneSlider;
  }
  createImgRight() {
    this.img = document.createElement('IMG');
    this.img.src = `./assets/images/icons/angle-icon.svg`;
    this.img.alt = `icon`;
    return this.img;
  }
  createImgLeft() {
    this.img = document.createElement('IMG');
    this.img.src = `./assets/images/icons/angle-left-icon.svg`;
    this.img.alt = `icon`;
    return this.img;
  }
}
