import Salad from "./salad/salad";
import GameObject from "./salad/gameobject";
import StarField from "./starfield";
import Obstacles from "./obstacles";
import Ship from "./ship";
import Bullet from "./bullet";
import GameUI from "./ui/game";
import MenuUI from "./ui/menu";
import Death from "./ui/death";

import ParticleSystem from "./salad/particlesystem";

class Game extends Salad {
    
    constructor() {
        super(document.getElementsByTagName('canvas')[0], 320, 200);
        var ship:Ship = new Ship(this.width / 2, this.height - 10);
        var starField:StarField = new StarField();
        var obstacles:Obstacles = new Obstacles();
        var ui:GameUI = new GameUI();
        var menuUI:MenuUI = new MenuUI();
        var gameView:GameObject = new GameObject();
        var menu:GameObject = new GameObject();
        var music:HTMLAudioElement = new Audio("audio/music.ogg");
        var death = new Death();
        music.loop = true;
        gameView.add(starField);
        gameView.add(obstacles);
        gameView.add(ship);   
        gameView.add(ui);
        menu.add(starField);
        menu.add(menuUI);
        this.add(menu);

        obstacles.collide(ship);

        obstacles.powerups(ship);

        death.on("start-game", () => {
            this.remove(menu);
            obstacles.reset();
            ship.reset();
            ui.stats = ship.stats;
            gameView.remove(death);
            this.add(gameView); 
            music.play();
        });
        menuUI.on("start-game", () => {
            this.remove(menu);
            obstacles.reset();
            this.add(gameView);
            ui.stats = ship.stats;
            music.play();
        });
        obstacles.on("quit-game", () => {
                this.remove(gameView);
                this.add(menu);
                music.pause();
        });
        obstacles.on("level-complete", () => {
            console.log("level completed");
            ship.stats.level++;
            ship.stats.score += 100;
        });
        ship.on("powerup", () => {
            ship.stats.bullets++;
            ship.stats.score += 10;
        });
        ship.on("fire", () => {
            if(ship.stats.bullets > 0) {
                ship.laser.play();
                let bullet = new Bullet(ship.x, ship.y);
                gameView.add(bullet);
                ship.stats.bullets--;
                obstacles.collide(bullet);    
            }
        });
        ship.on("death", () => {
            gameView.add(death);
            music.pause();
        });
        
    }
}

export default Game;
