import GameObject from "../salad/gameobject"
import { GameStats } from "../stats"

class GameUI extends GameObject {
    rocket:HTMLImageElement;
    stats:GameStats;
    constructor() {
        super();
        this.rocket = new Image();
        this.rocket.src = "images/rocket_2.png";
    }
    draw(context:CanvasRenderingContext2D) {
        super.draw(context);
        context.save();
        if(this.stats) {
            context.font = '14px Orbitron';
            context.fillStyle = "#aa00aa";
            context.fillText("SCORE: " + this.stats.score, 4, 14);
            context.textAlign = "end";
            context.fillText("LEVEL " + this.stats.level, 306, 14);
            for(let i:number = 0; i < this.stats.bullets; i++) {
                context.drawImage(this.rocket, 4 + 16 * i, 16);
            }
        }
        context.restore();
    }
}

export default GameUI;