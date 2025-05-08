export class Header{
    private h1: HTMLElement;

    constructor(){
        this.h1 = document.createElement("h1")
        this.h1.textContent = "Desserts"
    }

    public render(): HTMLElement{
        return this.h1;
    }
}