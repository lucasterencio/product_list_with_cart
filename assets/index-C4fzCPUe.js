var m=Object.defineProperty;var l=(n,e,t)=>e in n?m(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var o=(n,e,t)=>l(n,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function t(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(a){if(a.ep)return;a.ep=!0;const i=t(a);fetch(a.href,i)}})();class d{constructor(){o(this,"h1");this.h1=document.createElement("h1"),this.h1.textContent="Desserts"}render(){return this.h1}}class p{constructor(e,t,s){o(this,"element");o(this,"quantity",1);this.obj=e,this.buttonText=t,this.onAddToCart=s,this.element=document.createElement("div"),this.element.classList.add("card"),this.buildCard(),this.setupRemoveListener(),this.setupCartResetListener(),document.addEventListener("resetCards",()=>{this.quantity=1})}buildCard(){this.element.innerHTML=`
            <picture>
              <source class="card-img" srcset=${this.obj.image.desktop} media="(min-width: 1280px)">
              <source class="card-img" srcset=${this.obj.image.tablet} media="(min-width: 840px)">
              <img class="card-img" srcset=${this.obj.image.mobile} alt="Descrição da imagem">
            </picture>

            <p tabindex="0" class="btn-format" >
              <img src="../../../assets/images/icon-add-to-cart.svg">
              <span class="card-btn">${this.buttonText}</span>
            </p>
            <div class="card-info">
              <span class="card-category">${this.obj.category}</span>
              <p class="card-name">${this.obj.name}</p>
              <span class="card-price">$ ${this.obj.price.toFixed(2)}</span>
            </div>
        
        `,this.addButtonEvent()}setupCartResetListener(){document.addEventListener("resetCards",e=>{e.stopPropagation(),this.quantity=0;const t=this.element.querySelector(".btn-format");t&&(t.classList.remove("clicado"),t.innerHTML=`
          <img src="../../../assets/images/icon-add-to-cart.svg">
          <span class="card-btn">${this.buttonText}</span>
        `),this.addButtonEvent()})}setupRemoveListener(){document.addEventListener("dadosProntos",e=>{if(e.detail.name===this.obj.name){const a=this.element.querySelector(".btn-format");a&&(a.classList.remove("clicado"),a.innerHTML=`
            <img src="../../../assets/images/icon-add-to-cart.svg">
            <span class="card-btn">${this.buttonText}</span>
        `),this.quantity=1,this.addButtonEvent()}})}handleClick(e){this.quantity=1,this.onAddToCart({name:this.obj.name,price:this.obj.price,quantity:this.quantity}),this.cssLogicClick(e)}setupIncrementDecrement(e){const t=e.querySelector(".plus-img"),s=e.querySelector(".minus-img"),a=e.querySelector(".quantity-item");t==null||t.addEventListener("click",i=>{i.stopPropagation(),this.quantity+=1,a.textContent=this.quantity.toString(),document.dispatchEvent(new CustomEvent("updateCart",{detail:{productName:this.obj.name,action:"increment"}}))}),s==null||s.addEventListener("click",i=>{if(i.stopPropagation(),this.quantity>1)this.quantity-=1,a.textContent=this.quantity.toString();else{e.classList.remove("clicado"),e.innerHTML=`
          <img src="../../../assets/images/icon-add-to-cart.svg">
          <span class="card-btn">${this.buttonText}</span>
        `;const r=new CustomEvent("updateCart",{detail:{productName:this.obj.name,action:"remove"}});document.dispatchEvent(r),this.addButtonEvent()}document.dispatchEvent(new CustomEvent("updateCart",{detail:{productName:this.obj.name,action:"decrement"}}))})}cssLogicClick(e){e.classList.add("clicado"),e.innerHTML=`
    <svg class="minus-img" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
    <path class="circulo" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"/>
    <path class="traco" d="M5 8a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5A.5.5 0 0 1 5 8z"/>
    </svg>

    <span class="quantity-item">1</span>

    <svg class="plus-img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
    <path class="circulo" d="M8 15c-3.86 0-7-3.14-7-7s3.14-7 7-7s7 3.14 7 7s-3.14 7-7 7M8 2C4.69 2 2 4.69 2 8s2.69 6 6 6s6-2.69 6-6s-2.69-6-6-6"/>
    <path class="traco" d="M8 11.5c-.28 0-.5-.22-.5-.5V5c0-.28.22-.5.5-.5s.5.22.5.5v6c0 .28-.22.5-.5.5M11 8.5H5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h6c.28 0 .5.22.5.5s-.22.5-.5.5"/>
    </svg>
    
    
    `}addButtonEvent(){const e=this.element.querySelector(".btn-format"),t=()=>{this.quantity=1,this.handleClick(s),s.removeEventListener("click",t),this.setupIncrementDecrement(s)};e.replaceWith(e.cloneNode(!0));const s=this.element.querySelector(".btn-format");s==null||s.addEventListener("click",t)}render(){return this.element}}const g=[{image:{thumbnail:"./assets/images/image-waffle-thumbnail.jpg",mobile:"./assets/images/image-waffle-mobile.jpg",tablet:"./assets/images/image-waffle-tablet.jpg",desktop:"./assets/images/image-waffle-desktop.jpg"},name:"Waffle with Berries",category:"Waffle",price:6.5},{image:{thumbnail:"./assets/images/image-creme-brulee-thumbnail.jpg",mobile:"./assets/images/image-creme-brulee-mobile.jpg",tablet:"./assets/images/image-creme-brulee-tablet.jpg",desktop:"./assets/images/image-creme-brulee-desktop.jpg"},name:"Vanilla Bean Crème Brûlée",category:"Crème Brûlée",price:7},{image:{thumbnail:"./assets/images/image-macaron-thumbnail.jpg",mobile:"./assets/images/image-macaron-mobile.jpg",tablet:"./assets/images/image-macaron-tablet.jpg",desktop:"./assets/images/image-macaron-desktop.jpg"},name:"Macaron Mix of Five",category:"Macaron",price:8},{image:{thumbnail:"./assets/images/image-tiramisu-thumbnail.jpg",mobile:"./assets/images/image-tiramisu-mobile.jpg",tablet:"./assets/images/image-tiramisu-tablet.jpg",desktop:"./assets/images/image-tiramisu-desktop.jpg"},name:"Classic Tiramisu",category:"Tiramisu",price:5.5},{image:{thumbnail:"./assets/images/image-baklava-thumbnail.jpg",mobile:"./assets/images/image-baklava-mobile.jpg",tablet:"./assets/images/image-baklava-tablet.jpg",desktop:"./assets/images/image-baklava-desktop.jpg"},name:"Pistachio Baklava",category:"Baklava",price:4},{image:{thumbnail:"./assets/images/image-meringue-thumbnail.jpg",mobile:"./assets/images/image-meringue-mobile.jpg",tablet:"./assets/images/image-meringue-tablet.jpg",desktop:"./assets/images/image-meringue-desktop.jpg"},name:"Lemon Meringue Pie",category:"Pie",price:5},{image:{thumbnail:"./assets/images/image-cake-thumbnail.jpg",mobile:"./assets/images/image-cake-mobile.jpg",tablet:"./assets/images/image-cake-tablet.jpg",desktop:"./assets/images/image-cake-desktop.jpg"},name:"Red Velvet Cake",category:"Cake",price:4.5},{image:{thumbnail:"./assets/images/image-brownie-thumbnail.jpg",mobile:"./assets/images/image-brownie-mobile.jpg",tablet:"./assets/images/image-brownie-tablet.jpg",desktop:"./assets/images/image-brownie-desktop.jpg"},name:"Salted Caramel Brownie",category:"Brownie",price:4.5},{image:{thumbnail:"./assets/images/image-panna-cotta-thumbnail.jpg",mobile:"./assets/images/image-panna-cotta-mobile.jpg",tablet:"./assets/images/image-panna-cotta-tablet.jpg",desktop:"./assets/images/image-panna-cotta-desktop.jpg"},name:"Vanilla Panna Cotta",category:"Panna Cotta",price:6.5}];class u{constructor(e,t){o(this,"element");o(this,"items",[]);o(this,"totalPrice");this.element=document.createElement("div"),this.element.classList.add("modal-overlay"),this.items=e,this.totalPrice=t,this.buildModal(),this.addCloseEvent()}buildModal(){this.element.innerHTML=`
            <div class="modal">
                <header>
                    <img src="../../../assets/images/icon-order-confirmed.svg">
                    <p class="title">Order Confirmed</p>
                    <span>We hope you enjoy your food!</span>
                </header>

                <div class="container">
                  ${this.items.map(e=>`
                          <ul class="list-items">
                            <div class="img_plus_description">
                                <img src=${e.thumbnail}>
                                <div class="description">
                                    <p>${e.name}</p>
                                    <div class="price_quantity">
                                        <span class="quantity">${e.quantity}x</span>
                                        <span class="priceFull">@ $${e.price.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            <span class="total-price">$${(e.quantity*e.price).toFixed(2)}</span>
                            <span class="line"></span>
                          </ul>
                            
                        `).join("")}
                    </div>
                    <div class="confirm-total">
                      <p>Order Total</p>
                      <span>${this.totalPrice}</span>
                    </div>

                  <button class="modal-close">Start New Order</button>
            </div>
        
        `}addCloseEvent(){const e=this.element.querySelector(".modal-close"),t=this.element.querySelector(".modal");e==null||e.addEventListener("click",()=>this.close()),this.element.addEventListener("click",()=>this.element.remove()),t==null||t.addEventListener("click",s=>{s.stopPropagation()})}open(){document.body.appendChild(this.element)}close(){document.dispatchEvent(new CustomEvent("reset")),document.dispatchEvent(new CustomEvent("resetCards")),this.element.remove()}}class h{constructor(){o(this,"element");o(this,"items",[]);this.element=document.createElement("div"),this.element.classList.add("cart-box"),this.resetCart(),this.buildCart(),this.setupCartListener()}resetCart(){document.addEventListener("reset",e=>{e.stopPropagation(),this.items=[],this.buildCart()})}setupCartListener(){document.addEventListener("updateCart",e=>{const{productName:t,action:s}=e.detail,a=this.items.findIndex(r=>r.name===t);if(a===-1)return;const i=this.items[a];if(i&&s==="increment")i.quantity+=1;else if(s==="decrement")i.quantity-=1;else if(s==="remove"){const r=this.items.findIndex(c=>c.name===t);this.items.splice(r,1)}this.buildCart()})}addItem(e){const t=this.items.find(s=>s.name===e.name);t?t.quantity+=1:this.items.push({...e,quantity:1}),this.buildCart()}totalPrice(){return`$ ${this.items.map(s=>s.quantity*s.price).reduce((s,a)=>Number(s)+Number(a),0).toFixed(2)}`}buildCart(){this.items.length>0?(this.element.innerHTML=`
      <h2>Your Cart (${this.items.length})</h2>
      <ul class="item-cart">
        ${this.items.map((e,t)=>`
            
            <div class="item-container">
                <p>${e.name}</p>
                <div class="item-description">
                    <span>${e.quantity}x</span>
                    <span>@${e.price.toFixed(2)}</span>
                    <span>$${(e.quantity*e.price).toFixed(2)}</span>
                </div>
                
                <svg data-index="${t}" class="btn-remove-order" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">
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
          `).join("")}
      </ul>
      <div class="order">
          <span>Order Total</span>
          <span class="price-total">${this.totalPrice()}</span>
      </div>

      <div class="carbon-neutral">
          <img src="../../../assets/images/icon-carbon-neutral.svg">
          <span>This is a <b>carbon-neutral</b> delivery</span>
      </div>

      <button class="confirm-order">Confirm Order</button>
    `,this.confirmOrder(),this.totalPrice(),this.addRemoveEventListeners()):this.element.innerHTML=`
            <h2>Your Cart (0)</h2>
            <div class="container-empty">
                <img src="../../../assets/images/illustration-empty-cart.svg">
                <p>Your added items will appear here</p>
            </div>

    `}confirmOrder(){const e=this.element.querySelector(".confirm-order");e==null||e.addEventListener("click",t=>{t.stopPropagation(),new u(this.items,this.totalPrice()).open()})}addRemoveEventListeners(){document.querySelectorAll(".btn-remove-order").forEach(t=>{t.addEventListener("click",s=>{const i=s.target.closest(".btn-remove-order");if(i){const r=parseInt(i.dataset.index);isNaN(r)||this.handleRemoveItem(r)}})})}handleRemoveItem(e){const t=new CustomEvent("dadosProntos",{detail:{name:this.items[e].name}});document.dispatchEvent(t),this.items.splice(e,1),this.buildCart()}render(){return this.element}}class b{constructor(e){o(this,"container");o(this,"main");const t=document.getElementById(e);if(!t)throw new Error("Container não encontrado");this.container=t,this.main=document.createElement("main")}init(){const e=new d,t=new h;g.map(s=>{const a=new p(s,"Add to Cart",i=>t.addItem({...i,thumbnail:s.image.thumbnail}));this.addToMain(a.render())}),this.container.appendChild(e.render()),this.container.appendChild(this.main),this.container.appendChild(t.render())}addToMain(e){this.main.appendChild(e)}}window.addEventListener("DOMContentLoaded",()=>{new b("app").init()});
