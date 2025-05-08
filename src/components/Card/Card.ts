import "./CardStyle.css";

interface Obj{
  name: string;
  category: string;
  price: number;
  image: {
    thumbnail: string;
    desktop: string;
    mobile: string;
    tablet: string;
  }
}

export class Card {
  private element: HTMLElement;
  private quantity: number = 1;

  constructor(
    private obj: Obj,
    private buttonText: string,
    private onAddToCart: (item: {
      name: string;
      price: number;
      quantity: number;

    }) => void
  ) {
    this.element = document.createElement("div");
    this.element.classList.add("card");

    this.buildCard();
    this.setupRemoveListener();
    this.setupCartResetListener()

    document.addEventListener("resetCards", () =>{
      this.quantity = 1   
    })
  }

  private buildCard(): void {
    this.element.innerHTML = `
            <picture>
              <source class="card-img" srcset=${this.obj.image.desktop} media="(min-width: 1280px)">
              <source class="card-img" srcset=${this.obj.image.tablet} media="(min-width: 840px)">
              <img class="card-img" srcset=${this.obj.image.mobile} alt="Descrição da imagem">
            </picture>

            <p tabindex="0" class="btn-format" >
              <img src="./assets/images/icon-add-to-cart.svg">
              <span class="card-btn">${this.buttonText}</span>
            </p>
            <div class="card-info">
              <span class="card-category">${this.obj.category}</span>
              <p class="card-name">${this.obj.name}</p>
              <span class="card-price">$ ${this.obj.price.toFixed(2)}</span>
            </div>
        
        `;
    this.addButtonEvent();
  }

  private setupCartResetListener(): void{
    document.addEventListener("resetCards", (e:Event) =>{
      e.stopPropagation()
      this.quantity=0
      const button = this.element.querySelector(".btn-format") as HTMLParagraphElement;
      
      if (button) {
        button.classList.remove("clicado");
        button.innerHTML = `
          <img src="./assets/images/icon-add-to-cart.svg">
          <span class="card-btn">${this.buttonText}</span>
        `;
      } 

      this.addButtonEvent();
    })
  }

  private setupRemoveListener(): void {
    document.addEventListener("dadosProntos", (e: Event) => {
      const customEvent = e as CustomEvent;
      const removedName = customEvent.detail.name;

      if (removedName === this.obj.name) {
        const button = this.element.querySelector(
          ".btn-format"
        ) as HTMLParagraphElement;

        if (button) {
          button.classList.remove("clicado");
          button.innerHTML = `
            <img src="./assets/images/icon-add-to-cart.svg">
            <span class="card-btn">${this.buttonText}</span>
        `;
        }
        this.quantity = 1
        this.addButtonEvent()
      }
    });
  }


  private handleClick(button: HTMLParagraphElement): void {
    this.quantity = 1

    this.onAddToCart({
      name: this.obj.name,
      price: this.obj.price,
      quantity: this.quantity,
    });

    this.cssLogicClick(button);
  }

  private setupIncrementDecrement(button: HTMLParagraphElement): void {
    const plusBtn = button.querySelector(".plus-img") as HTMLElement;
    const minusBtn = button.querySelector(".minus-img") as HTMLElement;
    const quantitySpan = button.querySelector(".quantity-item") as HTMLElement;

    plusBtn?.addEventListener("click", (e) => {
      e.stopPropagation();
      this.quantity += 1;
      quantitySpan.textContent = this.quantity.toString();

      document.dispatchEvent(
        new CustomEvent("updateCart", {
          detail: { productName: this.obj.name, action: "increment" },
        })
      );
    });

    minusBtn?.addEventListener("click", (e) => {
      e.stopPropagation();
      if (this.quantity > 1) {
        this.quantity -= 1;
        quantitySpan.textContent = this.quantity.toString();
      } else {
        button.classList.remove("clicado");
        button.innerHTML = `
          <img src="./assets/images/icon-add-to-cart.svg">
          <span class="card-btn">${this.buttonText}</span>
        `;

        const eventRemove = new CustomEvent("updateCart", {
          detail: { productName: this.obj.name, action: "remove" },
        });

        document.dispatchEvent(eventRemove);

        this.addButtonEvent();
      }

      document.dispatchEvent(
        new CustomEvent("updateCart", {
          detail: { productName: this.obj.name, action: "decrement" },
        })
      );
    });
  }

  private cssLogicClick(button: HTMLParagraphElement): void {

    button.classList.add("clicado");

    button.innerHTML = `
    <svg class="minus-img" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
    <path class="circulo" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"/>
    <path class="traco" d="M5 8a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5A.5.5 0 0 1 5 8z"/>
    </svg>

    <span class="quantity-item">1</span>

    <svg class="plus-img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
    <path class="circulo" d="M8 15c-3.86 0-7-3.14-7-7s3.14-7 7-7s7 3.14 7 7s-3.14 7-7 7M8 2C4.69 2 2 4.69 2 8s2.69 6 6 6s6-2.69 6-6s-2.69-6-6-6"/>
    <path class="traco" d="M8 11.5c-.28 0-.5-.22-.5-.5V5c0-.28.22-.5.5-.5s.5.22.5.5v6c0 .28-.22.5-.5.5M11 8.5H5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h6c.28 0 .5.22.5.5s-.22.5-.5.5"/>
    </svg>
    
    
    `;
  }

  private addButtonEvent(): void {
    const button_box: HTMLParagraphElement =
      this.element.querySelector(".btn-format")!;

    const handleClickOnce = () => {
      this.quantity = 1
      this.handleClick(newButton);

      newButton.removeEventListener("click", handleClickOnce);

      this.setupIncrementDecrement(newButton);
    };

    button_box.replaceWith(button_box.cloneNode(true));

    const newButton = this.element.querySelector(".btn-format") as HTMLDivElement;
    newButton?.addEventListener("click", handleClickOnce);
  }

  public render(): HTMLElement {
    return this.element;
  }
}
