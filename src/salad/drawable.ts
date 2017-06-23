import GameObject from "./gameobject"

class Drawable extends GameObject {
    texture:HTMLImageElement;
    x:number;
    y:number;
    rotation:number;
    constructor(texture:string, x:number = 0, y:number = 0) {
        super();
        this.x = x;
        this.y = y;
        this.rotation = 0;
        this.texture = new Image();
        this.texture.src = texture;
    }
    draw(context:CanvasRenderingContext2D) {
        super.draw(context);
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.rotation * (Math.PI / 180));
        context.drawImage(this.texture, Math.floor(this.texture.width / 2) * -1, Math.floor(this.texture.height / 2) * -1);
        context.restore();
    }    
}

export default Drawable;