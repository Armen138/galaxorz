import GameObject from "./salad/gameobject"

class Star {
    x:number;
    y:number;
    size:number;
    constructor(x:number, y:number, size:number) {
        this.x = x;
        this.y = y;
        this.size = size;
    }
}

class StarField extends GameObject {
    stars:Array<Star>;
    colorMap:Array<string>;
    velocity:number;
    constructor() {
        super();
        this.velocity = 0.15;
        this.stars = [];
        this.colorMap = [
            "#aaaaaa",
            "#aa00aa",
            "#00aaaa"
        ];
        for(let i:number = 0; i < 20; i++) {
            this.stars.push(new Star(
                Math.random() * 320 | 0,
                Math.random() * 200 | 0,
                (Math.random() * 3 | 0) + 1
            ));
        }
    }
    update(delta:number) {
        super.update(delta);
        for(var star of this.stars) {
            star.y += (this.velocity * (star.size / 4)) * delta;
            if(star.y > 200) {
                star.y = (200 - star.y);
                star.y = star.y < -20 ? star.y = 0 : star.y;
                star.x = Math.random() * 320 | 0;
                star.size = (Math.random() * 3 | 0) + 1;
            }
        }
    }
    draw(context:CanvasRenderingContext2D) {
        super.draw(context);
        context.save();        
        for(let i:number = 0; i < this.stars.length; i++) {
            context.fillStyle = this.colorMap[this.stars[i].size -1];
            context.fillRect(this.stars[i].x, this.stars[i].y, this.stars[i].size, this.stars[i].size);
        }
        context.restore();
    }
}

export default StarField;