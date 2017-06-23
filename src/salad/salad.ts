import GameObject from "./gameobject";

export interface Vector2 {
    x:number,
    y:number
}

class Salad extends GameObject {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    lastUpdate: number;
    width:number;
    height:number;
    constructor(element: HTMLCanvasElement, width:number = window.innerWidth, height:number = window.innerHeight) {        
        super();
        this.lastUpdate = 0;
        this.canvas = element;
        this.context = this.canvas.getContext("2d");
        this.canvas.width  = width;
        this.canvas.height = height;
        this.width = width;
        this.height = height;
        addEventListener("keydown", this.keyDown.bind(this));
        addEventListener("keyup", this.keyUp.bind(this));
        addEventListener("click", this.click.bind(this));
    }

    run = () => {
        let now:number = Date.now();
        let delta:number = this.lastUpdate == 0 ? 0 : now - this.lastUpdate;
        this.context.fillStyle = "black";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.draw(this.context);
        this.update(delta);
        requestAnimationFrame(this.run);
        this.lastUpdate = now;
    }
}

export default Salad;