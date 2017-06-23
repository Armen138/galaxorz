import GameObject from "./gameobject"
import Drawable from "./drawable"

interface ParticleSystemOptions {
    vertical:number,
    horizontal:number,
    variation:number,
    particleCount:number,
    texture:string,
    lifeTime:number,
    systemLifeTime:number,
    x:number,
    y:number
}

class Particle extends Drawable {
    lifeTime:number;
    vertical:number;
    horizontal:number;
    lifeStart:number;
    scale:number;
    alive:boolean;
    variation:number;
    constructor(options:ParticleSystemOptions) {
        super(options.texture, options.x || 0, options.y || 0);
        this.variation = options.variation || 0.1;
        this.lifeTime = (options.lifeTime / 2) + (options.lifeTime / 2) * Math.random();
        this.vertical = options.vertical + (this.variation * Math.random() - (this.variation / 2.0));
        this.horizontal = options.horizontal + (this.variation * Math.random() - (this.variation / 2.0));
        this.lifeStart = Date.now();
        this.scale = 1.0;
        this.alive = true;
    }
    update(delta:number) {
        this.y += this.vertical * delta;
        this.x += this.horizontal * delta;
        var lifeSoFar:number = Date.now() - this.lifeStart;
        this.scale = (1.0 - (1.0 / this.lifeTime) * lifeSoFar);
        if(this.scale < 0) {
            this.scale = 0;
        }
        if(this.alive && lifeSoFar > this.lifeTime) {
            this.alive = false;
            this.emit("eol", this);            
        }
    }
    draw(context:CanvasRenderingContext2D) {
        context.save();
        context.translate(this.x, this.y);
        //context.scale(this.scale, this.scale);
        context.rotate(this.rotation * (Math.PI / 180));     
        var width = (this.texture.width * this.scale);
        var height = (this.texture.height * this.scale);
        context.drawImage(this.texture, width / 2 * -1, height / 2 * -1, width, height);
        context.restore();
    }
}

class ParticleSystem extends GameObject {
    texture:string;
    x:number;
    y:number;
    width:number;
    height:number;
    particles:Particle[];
    rotation:number;
    particleCount:number;
    systemLifeTime:number;
    lifeStart:number;
    alive:boolean;
    options:ParticleSystemOptions;
    constructor(options:ParticleSystemOptions) {
        super();
        this.options = options;
        this.x = options.x || 0;
        this.y = options.y || 0;
        this.width = 0;
        this.height = 0;
        this.lifeStart = Date.now();
        this.systemLifeTime = options.systemLifeTime || 0;
        this.texture = options.texture;
        this.particleCount = options.particleCount || 50;
        this.particles = [];
        this.alive = true;
    }
    fill() {
        for(var i = 0; i < this.particleCount; i++) {
            this.addParticle();
        }        
    }
    addParticle() {
        this.options.x = this.x + (Math.random() * this.width | 0);
        this.options.y = this.y + (Math.random() * this.height | 0);
        var particle = new Particle(this.options);
        this.particles.push(particle);
        particle.on("eol", (particle:Particle) => {
            particle.x = this.x + (Math.random() * this.width | 0);
            particle.y = this.y + (Math.random() * this.height | 0);
            particle.lifeStart = Date.now();
            particle.alive = true;
        });
    }
    update(delta:number) {
        super.update(delta);
        for(var i:number = 0; i < this.particles.length; i++) {
            this.particles[i].update(delta);
        }
        if(this.systemLifeTime !== 0 && Date.now() - this.lifeStart > this.systemLifeTime) {
            this.alive = false;
            this.emit("eol", this);
        }        
        if(this.particles.length < this.particleCount) {
            this.addParticle();
        }
    }
    draw(context:CanvasRenderingContext2D) {
        if(this.alive) {
            super.draw(context);
            for(var i:number = 0; i < this.particles.length; i++) {
                this.particles[i].draw(context);
            }
        }
    }    
}

export default ParticleSystem;