import "./index.css";
export default class ProductCard {
  #elem;
  constructor(product) {
    this.product = product;
    this.#elem = this.createCard();
  }
  
  
  get elem () {
    return this.#elem;
  }

  createCard() {

    this.mainCard = this.createDivCard();

    this.divCardTopCreate = this.createDivCardTop(); 
    this.mainCard.append(this.divCardTopCreate);

    this.divCardBodyCreate = this.createDivCardBody(); 
    this.mainCard.append(this.divCardBodyCreate);

    this.imgCreate = this.createImgCard();
    this.divCardTopCreate.append(this.imgCreate);

    this.spanCreate = this.createSpanCardPrice();
    this.divCardTopCreate.append(this.spanCreate);

    this.divCreate = this.createCardBodyTitle();
    this.divCardBodyCreate.append(this.divCreate);

    this.CardBodyButtonCreate = this.createCardBodyButton();
    this.divCardBodyCreate.append(this.CardBodyButtonCreate);

    return this.mainCard;
  }
  createDivCard() {
    this.div = document.createElement('DIV');
    this.div.classList.add('card');
    return this.div;
  }
  createDivCardTop() {
    this.div = document.createElement('DIV');
    this.div.classList.add('card__top');
    return this.div;
  }
  createDivCardBody() {
    this.div = document.createElement('DIV');
    this.div.classList.add('card__body');
    return this.div;
  }
  createSpanCardPrice() {
    this.span = document.createElement('SPAN');
    this.span.classList.add('card__price');
    this.span.innerHTML = `€${this.product.price.toFixed(2)}`;
    return this.span;
  }
  createImgCard() {
    this.img = document.createElement('IMG');
    this.img.classList.add('card__image');
    this.img.src = `./assets/images/products/${this.product.image}`;
    this.img.alt = `product`;
    return this.img;
  }
  createCardBodyTitle() {
    this.div = document.createElement('DIV');
    this.div.classList.add('card__title');
    this.div.innerHTML = `${this.product.name}`;
    return this.div;
  }
  createCardBodyButton() {
    this.button = document.createElement('BUTTON');
    this.img = document.createElement('IMG');

    this.button.type = `button`;
    this.button.classList.add('card__button');
    this.img.src = `./assets/images/icons/plus-icon.svg`;
    this.img.alt = `icon`;

    this.button.append(this.img);

    this.button.addEventListener('click', () => {
      const customEvent = new CustomEvent("product-add", {
        detail: this.product.id,
        bubbles: true
      });
      this.button.dispatchEvent(customEvent);
      
    });
    return this.button;
  }

 

  
}

