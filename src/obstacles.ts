import GameObject from "./salad/gameobject"
import Drawable from "./salad/drawable"
import ParticleSystem from "./salad/particlesystem"
import OpenSimplexNoise from "./noise/simplex"

import { Noise2Fn, makeCylinderSurface, makeSphereSurface, makeRectangle } from "./noise/noise"

class PowerUp extends Drawable {
    x:number;
    y:number;
    yCenter:number;
    birth:number;
    constructor(x:number, y:number) {        
        super("images/rocket_1.png", x, y);
        this.birth = Date.now();
        this.yCenter = y;
    }
    update(delta:number) {
        this.y = Math.floor(this.yCenter + Math.sin((Date.now() - this.birth) / 100) * 3); 
    }
}

class Obstacle {
    x:number;
    y:number;
    size:number;
    constructor(x:number, y:number, size:number) {
        this.x = x;
        this.y = y;
        this.size = size;
    }
}

class Obstacles extends GameObject {
    obstacles:Array<Drawable>;    
    velocity:number;
    offset:number;
    field:Array<Array<number>>;
    colliders:Array<GameObject>;
    powerupColliders:Array<GameObject>;
    texture:HTMLImageElement;
    texture_unbreakable:HTMLImageElement;
    prerender:HTMLCanvasElement;
    pixels:Uint8ClampedArray;
    barriers:GameObject;
    paused:boolean;
    constructor() {
        super();
        this.texture = new Image();
        this.texture.src = "images/tile_2.png";
        this.texture_unbreakable = new Image();
        this.texture_unbreakable.src = "images/tile.png";        
        this.barriers = new GameObject();
        this.add(this.barriers);
        this.reset();
        this.colliders = [];
        this.powerupColliders = [];
        this.paused = false;
    }
    powerups(item:GameObject) {
        this.powerupColliders.push(item);
        item.on("uncollide", () => {
            let index:number = this.colliders.indexOf(item);
            this.colliders.splice(index, 1);
        });        
    }
    collide(item:GameObject) {
        this.colliders.push(item);
        item.on("uncollide", () => {
            let index:number = this.colliders.indexOf(item);
            this.colliders.splice(index, 1);
        });
    }
    reset(level:number = 1) {
        this.velocity = 0.15;
        this.obstacles = [];
        this.barriers.removeAll();
        this.offset = -20;
        this.paused = false;
        let simplex:OpenSimplexNoise = new OpenSimplexNoise(Date.now());
        this.field = makeCylinderSurface(600, 20, simplex.noise3D, { amplitude: 1.0, frequency: 0.2, octaves: 1.0 });

        this.prerender = <HTMLCanvasElement>document.createElement('canvas');
        this.prerender.width = 16 * 20;
        this.prerender.height = 16 * 600;
        let context = this.prerender.getContext("2d");
        context.fillStyle = "rgba(0, 0, 0, 0)"
        context.fillRect(0, 0, this.prerender.width, this.prerender.height);
        let y = 0;
        this.removeAll();
        for(let row of this.field) {
            for(let x = 0; x < row.length; x++) {
                if(row[x] > 0.3) {
                    //row[x] = 1;
                    context.drawImage(this.texture, x * 16, y * 16);
                } else {
                    //row[x] = 0;
                }
                if(row[x] > 0.5) {
                    context.drawImage(this.texture_unbreakable, x * 16, y * 16);
                }
                if(row[x] < 0.1) {
                    var createRocket = Math.floor(Math.random() * 800) === 1;
                    if(createRocket) {
                        this.add(new PowerUp(x * 16 + 8, Math.floor(y * 16 + 8)));
                    }
                    
                }
            }
            y++;
        }
        
        //this.pixels = context.getImageData(0, 0, this.prerender.width, this.prerender.height).data;
        console.log(this.prerender.width, this.prerender.height);
    }

    unbreakable(){
        let context = this.prerender.getContext('2d');
        let y = 0;
        for(let row of this.field) {
            for(let x = 0; x < row.length; x++) {
                if(row[x] > 0.5) {
                    context.drawImage(this.texture_unbreakable, x * 16, y * 16);
                }
            }
            y++;
        }       
    }

    keyDown(key:KeyboardEvent) {
        if(key.key === "Escape") {
            this.emit("quit-game");
        }
        if(key.key === "b") {
            console.log("boop");
            this.eat(160, 100, 20);
        }
    }

    powerupHit(x:number, y: number) {
        for(let child of this.children) {
            let relativeY = child.y - this.prerender.height + this.offset;
            if(child.x < x + 8 && child.x > x - 8 && relativeY < y + 8 && relativeY > y - 8) {
                return child;
            }
        };
        return null;
    }
    hit(x:number, y:number) {
        let index:number = Math.floor(y * (320 * 4) + (x * 4));
        if(this.pixels.length > index && 
            (this.pixels[index] + this.pixels[index + 1] + this.pixels[index + 2] + this.pixels[index + 3] > 0)) {
            return true;
        }
        return false;
    }

    stop() {
        this.paused = true;
    }
    update(delta:number) {
        this.pixels = this.prerender.getContext('2d').getImageData(0, 9600 - this.offset, 320, 200).data;
        super.update(delta);
        if(!this.paused) {
            this.offset += Math.floor((this.velocity) * delta);
            if(this.offset > (this.field.length + 16) * 16) {
                this.emit("level-complete");
                console.log("level up");
                this.reset();
            }
            for(let i:number = 0; i < this.colliders.length; i++) {
                let hit = this.hit(this.colliders[i].x, this.colliders[i].y);
                if(hit) {
                    this.eat(this.colliders[i].x, this.colliders[i].y, 16);
                    this.colliders[i].emit("collides", this);
                }
            }
            for(let i:number = 0; i < this.powerupColliders.length; i++) {
                let hit = this.powerupHit(this.powerupColliders[i].x, this.powerupColliders[i].y);
                if(hit) {
                    this.remove(hit);
                    this.powerupColliders[i].emit("powerup");
                }
            }
        }
    }

    eat(x:number, y:number, radius:number) {
        let context = this.prerender.getContext('2d');
        context.save();
        context.globalCompositeOperation = "destination-out";
        context.beginPath();
        context.arc(x, this.prerender.height - this.offset + y, radius, 0, 2 * Math.PI, false);
        context.fillStyle = 'rgba(0, 0, 0, 255)';
        context.fill();
        context.restore();
        this.unbreakable();
    }

    draw(context:CanvasRenderingContext2D) {
        context.save();
        // context.translate(0, this.prerender.height - this.offset);
        context.translate(0, -(this.prerender.height - this.offset));
        super.draw(context);
        context.restore();
        context.drawImage(this.prerender, 0, this.prerender.height - this.offset, 320, 200, 0, 0, 320, 200);
    }
}

export default Obstacles;