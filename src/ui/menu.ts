import GameObject from "../salad/gameobject"

class MenuUI extends GameObject {
    score:number;
    level:string;
    constructor() {
        super();
        this.score = 0;
        this.level = "LEVEL ONE";
    }
    keyDown(key:KeyboardEvent) {
        if(key.key === "Enter") {
            this.emit("start-game");
        }
    }
    draw(context:CanvasRenderingContext2D) {
        super.draw(context);
        context.save();
        context.font = '42px Orbitron';
        context.fillStyle = "#00aaaa";
        context.textAlign = "center";
        context.fillText("GALAXORZ", 162, 66);        

        context.fillStyle = "#aa00aa";
        context.textAlign = "center";
        context.fillText("GALAXORZ", 160, 64);
        context.fillStyle = "#aaaaaa";
        context.font = '24px Orbitron';
        context.fillText("<PRESS ENTER>", 160, 128);
        context.restore();
    }
}

export default MenuUI;