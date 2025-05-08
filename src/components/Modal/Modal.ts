import "./ModalStyle.css";

interface CartItem {
    name: string;
    price: number;
    quantity: number;
    thumbnail: string;
  }

export class Modal {
  private element: HTMLElement;
  private items: CartItem[] = []
  private totalPrice: string;

  constructor(items: CartItem[], totalPrice: string) {
    this.element = document.createElement("div");
    this.element.classList.add("modal-overlay");

    this.items = items;
    this.totalPrice = totalPrice;
    

    this.buildModal();
    this.addCloseEvent()
    
  }

  private buildModal(): void {

    this.element.innerHTML = `
            <div class="modal">
                <header>
                    <img src="../../../assets/images/icon-order-confirmed.svg">
                    <p class="title">Order Confirmed</p>
                    <span>We hope you enjoy your food!</span>
                </header>

                <div class="container">
                  ${this.items.map(item => {
                      return `
                          <ul class="list-items">
                            <div class="img_plus_description">
                                <img src=${item.thumbnail}>
                                <div class="description">
                                    <p>${item.name}</p>
                                    <div class="price_quantity">
                                        <span class="quantity">${item.quantity}x</span>
                                        <span class="priceFull">@ $${item.price.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            <span class="total-price">$${(item.quantity * item.price).toFixed(2)}</span>
                            <span class="line"></span>
                          </ul>
                            
                        `
                      }).join("")}
                    </div>
                    <div class="confirm-total">
                      <p>Order Total</p>
                      <span>${this.totalPrice}</span>
                    </div>

                  <button class="modal-close">Start New Order</button>
            </div>
        
        `;
  }

  private addCloseEvent(): void {
    const btn = this.element.querySelector(".modal-close") as HTMLElement;
    const modalBox = this.element.querySelector(".modal") as HTMLElement;

    btn?.addEventListener("click", () => this.close());
    this.element.addEventListener("click", () => this.element.remove())
    modalBox?.addEventListener("click", (e: Event) => {e.stopPropagation()})
  }

  public open(): void {
    document.body.appendChild(this.element);
  }

  public close(): void {
    
    document.dispatchEvent(new CustomEvent("reset"))
    document.dispatchEvent(new CustomEvent("resetCards"));
    this.element.remove();

  }
}
