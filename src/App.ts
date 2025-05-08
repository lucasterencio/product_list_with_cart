import { Header } from "./components/Header/Header";
import { Card } from "./components/Card/Card";
import dados from "../data.json"
import { Cart } from "./components/Cart/Cart";

export class App {
    private container: HTMLElement;
    private main: HTMLElement;

    constructor(containerId: string){
        const el = document.getElementById(containerId)
        
        if(!el) throw new Error("Container não encontrado")
        this.container = el

        this.main = document.createElement("main")
    }

    public init(): void{
        
        const h1 = new Header()
        const cart = new Cart()
        
        dados.map((obj) => {
            const card = new Card(obj, "Add to Cart", (item) => cart.addItem({...item, thumbnail: obj.image.thumbnail}))
            this.addToMain(card.render())


        })
        

        this.container.appendChild(h1.render())
        this.container.appendChild(this.main)
        this.container.appendChild(cart.render())
        

    
    }

    public addToMain(element: HTMLElement): void {
        this.main.appendChild(element)
    }
}