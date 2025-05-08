import { Modal } from "../Modal/Modal";
import "./CartStyle.css";

interface CartItem {
  name: string;
  price: number;
  quantity: number;
  thumbnail: string;
}



export class Cart {
  private element: HTMLElement;
  private items: CartItem[] = [];

  constructor() {
    this.element = document.createElement("div");
    this.element.classList.add("cart-box");
    this.resetCart()
    this.buildCart();
    this.setupCartListener()

  }

  private resetCart(): void{
    document.addEventListener("reset", (e: Event) =>{
      e.stopPropagation()
      this.items = []
      this.buildCart()
    })
  }

  private setupCartListener(): void {
    document.addEventListener("updateCart", (event: Event) => {
      const { productName, action } = (event as CustomEvent).detail;
     
      const targetIndex = this.items.findIndex(item => item.name === productName);
      if (targetIndex === -1) return;
  
      const target = this.items[targetIndex];
      if (target && action === "increment") {
        target.quantity += 1;
        
        
      } else if(action === "decrement"){
        target.quantity -= 1
        
      } else if(action === "remove"){

        const targetIndex = this.items.findIndex(item => item.name === productName);
        this.items.splice(targetIndex, 1)
        
      }
      this.buildCart()
    });
  }
  

  public addItem(item: CartItem): void {
    const existingItem = this.items.find(
      (itemObj) => itemObj.name === item.name
    );

    if (existingItem) {
      existingItem.quantity += 1;
      
    } else {
      this.items.push({ ...item, quantity: 1 });
    }

    this.buildCart();
  }

  private totalPrice(): string{
    const arrPrice = this.items.map(i => (i.quantity * i.price))
    const result = arrPrice.reduce((acc, atual) => Number(acc) + Number(atual), 0)
    return `$ ${result.toFixed(2)}`
  } 


  private buildCart(): void {
    if (this.items.length > 0) {
      
      this.element.innerHTML = `
      <h2>Your Cart (${this.items.length})</h2>
      <ul class="item-cart">
        ${this.items
          .map((item, index) => {
            
            return `
            
            <div class="item-container">
                <p>${item.name}</p>
                <div class="item-description">
                    <span>${item.quantity}x</span>
                    <span>@${item.price.toFixed(2)}</span>
                    <span>$${(item.quantity * item.price).toFixed(2)}</span>
                </div>
                
                <svg data-index="${index}" class="btn-remove-order" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">
                <path 
                    fill="currentColor" 
                    d="m19.61 18l4.86-4.86a1 1 0 0 0-1.41-1.41l-4.86 4.81l-4.89-4.89a1 1 0 0 0-1.41 1.41L16.78 18L12 22.72a1 1 0 1 0 1.41 1.41l4.77-4.77l4.74 4.74a1 1 0 0 0 1.41-1.41Z" 
                    class="cruz"
                />
                <path 
                    fill="currentColor" 
                    d="M18 34a16 16 0 1 1 16-16a16 16 0 0 1-16 16m0-30a14 14 0 1 0 14 14A14 14 0 0 0 18 4" 
                    class="circulo"
                />
                </svg>
                <span class="line"><span>
            </div>
          `;
          })
          .join("")}
      </ul>
      <div class="order">
          <span>Order Total</span>
          <span class="price-total">${this.totalPrice()}</span>
      </div>

      <div class="carbon-neutral">
          <img src="./assets/images/icon-carbon-neutral.svg">
          <span>This is a <b>carbon-neutral</b> delivery</span>
      </div>

      <button class="confirm-order">Confirm Order</button>
    `;
    this.confirmOrder()
    this.totalPrice()
    this.addRemoveEventListeners();
    
    } else {
      this.element.innerHTML = `
            <h2>Your Cart (0)</h2>
            <div class="container-empty">
                <img src="./assets/images/illustration-empty-cart.svg">
                <p>Your added items will appear here</p>
            </div>

    `;
    }
  }

  private confirmOrder(): void{
    const btn = this.element.querySelector(".confirm-order")

    btn?.addEventListener("click", (e: Event) =>{
      e.stopPropagation()

      const modal = new Modal(this.items, this.totalPrice())
      modal.open()
    })
  }

  private addRemoveEventListeners(): void{
    const btnRemove = document.querySelectorAll(".btn-remove-order");
    btnRemove.forEach(btn => {
        btn.addEventListener("click", (e: Event) =>{
            const pathTarget = e.target as HTMLElement  
            const svgBtn = pathTarget.closest(".btn-remove-order") as HTMLElement


            if(svgBtn){
              const index = parseInt(svgBtn.dataset.index!)
              if(!isNaN(index)){
                this.handleRemoveItem(index)
              }
                
            }
        })
    })
  }

  private handleRemoveItem(index: number): void{
    
    const evento = new CustomEvent("dadosProntos", {
      detail: {name: this.items[index].name}
    })

    document.dispatchEvent(evento)
    this.items.splice(index, 1)

    this.buildCart()
    

    
  }

  public render(): HTMLElement {
    return this.element;
  }
}
