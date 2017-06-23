import Drawable from "./salad/drawable"
import ParticleSystem from "./salad/particlesystem"
import { Vector2 } from "./salad/salad"
import { GameStats } from "./stats"
import Obstacles from "./obstacles"

class Ship extends Drawable {
    velocity:number;
    left:boolean;
    right:boolean;
    up:boolean;
    down:boolean;
    dead:boolean;
    downLimit:number;
    upLimit:number;
    leftLimit:number;
    rightLimit:number;
    smoke:ParticleSystem;
    explosion:ParticleSystem;
    boom:HTMLAudioElement;
    laser:HTMLAudioElement;
    pickup:HTMLAudioElement;
    startposition:Vector2;
    stats:GameStats;
    constructor(x:number = 0, y:number = 0) {
        super("images/ship.png", x, y);
        this.startposition = { x: x, y: y };
        this.velocity = 0.3;
        this.left = false;
        this.right = false;
        this.up = false;
        this.dead = false;
        this.leftLimit = 10;
        this.rightLimit = 310;
        this.downLimit = 190;
        this.upLimit = 10;
        this.pickup = new Audio("audio/powerup.wav");
        this.boom = new Audio("audio/explosion.wav");
        this.laser = new Audio("audio/laser.wav");
        this.stats = { level: 1, score: 0, bullets: 3 }; 
        this.smoke = new ParticleSystem({
            systemLifeTime: 0,
            horizontal: 0,
            lifeTime: 500,
            particleCount: 30, 
            texture: "images/particle.png", 
            variation: 0.01,
            vertical: 0.1,
            x: x, 
            y: y
        });
        this.on("collides", (obstacles:Obstacles) => {
            obstacles.stop();
            this.dead = true;
            this.explode();
        });
        this.on("powerup", () => {
            this.pickup.play();
        });
    }
    reset() {
        this.velocity = 0.3;
        this.left = false;
        this.right = false;
        this.up = false;
        this.dead = false;
        this.leftLimit = 10;
        this.rightLimit = 310;
        this.downLimit = 190;
        this.upLimit = 10;
        this.x = this.startposition.x;
        this.y = this.startposition.y;      
        this.stats = { level: 1, score: 0, bullets: 3 }; 
    }
    keyDown(key:KeyboardEvent) {
        super.keyUp(key);
        //console.log(key.key);
        switch(key.key) {
            case "ArrowLeft":
                this.left = true;
                this.rotation = -10;
                break;
            case "ArrowRight":
                this.right = true;
                this.rotation = 10;
                break;
            case "ArrowUp":
                this.up = true;
                break;         
            case "ArrowDown":
                this.down = true;
                break;
            case " ": //Space
                this.fire();
                break;
            // case "Enter":
            //     this.explode();
            //     this.dead = true;
            //     break;
        }
    }
    keyUp(key:KeyboardEvent) {
        super.keyDown(key);
        switch(key.key) {
            case "ArrowLeft":
                this.left = false;
                this.rotation = 0;
                break;
            case "ArrowRight":
                this.right = false;
                this.rotation = 0;
                break;
            case "ArrowUp":
                this.up = false;
                break;                                
            case "ArrowDown":
                this.down = false;
                break;                                
                
        }
    }
    fire() {
        this.emit("fire");
    }
    explode() {
        this.explosion = new ParticleSystem({
            systemLifeTime: 500,
            horizontal: 0,
            lifeTime: 1000,
            particleCount: 60, 
            texture: "images/particle.png", 
            variation: 0.3,
            vertical: -0.1,
            x: this.x, 
            y: this.y
        });
        this.explosion.fill();
        this.explosion.on("eol", () => {
            delete this.explosion;
            this.emit("death");
        });
        this.boom.play();
    }
    draw(context:CanvasRenderingContext2D) {
        if(!this.dead) {
            super.draw(context);
            this.smoke.draw(context);
        } else {
            if(this.explosion) {
                this.explosion.draw(context);
            }
        }
    }
    update(delta:number) {
        super.update(delta);
        if(this.up) {
            this.y -= this.velocity * delta;
            if(this.y < this.upLimit) {
                this.y = this.upLimit;
            }            
        }
        if(this.down) {
            this.y += this.velocity * delta;
            if(this.y > this.downLimit) {
                this.y = this.downLimit;
            }            
        }        
        if(this.left) {        
            this.x -= this.velocity * delta;            
            if(this.x < this.leftLimit) {
                this.x = this.leftLimit;
            }
        }
        if(this.right) {
            this.x += this.velocity * delta;
            if(this.x > this.rightLimit) {
                this.x = this.rightLimit;
            }

        }
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        this.smoke.x = this.x;
        this.smoke.y = this.y + this.texture.height / 2;
        this.smoke.update(delta);
        if(this.dead && this.explosion) {
            this.explosion.update(delta);
        }
    }
}

export default Ship;