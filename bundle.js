/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var game_1 = __webpack_require__(1);
	window.onload = function () {
	    var game = new game_1.default();
	    game.run();
	};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var salad_1 = __webpack_require__(2);
	var gameobject_1 = __webpack_require__(3);
	var starfield_1 = __webpack_require__(4);
	var obstacles_1 = __webpack_require__(5);
	var ship_1 = __webpack_require__(10);
	var bullet_1 = __webpack_require__(12);
	var game_1 = __webpack_require__(13);
	var menu_1 = __webpack_require__(14);
	var death_1 = __webpack_require__(15);
	var Game = (function (_super) {
	    __extends(Game, _super);
	    function Game() {
	        var _this = this;
	        _super.call(this, document.getElementsByTagName('canvas')[0], 320, 200);
	        var ship = new ship_1.default(this.width / 2, this.height - 10);
	        var starField = new starfield_1.default();
	        var obstacles = new obstacles_1.default();
	        var ui = new game_1.default();
	        var menuUI = new menu_1.default();
	        var gameView = new gameobject_1.default();
	        var menu = new gameobject_1.default();
	        var music = new Audio("audio/music.ogg");
	        var death = new death_1.default();
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
	        death.on("start-game", function () {
	            _this.remove(menu);
	            obstacles.reset();
	            ship.reset();
	            ui.stats = ship.stats;
	            gameView.remove(death);
	            _this.add(gameView);
	            music.play();
	        });
	        menuUI.on("start-game", function () {
	            _this.remove(menu);
	            obstacles.reset();
	            _this.add(gameView);
	            ui.stats = ship.stats;
	            music.play();
	        });
	        obstacles.on("quit-game", function () {
	            _this.remove(gameView);
	            _this.add(menu);
	            music.pause();
	        });
	        obstacles.on("level-complete", function () {
	            console.log("level completed");
	            ship.stats.level++;
	            ship.stats.score += 100;
	        });
	        ship.on("powerup", function () {
	            ship.stats.bullets++;
	            ship.stats.score += 10;
	        });
	        ship.on("fire", function () {
	            if (ship.stats.bullets > 0) {
	                ship.laser.play();
	                var bullet = new bullet_1.default(ship.x, ship.y);
	                gameView.add(bullet);
	                ship.stats.bullets--;
	                obstacles.collide(bullet);
	            }
	        });
	        ship.on("death", function () {
	            gameView.add(death);
	            music.pause();
	        });
	    }
	    return Game;
	}(salad_1.default));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Game;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var gameobject_1 = __webpack_require__(3);
	var Salad = (function (_super) {
	    __extends(Salad, _super);
	    function Salad(element, width, height) {
	        var _this = this;
	        if (width === void 0) { width = window.innerWidth; }
	        if (height === void 0) { height = window.innerHeight; }
	        _super.call(this);
	        this.run = function () {
	            var now = Date.now();
	            var delta = _this.lastUpdate == 0 ? 0 : now - _this.lastUpdate;
	            _this.context.fillStyle = "black";
	            _this.context.fillRect(0, 0, _this.canvas.width, _this.canvas.height);
	            _this.draw(_this.context);
	            _this.update(delta);
	            requestAnimationFrame(_this.run);
	            _this.lastUpdate = now;
	        };
	        this.lastUpdate = 0;
	        this.canvas = element;
	        this.context = this.canvas.getContext("2d");
	        this.canvas.width = width;
	        this.canvas.height = height;
	        this.width = width;
	        this.height = height;
	        addEventListener("keydown", this.keyDown.bind(this));
	        addEventListener("keyup", this.keyUp.bind(this));
	        addEventListener("click", this.click.bind(this));
	    }
	    return Salad;
	}(gameobject_1.default));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Salad;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

	"use strict";
	var GameObject = (function () {
	    function GameObject() {
	        this.children = [];
	        this.listeners = {};
	    }
	    GameObject.prototype.on = function (event, callback) {
	        this.listeners[event] = this.listeners[event] || [];
	        this.listeners[event].push(callback);
	    };
	    GameObject.prototype.removeListener = function (event, callback) {
	        var idx = 0;
	        if (this.listeners[event]) {
	            idx = this.listeners[event].indexOf(callback);
	            if (idx !== -1) {
	                this.listeners[event].splice(idx, 1);
	            }
	        }
	    };
	    GameObject.prototype.emit = function (event, data) {
	        if (this.listeners[event]) {
	            for (var _i = 0, _a = this.listeners[event]; _i < _a.length; _i++) {
	                var callback = _a[_i];
	                callback(data);
	            }
	        }
	    };
	    GameObject.prototype.each = function (callback) {
	        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
	            var child = _a[_i];
	            callback(child);
	        }
	    };
	    GameObject.prototype.draw = function (context) {
	        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
	            var child = _a[_i];
	            child.draw(context);
	        }
	    };
	    GameObject.prototype.keyDown = function (key) {
	        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
	            var child = _a[_i];
	            child.keyDown(key);
	        }
	    };
	    GameObject.prototype.keyUp = function (key) {
	        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
	            var child = _a[_i];
	            child.keyUp(key);
	        }
	    };
	    GameObject.prototype.click = function (mouse) {
	        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
	            var child = _a[_i];
	            child.click(mouse);
	        }
	    };
	    GameObject.prototype.update = function (delta) {
	        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
	            var child = _a[_i];
	            child.update(delta);
	        }
	    };
	    GameObject.prototype.remove = function (gameObject) {
	        var index = this.children.indexOf(gameObject);
	        this.children.splice(index, 1);
	    };
	    GameObject.prototype.removeAll = function () {
	        this.children = [];
	    };
	    GameObject.prototype.add = function (gameObject) {
	        var _this = this;
	        this.children.push(gameObject);
	        gameObject.on("eol", function () {
	            _this.remove(gameObject);
	        });
	    };
	    return GameObject;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = GameObject;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var gameobject_1 = __webpack_require__(3);
	var Star = (function () {
	    function Star(x, y, size) {
	        this.x = x;
	        this.y = y;
	        this.size = size;
	    }
	    return Star;
	}());
	var StarField = (function (_super) {
	    __extends(StarField, _super);
	    function StarField() {
	        _super.call(this);
	        this.velocity = 0.15;
	        this.stars = [];
	        this.colorMap = [
	            "#aaaaaa",
	            "#aa00aa",
	            "#00aaaa"
	        ];
	        for (var i = 0; i < 20; i++) {
	            this.stars.push(new Star(Math.random() * 320 | 0, Math.random() * 200 | 0, (Math.random() * 3 | 0) + 1));
	        }
	    }
	    StarField.prototype.update = function (delta) {
	        _super.prototype.update.call(this, delta);
	        for (var _i = 0, _a = this.stars; _i < _a.length; _i++) {
	            var star = _a[_i];
	            star.y += (this.velocity * (star.size / 4)) * delta;
	            if (star.y > 200) {
	                star.y = (200 - star.y);
	                star.y = star.y < -20 ? star.y = 0 : star.y;
	                star.x = Math.random() * 320 | 0;
	                star.size = (Math.random() * 3 | 0) + 1;
	            }
	        }
	    };
	    StarField.prototype.draw = function (context) {
	        _super.prototype.draw.call(this, context);
	        context.save();
	        for (var i = 0; i < this.stars.length; i++) {
	            context.fillStyle = this.colorMap[this.stars[i].size - 1];
	            context.fillRect(this.stars[i].x, this.stars[i].y, this.stars[i].size, this.stars[i].size);
	        }
	        context.restore();
	    };
	    return StarField;
	}(gameobject_1.default));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = StarField;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var gameobject_1 = __webpack_require__(3);
	var drawable_1 = __webpack_require__(6);
	var simplex_1 = __webpack_require__(7);
	var noise_1 = __webpack_require__(9);
	var PowerUp = (function (_super) {
	    __extends(PowerUp, _super);
	    function PowerUp(x, y) {
	        _super.call(this, "images/rocket_1.png", x, y);
	        this.birth = Date.now();
	        this.yCenter = y;
	    }
	    PowerUp.prototype.update = function (delta) {
	        this.y = Math.floor(this.yCenter + Math.sin((Date.now() - this.birth) / 100) * 3);
	    };
	    return PowerUp;
	}(drawable_1.default));
	var Obstacle = (function () {
	    function Obstacle(x, y, size) {
	        this.x = x;
	        this.y = y;
	        this.size = size;
	    }
	    return Obstacle;
	}());
	var Obstacles = (function (_super) {
	    __extends(Obstacles, _super);
	    function Obstacles() {
	        _super.call(this);
	        this.texture = new Image();
	        this.texture.src = "images/tile_2.png";
	        this.texture_unbreakable = new Image();
	        this.texture_unbreakable.src = "images/tile.png";
	        this.barriers = new gameobject_1.default();
	        this.add(this.barriers);
	        this.reset();
	        this.colliders = [];
	        this.powerupColliders = [];
	        this.paused = false;
	    }
	    Obstacles.prototype.powerups = function (item) {
	        var _this = this;
	        this.powerupColliders.push(item);
	        item.on("uncollide", function () {
	            var index = _this.colliders.indexOf(item);
	            _this.colliders.splice(index, 1);
	        });
	    };
	    Obstacles.prototype.collide = function (item) {
	        var _this = this;
	        this.colliders.push(item);
	        item.on("uncollide", function () {
	            var index = _this.colliders.indexOf(item);
	            _this.colliders.splice(index, 1);
	        });
	    };
	    Obstacles.prototype.reset = function (level) {
	        if (level === void 0) { level = 1; }
	        this.velocity = 0.15;
	        this.obstacles = [];
	        this.barriers.removeAll();
	        this.offset = -20;
	        this.paused = false;
	        var simplex = new simplex_1.default(Date.now());
	        this.field = noise_1.makeCylinderSurface(600, 20, simplex.noise3D, { amplitude: 1.0, frequency: 0.2, octaves: 1.0 });
	        this.prerender = document.createElement('canvas');
	        this.prerender.width = 16 * 20;
	        this.prerender.height = 16 * 600;
	        var context = this.prerender.getContext("2d");
	        context.fillStyle = "rgba(0, 0, 0, 0)";
	        context.fillRect(0, 0, this.prerender.width, this.prerender.height);
	        var y = 0;
	        this.removeAll();
	        for (var _i = 0, _a = this.field; _i < _a.length; _i++) {
	            var row = _a[_i];
	            for (var x = 0; x < row.length; x++) {
	                if (row[x] > 0.3) {
	                    //row[x] = 1;
	                    context.drawImage(this.texture, x * 16, y * 16);
	                }
	                else {
	                }
	                if (row[x] > 0.5) {
	                    context.drawImage(this.texture_unbreakable, x * 16, y * 16);
	                }
	                if (row[x] < 0.1) {
	                    var createRocket = Math.floor(Math.random() * 800) === 1;
	                    if (createRocket) {
	                        this.add(new PowerUp(x * 16 + 8, Math.floor(y * 16 + 8)));
	                    }
	                }
	            }
	            y++;
	        }
	        //this.pixels = context.getImageData(0, 0, this.prerender.width, this.prerender.height).data;
	        console.log(this.prerender.width, this.prerender.height);
	    };
	    Obstacles.prototype.unbreakable = function () {
	        var context = this.prerender.getContext('2d');
	        var y = 0;
	        for (var _i = 0, _a = this.field; _i < _a.length; _i++) {
	            var row = _a[_i];
	            for (var x = 0; x < row.length; x++) {
	                if (row[x] > 0.5) {
	                    context.drawImage(this.texture_unbreakable, x * 16, y * 16);
	                }
	            }
	            y++;
	        }
	    };
	    Obstacles.prototype.keyDown = function (key) {
	        if (key.key === "Escape") {
	            this.emit("quit-game");
	        }
	        if (key.key === "b") {
	            console.log("boop");
	            this.eat(160, 100, 20);
	        }
	    };
	    Obstacles.prototype.powerupHit = function (x, y) {
	        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
	            var child = _a[_i];
	            var relativeY = child.y - this.prerender.height + this.offset;
	            if (child.x < x + 8 && child.x > x - 8 && relativeY < y + 8 && relativeY > y - 8) {
	                return child;
	            }
	        }
	        ;
	        return null;
	    };
	    Obstacles.prototype.hit = function (x, y) {
	        var index = Math.floor(y * (320 * 4) + (x * 4));
	        if (this.pixels.length > index &&
	            (this.pixels[index] + this.pixels[index + 1] + this.pixels[index + 2] + this.pixels[index + 3] > 0)) {
	            return true;
	        }
	        return false;
	    };
	    Obstacles.prototype.stop = function () {
	        this.paused = true;
	    };
	    Obstacles.prototype.update = function (delta) {
	        this.pixels = this.prerender.getContext('2d').getImageData(0, 9600 - this.offset, 320, 200).data;
	        _super.prototype.update.call(this, delta);
	        if (!this.paused) {
	            this.offset += Math.floor((this.velocity) * delta);
	            if (this.offset > (this.field.length + 16) * 16) {
	                this.emit("level-complete");
	                console.log("level up");
	                this.reset();
	            }
	            for (var i = 0; i < this.colliders.length; i++) {
	                var hit = this.hit(this.colliders[i].x, this.colliders[i].y);
	                if (hit) {
	                    this.eat(this.colliders[i].x, this.colliders[i].y, 16);
	                    this.colliders[i].emit("collides", this);
	                }
	            }
	            for (var i = 0; i < this.powerupColliders.length; i++) {
	                var hit = this.powerupHit(this.powerupColliders[i].x, this.powerupColliders[i].y);
	                if (hit) {
	                    this.remove(hit);
	                    this.powerupColliders[i].emit("powerup");
	                }
	            }
	        }
	    };
	    Obstacles.prototype.eat = function (x, y, radius) {
	        var context = this.prerender.getContext('2d');
	        context.save();
	        context.globalCompositeOperation = "destination-out";
	        context.beginPath();
	        context.arc(x, this.prerender.height - this.offset + y, radius, 0, 2 * Math.PI, false);
	        context.fillStyle = 'rgba(0, 0, 0, 255)';
	        context.fill();
	        context.restore();
	        this.unbreakable();
	    };
	    Obstacles.prototype.draw = function (context) {
	        context.save();
	        // context.translate(0, this.prerender.height - this.offset);
	        context.translate(0, -(this.prerender.height - this.offset));
	        _super.prototype.draw.call(this, context);
	        context.restore();
	        context.drawImage(this.prerender, 0, this.prerender.height - this.offset, 320, 200, 0, 0, 320, 200);
	    };
	    return Obstacles;
	}(gameobject_1.default));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Obstacles;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var gameobject_1 = __webpack_require__(3);
	var Drawable = (function (_super) {
	    __extends(Drawable, _super);
	    function Drawable(texture, x, y) {
	        if (x === void 0) { x = 0; }
	        if (y === void 0) { y = 0; }
	        _super.call(this);
	        this.x = x;
	        this.y = y;
	        this.rotation = 0;
	        this.texture = new Image();
	        this.texture.src = texture;
	    }
	    Drawable.prototype.draw = function (context) {
	        _super.prototype.draw.call(this, context);
	        context.save();
	        context.translate(this.x, this.y);
	        context.rotate(this.rotation * (Math.PI / 180));
	        context.drawImage(this.texture, Math.floor(this.texture.width / 2) * -1, Math.floor(this.texture.height / 2) * -1);
	        context.restore();
	    };
	    return Drawable;
	}(gameobject_1.default));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Drawable;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var constants_1 = __webpack_require__(8);
	var Contribution2 = (function () {
	    function Contribution2(multiplier, xsb, ysb) {
	        this.dx = -xsb - multiplier * constants_1.SQUISH_2D;
	        this.dy = -ysb - multiplier * constants_1.SQUISH_2D;
	        this.xsb = xsb;
	        this.ysb = ysb;
	    }
	    return Contribution2;
	}());
	var Contribution3 = (function () {
	    function Contribution3(multiplier, xsb, ysb, zsb) {
	        this.dx = -xsb - multiplier * constants_1.SQUISH_2D;
	        this.dy = -ysb - multiplier * constants_1.SQUISH_2D;
	        this.dz = -zsb - multiplier * constants_1.SQUISH_2D;
	        this.xsb = xsb;
	        this.ysb = ysb;
	        this.zsb = zsb;
	    }
	    return Contribution3;
	}());
	var Contribution4 = (function () {
	    function Contribution4(multiplier, xsb, ysb, zsb, wsb) {
	        this.dx = -xsb - multiplier * constants_1.SQUISH_2D;
	        this.dy = -ysb - multiplier * constants_1.SQUISH_2D;
	        this.dz = -zsb - multiplier * constants_1.SQUISH_2D;
	        this.dw = -wsb - multiplier * constants_1.SQUISH_2D;
	        this.xsb = xsb;
	        this.ysb = ysb;
	        this.zsb = zsb;
	        this.wsb = wsb;
	    }
	    return Contribution4;
	}());
	function shuffleSeed(seed) {
	    var newSeed = new Uint32Array(1);
	    newSeed[0] = seed[0] * 1664525 + 1013904223;
	    return newSeed;
	}
	var OpenSimplexNoise = (function () {
	    function OpenSimplexNoise(clientSeed) {
	        var _this = this;
	        this.noise3D = function (x, y, z) {
	            var stretchOffset = (x + y + z) * constants_1.STRETCH_3D;
	            var _a = [x + stretchOffset, y + stretchOffset, z + stretchOffset], xs = _a[0], ys = _a[1], zs = _a[2];
	            var _b = [Math.floor(xs), Math.floor(ys), Math.floor(zs)], xsb = _b[0], ysb = _b[1], zsb = _b[2];
	            var squishOffset = (xsb + ysb + zsb) * constants_1.SQUISH_3D;
	            var _c = [x - (xsb + squishOffset), y - (ysb + squishOffset), z - (zsb + squishOffset)], dx0 = _c[0], dy0 = _c[1], dz0 = _c[2];
	            var _d = [xs - xsb, ys - ysb, zs - zsb], xins = _d[0], yins = _d[1], zins = _d[2];
	            var inSum = xins + yins + zins;
	            var hashVals = new Uint32Array(7);
	            hashVals[0] = yins - zins + 1;
	            hashVals[1] = xins - yins + 1;
	            hashVals[2] = xins - zins + 1;
	            hashVals[3] = inSum;
	            hashVals[4] = inSum + zins;
	            hashVals[5] = inSum + yins;
	            hashVals[6] = inSum + xins;
	            var hash = hashVals[0] | hashVals[1] << 1 | hashVals[2] << 2 | hashVals[3] << 3 | hashVals[4] << 5 |
	                hashVals[5] << 7 | hashVals[6] << 9;
	            var c = _this.lookup3D[hash];
	            var value = 0.0;
	            while (typeof c !== 'undefined') {
	                var _e = [dx0 + c.dx, dy0 + c.dy, dz0 + c.dz], dx = _e[0], dy = _e[1], dz = _e[2];
	                var attn = 2 - dx * dx - dy * dy - dz * dz;
	                if (attn > 0) {
	                    var _f = [xsb + c.xsb, ysb + c.ysb, zsb + c.zsb], px = _f[0], py = _f[1], pz = _f[2];
	                    var i = _this.perm3D[(_this.perm[(_this.perm[px & 0xFF] + py) & 0xFF] + pz) & 0xFF];
	                    var valuePart = constants_1.gradients3D[i] * dx + constants_1.gradients3D[i + 1] * dy + constants_1.gradients3D[i + 2] * dz;
	                    attn *= attn;
	                    value += attn * attn * valuePart;
	                }
	                c = c.next;
	            }
	            return value * constants_1.NORM_3D;
	        };
	        this.initialize();
	        this.perm = new Uint8Array(256);
	        this.perm2D = new Uint8Array(256);
	        this.perm3D = new Uint8Array(256);
	        this.perm4D = new Uint8Array(256);
	        var source = new Uint8Array(256);
	        for (var i = 0; i < 256; i++)
	            source[i] = i;
	        var seed = new Uint32Array(1);
	        seed[0] = clientSeed;
	        seed = shuffleSeed(shuffleSeed(shuffleSeed(seed)));
	        for (var i = 255; i >= 0; i--) {
	            seed = shuffleSeed(seed);
	            var r = new Uint32Array(1);
	            r[0] = (seed[0] + 31) % (i + 1);
	            if (r[0] < 0)
	                r[0] += (i + 1);
	            this.perm[i] = source[r[0]];
	            this.perm2D[i] = this.perm[i] & 0x0E;
	            this.perm3D[i] = (this.perm[i] % 24) * 3;
	            this.perm4D[i] = this.perm[i] & 0xFC;
	            source[r[0]] = source[i];
	        }
	    }
	    OpenSimplexNoise.prototype.noise2D = function (x, y) {
	        var stretchOffset = (x + y) * constants_1.STRETCH_2D;
	        var _a = [x + stretchOffset, y + stretchOffset], xs = _a[0], ys = _a[1];
	        var _b = [Math.floor(xs), Math.floor(ys)], xsb = _b[0], ysb = _b[1];
	        var squishOffset = (xsb + ysb) * constants_1.SQUISH_2D;
	        var _c = [x - (xsb + squishOffset), y - (ysb + squishOffset)], dx0 = _c[0], dy0 = _c[1];
	        var _d = [xs - xsb, ys - ysb], xins = _d[0], yins = _d[1];
	        var inSum = xins + yins;
	        var hashVals = new Uint32Array(4);
	        hashVals[0] = xins - yins + 1;
	        hashVals[1] = inSum;
	        hashVals[2] = inSum + yins;
	        hashVals[3] = inSum + xins;
	        var hash = hashVals[0] | (hashVals[1] << 1) | (hashVals[2] << 2) | (hashVals[3] << 4);
	        var c = this.lookup2D[hash];
	        var value = 0.0;
	        while (typeof c !== 'undefined') {
	            var _e = [dx0 + c.dx, dy0 + c.dy], dx = _e[0], dy = _e[1];
	            var attn = 2 - dx * dx - dy * dy;
	            if (attn > 0) {
	                var _f = [xsb + c.xsb, ysb + c.ysb], px = _f[0], py = _f[1];
	                var i = this.perm2D[(this.perm[px & 0xFF] + py) & 0xFF];
	                var valuePart = constants_1.gradients2D[i] * dx + constants_1.gradients2D[i + 1] * dy;
	                attn *= attn;
	                value += attn * attn * valuePart;
	            }
	            c = c.next;
	        }
	        return value * constants_1.NORM_2D;
	    };
	    OpenSimplexNoise.prototype.noise4D = function (x, y, z, w) {
	        var stretchOffset = (x + y + z + w) * constants_1.STRETCH_4D;
	        var _a = [x + stretchOffset, y + stretchOffset, z + stretchOffset, w + stretchOffset], xs = _a[0], ys = _a[1], zs = _a[2], ws = _a[3];
	        var _b = [Math.floor(xs), Math.floor(ys), Math.floor(zs), Math.floor(ws)], xsb = _b[0], ysb = _b[1], zsb = _b[2], wsb = _b[3];
	        var squishOffset = (xsb + ysb + zsb + wsb) * constants_1.SQUISH_4D;
	        var dx0 = x - (xsb + squishOffset);
	        var dy0 = y - (ysb + squishOffset);
	        var dz0 = z - (zsb + squishOffset);
	        var dw0 = w - (wsb + squishOffset);
	        var _c = [xs - xsb, ys - ysb, zs - zsb, ws - wsb], xins = _c[0], yins = _c[1], zins = _c[2], wins = _c[3];
	        var inSum = xins + yins + zins + wins;
	        var hashVals = new Uint32Array(11);
	        hashVals[0] = zins - wins + 1;
	        hashVals[1] = yins - zins + 1;
	        hashVals[2] = yins - wins + 1;
	        hashVals[3] = xins - yins + 1;
	        hashVals[4] = xins - zins + 1;
	        hashVals[5] = xins - wins + 1;
	        hashVals[6] = inSum << 6;
	        hashVals[7] = inSum + wins;
	        hashVals[8] = inSum + zins;
	        hashVals[9] = inSum + yins;
	        hashVals[10] = inSum + xins;
	        var hash = hashVals[0] | hashVals[1] << 1 | hashVals[2] << 2 | hashVals[3] << 3 | hashVals[4] << 4 | hashVals[5] << 5 |
	            hashVals[6] << 6 | hashVals[7] << 8 | hashVals[8] << 11 | hashVals[9] << 14 | hashVals[10] << 17;
	        var c = this.lookup4D[hash];
	        var value = 0.0;
	        while (typeof c !== 'undefined') {
	            var _d = [dx0 + c.dx, dy0 + c.dy, dz0 + c.dz, dw0 + c.dw], dx = _d[0], dy = _d[1], dz = _d[2], dw = _d[3];
	            var attn = 2 - dx * dx - dy * dy - dz * dz - dw * dw;
	            if (attn > 0) {
	                var _e = [xsb + c.xsb, ysb + c.ysb, zsb + c.zsb, wsb + c.wsb], px = _e[0], py = _e[1], pz = _e[2], pw = _e[3];
	                var i = this.perm4D[(this.perm[(this.perm[(this.perm[px & 0xFF] + py) & 0xFF] + pz) & 0xFF] + pw) & 0xFF];
	                var valuePart = constants_1.gradients4D[i] * dx + constants_1.gradients4D[i + 1] * dy + constants_1.gradients4D[i + 2] * dz + constants_1.gradients4D[i + 3] * dw;
	                attn *= attn;
	                value += attn * attn * valuePart;
	            }
	            c = c.next;
	        }
	        return value * constants_1.NORM_4D;
	    };
	    OpenSimplexNoise.prototype.initialize = function () {
	        var contributions2D = [];
	        for (var i = 0; i < constants_1.p2D.length; i += 4) {
	            var baseSet = constants_1.base2D[constants_1.p2D[i]];
	            var previous = null;
	            var current = null;
	            for (var k = 0; k < baseSet.length; k += 3) {
	                current = new Contribution2(baseSet[k], baseSet[k + 1], baseSet[k + 2]);
	                if (previous === null)
	                    contributions2D[i / 4] = current;
	                else
	                    previous.next = current;
	                previous = current;
	            }
	            current.next = new Contribution2(constants_1.p2D[i + 1], constants_1.p2D[i + 2], constants_1.p2D[i + 3]);
	        }
	        this.lookup2D = [];
	        for (var i = 0; i < constants_1.lookupPairs2D.length; i += 2) {
	            this.lookup2D[constants_1.lookupPairs2D[i]] = contributions2D[constants_1.lookupPairs2D[i + 1]];
	        }
	        var contributions3D = [];
	        for (var i = 0; i < constants_1.p3D.length; i += 9) {
	            var baseSet = constants_1.base3D[constants_1.p3D[i]];
	            var previous = null;
	            var current = null;
	            for (var k = 0; k < baseSet.length; k += 4) {
	                current = new Contribution3(baseSet[k], baseSet[k + 1], baseSet[k + 2], baseSet[k + 3]);
	                if (previous === null)
	                    contributions3D[i / 9] = current;
	                else
	                    previous.next = current;
	                previous = current;
	            }
	            current.next = new Contribution3(constants_1.p3D[i + 1], constants_1.p3D[i + 2], constants_1.p3D[i + 3], constants_1.p3D[i + 4]);
	            current.next.next = new Contribution3(constants_1.p3D[i + 5], constants_1.p3D[i + 6], constants_1.p3D[i + 7], constants_1.p3D[i + 8]);
	        }
	        this.lookup3D = [];
	        for (var i = 0; i < constants_1.lookupPairs3D.length; i += 2) {
	            this.lookup3D[constants_1.lookupPairs3D[i]] = contributions3D[constants_1.lookupPairs3D[i + 1]];
	        }
	        var contributions4D = [];
	        for (var i = 0; i < constants_1.p4D.length; i += 16) {
	            var baseSet = constants_1.base4D[constants_1.p4D[i]];
	            var previous = null;
	            var current = null;
	            for (var k = 0; k < baseSet.length; k += 5) {
	                current = new Contribution4(baseSet[k], baseSet[k + 1], baseSet[k + 2], baseSet[k + 3], baseSet[k + 4]);
	                if (previous === null)
	                    contributions4D[i / 16] = current;
	                else
	                    previous.next = current;
	                previous = current;
	            }
	            current.next = new Contribution4(constants_1.p4D[i + 1], constants_1.p4D[i + 2], constants_1.p4D[i + 3], constants_1.p4D[i + 4], constants_1.p4D[i + 5]);
	            current.next.next = new Contribution4(constants_1.p4D[i + 6], constants_1.p4D[i + 7], constants_1.p4D[i + 8], constants_1.p4D[i + 9], constants_1.p4D[i + 10]);
	            current.next.next.next = new Contribution4(constants_1.p4D[i + 11], constants_1.p4D[i + 12], constants_1.p4D[i + 13], constants_1.p4D[i + 14], constants_1.p4D[i + 15]);
	        }
	        this.lookup4D = [];
	        for (var i = 0; i < constants_1.lookupPairs4D.length; i += 2) {
	            this.lookup4D[constants_1.lookupPairs4D[i]] = contributions4D[constants_1.lookupPairs4D[i + 1]];
	        }
	    };
	    return OpenSimplexNoise;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = OpenSimplexNoise;


/***/ }),
/* 8 */
/***/ (function(module, exports) {

	"use strict";
	exports.NORM_2D = 1.0 / 47.0;
	exports.NORM_3D = 1.0 / 103.0;
	exports.NORM_4D = 1.0 / 30.0;
	exports.SQUISH_2D = (Math.sqrt(2 + 1) - 1) / 2;
	exports.SQUISH_3D = (Math.sqrt(3 + 1) - 1) / 3;
	exports.SQUISH_4D = (Math.sqrt(4 + 1) - 1) / 4;
	exports.STRETCH_2D = (1 / Math.sqrt(2 + 1) - 1) / 2;
	exports.STRETCH_3D = (1 / Math.sqrt(3 + 1) - 1) / 3;
	exports.STRETCH_4D = (1 / Math.sqrt(4 + 1) - 1) / 4;
	exports.base2D = [
	    [1, 1, 0, 1, 0, 1, 0, 0, 0],
	    [1, 1, 0, 1, 0, 1, 2, 1, 1]
	];
	exports.base3D = [
	    [0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1],
	    [2, 1, 1, 0, 2, 1, 0, 1, 2, 0, 1, 1, 3, 1, 1, 1],
	    [1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 2, 1, 1, 0, 2, 1, 0, 1, 2, 0, 1, 1]
	];
	exports.base4D = [
	    [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1],
	    [3, 1, 1, 1, 0, 3, 1, 1, 0, 1, 3, 1, 0, 1, 1, 3, 0, 1, 1, 1, 4, 1, 1, 1, 1],
	    [
	        1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 2, 1, 1, 0, 0, 2, 1, 0, 1, 0, 2, 1, 0, 0, 1, 2, 0, 1, 1,
	        0, 2, 0, 1, 0, 1, 2, 0, 0, 1, 1
	    ],
	    [
	        3, 1, 1, 1, 0, 3, 1, 1, 0, 1, 3, 1, 0, 1, 1, 3, 0, 1, 1, 1, 2, 1, 1, 0, 0, 2, 1, 0, 1, 0, 2, 1, 0, 0, 1, 2, 0, 1, 1,
	        0, 2, 0, 1, 0, 1, 2, 0, 0, 1, 1
	    ]
	];
	exports.gradients2D = [5, 2, 2, 5, -5, 2, -2, 5, 5, -2, 2, -5, -5, -2, -2, -5];
	exports.gradients3D = [
	    -11, 4, 4, -4, 11, 4, -4, 4, 11,
	    11, 4, 4, 4, 11, 4, 4, 4, 11,
	    -11, -4, 4, -4, -11, 4, -4, -4, 11,
	    11, -4, 4, 4, -11, 4, 4, -4, 11,
	    -11, 4, -4, -4, 11, -4, -4, 4, -11,
	    11, 4, -4, 4, 11, -4, 4, 4, -11,
	    -11, -4, -4, -4, -11, -4, -4, -4, -11,
	    11, -4, -4, 4, -11, -4, 4, -4, -11
	];
	exports.gradients4D = [
	    3, 1, 1, 1, 1, 3, 1, 1, 1, 1, 3, 1, 1, 1, 1, 3,
	    -3, 1, 1, 1, -1, 3, 1, 1, -1, 1, 3, 1, -1, 1, 1, 3,
	    3, -1, 1, 1, 1, -3, 1, 1, 1, -1, 3, 1, 1, -1, 1, 3,
	    -3, -1, 1, 1, -1, -3, 1, 1, -1, -1, 3, 1, -1, -1, 1, 3,
	    3, 1, -1, 1, 1, 3, -1, 1, 1, 1, -3, 1, 1, 1, -1, 3,
	    -3, 1, -1, 1, -1, 3, -1, 1, -1, 1, -3, 1, -1, 1, -1, 3,
	    3, -1, -1, 1, 1, -3, -1, 1, 1, -1, -3, 1, 1, -1, -1, 3,
	    -3, -1, -1, 1, -1, -3, -1, 1, -1, -1, -3, 1, -1, -1, -1, 3,
	    3, 1, 1, -1, 1, 3, 1, -1, 1, 1, 3, -1, 1, 1, 1, -3,
	    -3, 1, 1, -1, -1, 3, 1, -1, -1, 1, 3, -1, -1, 1, 1, -3,
	    3, -1, 1, -1, 1, -3, 1, -1, 1, -1, 3, -1, 1, -1, 1, -3,
	    -3, -1, 1, -1, -1, -3, 1, -1, -1, -1, 3, -1, -1, -1, 1, -3,
	    3, 1, -1, -1, 1, 3, -1, -1, 1, 1, -3, -1, 1, 1, -1, -3,
	    -3, 1, -1, -1, -1, 3, -1, -1, -1, 1, -3, -1, -1, 1, -1, -3,
	    3, -1, -1, -1, 1, -3, -1, -1, 1, -1, -3, -1, 1, -1, -1, -3,
	    -3, -1, -1, -1, -1, -3, -1, -1, -1, -1, -3, -1, -1, -1, -1, -3
	];
	exports.lookupPairs2D = [0, 1, 1, 0, 4, 1, 17, 0, 20, 2, 21, 2, 22, 5, 23, 5, 26, 4, 39, 3, 42, 4, 43, 3];
	exports.lookupPairs3D = [
	    0, 2, 1, 1, 2, 2, 5, 1, 6, 0, 7, 0, 32, 2, 34, 2, 129, 1, 133, 1, 160, 5, 161, 5, 518, 0, 519, 0, 546, 4, 550, 4, 645,
	    3, 647, 3, 672, 5, 673, 5, 674, 4, 677, 3, 678, 4, 679, 3, 680, 13, 681, 13, 682, 12, 685, 14, 686, 12, 687, 14, 712,
	    20, 714, 18, 809, 21, 813, 23, 840, 20, 841, 21, 1198, 19, 1199, 22, 1226, 18, 1230, 19, 1325, 23, 1327, 22, 1352, 15,
	    1353, 17, 1354, 15, 1357, 17, 1358, 16, 1359, 16, 1360, 11, 1361, 10, 1362, 11, 1365, 10, 1366, 9, 1367, 9, 1392, 11,
	    1394, 11, 1489, 10, 1493, 10, 1520, 8, 1521, 8, 1878, 9, 1879, 9, 1906, 7, 1910, 7, 2005, 6, 2007, 6, 2032, 8, 2033,
	    8, 2034, 7, 2037, 6, 2038, 7, 2039, 6
	];
	exports.lookupPairs4D = [
	    0, 3, 1, 2, 2, 3, 5, 2, 6, 1, 7, 1, 8, 3, 9, 2, 10, 3, 13, 2, 16, 3, 18, 3, 22, 1, 23, 1, 24, 3, 26, 3, 33, 2, 37, 2,
	    38, 1, 39, 1, 41, 2, 45, 2, 54, 1, 55, 1, 56, 0, 57, 0, 58, 0, 59, 0, 60, 0, 61, 0, 62, 0, 63, 0, 256, 3, 258, 3, 264,
	    3, 266, 3, 272, 3, 274, 3, 280, 3, 282, 3, 2049, 2, 2053, 2, 2057, 2, 2061, 2, 2081, 2, 2085, 2, 2089, 2, 2093, 2,
	    2304, 9, 2305, 9, 2312, 9, 2313, 9, 16390, 1, 16391, 1, 16406, 1, 16407, 1, 16422, 1, 16423, 1, 16438, 1, 16439, 1,
	    16642, 8, 16646, 8, 16658, 8, 16662, 8, 18437, 6, 18439, 6, 18469, 6, 18471, 6, 18688, 9, 18689, 9, 18690, 8, 18693,
	    6, 18694, 8, 18695, 6, 18696, 9, 18697, 9, 18706, 8, 18710, 8, 18725, 6, 18727, 6, 131128, 0, 131129, 0, 131130, 0,
	    131131, 0, 131132, 0, 131133, 0, 131134, 0, 131135, 0, 131352, 7, 131354, 7, 131384, 7, 131386, 7, 133161, 5, 133165,
	    5, 133177, 5, 133181, 5, 133376, 9, 133377, 9, 133384, 9, 133385, 9, 133400, 7, 133402, 7, 133417, 5, 133421, 5,
	    133432, 7, 133433, 5, 133434, 7, 133437, 5, 147510, 4, 147511, 4, 147518, 4, 147519, 4, 147714, 8, 147718, 8, 147730,
	    8, 147734, 8, 147736, 7, 147738, 7, 147766, 4, 147767, 4, 147768, 7, 147770, 7, 147774, 4, 147775, 4, 149509, 6,
	    149511, 6, 149541, 6, 149543, 6, 149545, 5, 149549, 5, 149558, 4, 149559, 4, 149561, 5, 149565, 5, 149566, 4, 149567,
	    4, 149760, 9, 149761, 9, 149762, 8, 149765, 6, 149766, 8, 149767, 6, 149768, 9, 149769, 9, 149778, 8, 149782, 8,
	    149784, 7, 149786, 7, 149797, 6, 149799, 6, 149801, 5, 149805, 5, 149814, 4, 149815, 4, 149816, 7, 149817, 5, 149818,
	    7, 149821, 5, 149822, 4, 149823, 4, 149824, 37, 149825, 37, 149826, 36, 149829, 34, 149830, 36, 149831, 34, 149832,
	    37, 149833, 37, 149842, 36, 149846, 36, 149848, 35, 149850, 35, 149861, 34, 149863, 34, 149865, 33, 149869, 33,
	    149878, 32, 149879, 32, 149880, 35, 149881, 33, 149882, 35, 149885, 33, 149886, 32, 149887, 32, 150080, 49, 150082,
	    48, 150088, 49, 150098, 48, 150104, 47, 150106, 47, 151873, 46, 151877, 45, 151881, 46, 151909, 45, 151913, 44,
	    151917, 44, 152128, 49, 152129, 46, 152136, 49, 152137, 46, 166214, 43, 166215, 42, 166230, 43, 166247, 42, 166262,
	    41, 166263, 41, 166466, 48, 166470, 43, 166482, 48, 166486, 43, 168261, 45, 168263, 42, 168293, 45, 168295, 42,
	    168512, 31, 168513, 28, 168514, 31, 168517, 28, 168518, 25, 168519, 25, 280952, 40, 280953, 39, 280954, 40, 280957,
	    39, 280958, 38, 280959, 38, 281176, 47, 281178, 47, 281208, 40, 281210, 40, 282985, 44, 282989, 44, 283001, 39,
	    283005, 39, 283208, 30, 283209, 27, 283224, 30, 283241, 27, 283256, 22, 283257, 22, 297334, 41, 297335, 41, 297342,
	    38, 297343, 38, 297554, 29, 297558, 24, 297562, 29, 297590, 24, 297594, 21, 297598, 21, 299365, 26, 299367, 23,
	    299373, 26, 299383, 23, 299389, 20, 299391, 20, 299584, 31, 299585, 28, 299586, 31, 299589, 28, 299590, 25, 299591,
	    25, 299592, 30, 299593, 27, 299602, 29, 299606, 24, 299608, 30, 299610, 29, 299621, 26, 299623, 23, 299625, 27,
	    299629, 26, 299638, 24, 299639, 23, 299640, 22, 299641, 22, 299642, 21, 299645, 20, 299646, 21, 299647, 20, 299648,
	    61, 299649, 60, 299650, 61, 299653, 60, 299654, 59, 299655, 59, 299656, 58, 299657, 57, 299666, 55, 299670, 54,
	    299672, 58, 299674, 55, 299685, 52, 299687, 51, 299689, 57, 299693, 52, 299702, 54, 299703, 51, 299704, 56, 299705,
	    56, 299706, 53, 299709, 50, 299710, 53, 299711, 50, 299904, 61, 299906, 61, 299912, 58, 299922, 55, 299928, 58,
	    299930, 55, 301697, 60, 301701, 60, 301705, 57, 301733, 52, 301737, 57, 301741, 52, 301952, 79, 301953, 79, 301960,
	    76, 301961, 76, 316038, 59, 316039, 59, 316054, 54, 316071, 51, 316086, 54, 316087, 51, 316290, 78, 316294, 78,
	    316306, 73, 316310, 73, 318085, 77, 318087, 77, 318117, 70, 318119, 70, 318336, 79, 318337, 79, 318338, 78, 318341,
	    77, 318342, 78, 318343, 77, 430776, 56, 430777, 56, 430778, 53, 430781, 50, 430782, 53, 430783, 50, 431000, 75,
	    431002, 72, 431032, 75, 431034, 72, 432809, 74, 432813, 69, 432825, 74, 432829, 69, 433032, 76, 433033, 76, 433048,
	    75, 433065, 74, 433080, 75, 433081, 74, 447158, 71, 447159, 68, 447166, 71, 447167, 68, 447378, 73, 447382, 73,
	    447386, 72, 447414, 71, 447418, 72, 447422, 71, 449189, 70, 449191, 70, 449197, 69, 449207, 68, 449213, 69, 449215,
	    68, 449408, 67, 449409, 67, 449410, 66, 449413, 64, 449414, 66, 449415, 64, 449416, 67, 449417, 67, 449426, 66,
	    449430, 66, 449432, 65, 449434, 65, 449445, 64, 449447, 64, 449449, 63, 449453, 63, 449462, 62, 449463, 62, 449464,
	    65, 449465, 63, 449466, 65, 449469, 63, 449470, 62, 449471, 62, 449472, 19, 449473, 19, 449474, 18, 449477, 16,
	    449478, 18, 449479, 16, 449480, 19, 449481, 19, 449490, 18, 449494, 18, 449496, 17, 449498, 17, 449509, 16, 449511,
	    16, 449513, 15, 449517, 15, 449526, 14, 449527, 14, 449528, 17, 449529, 15, 449530, 17, 449533, 15, 449534, 14,
	    449535, 14, 449728, 19, 449729, 19, 449730, 18, 449734, 18, 449736, 19, 449737, 19, 449746, 18, 449750, 18, 449752,
	    17, 449754, 17, 449784, 17, 449786, 17, 451520, 19, 451521, 19, 451525, 16, 451527, 16, 451528, 19, 451529, 19,
	    451557, 16, 451559, 16, 451561, 15, 451565, 15, 451577, 15, 451581, 15, 451776, 19, 451777, 19, 451784, 19, 451785,
	    19, 465858, 18, 465861, 16, 465862, 18, 465863, 16, 465874, 18, 465878, 18, 465893, 16, 465895, 16, 465910, 14,
	    465911, 14, 465918, 14, 465919, 14, 466114, 18, 466118, 18, 466130, 18, 466134, 18, 467909, 16, 467911, 16, 467941,
	    16, 467943, 16, 468160, 13, 468161, 13, 468162, 13, 468163, 13, 468164, 13, 468165, 13, 468166, 13, 468167, 13,
	    580568, 17, 580570, 17, 580585, 15, 580589, 15, 580598, 14, 580599, 14, 580600, 17, 580601, 15, 580602, 17, 580605,
	    15, 580606, 14, 580607, 14, 580824, 17, 580826, 17, 580856, 17, 580858, 17, 582633, 15, 582637, 15, 582649, 15,
	    582653, 15, 582856, 12, 582857, 12, 582872, 12, 582873, 12, 582888, 12, 582889, 12, 582904, 12, 582905, 12, 596982,
	    14, 596983, 14, 596990, 14, 596991, 14, 597202, 11, 597206, 11, 597210, 11, 597214, 11, 597234, 11, 597238, 11,
	    597242, 11, 597246, 11, 599013, 10, 599015, 10, 599021, 10, 599023, 10, 599029, 10, 599031, 10, 599037, 10, 599039,
	    10, 599232, 13, 599233, 13, 599234, 13, 599235, 13, 599236, 13, 599237, 13, 599238, 13, 599239, 13, 599240, 12,
	    599241, 12, 599250, 11, 599254, 11, 599256, 12, 599257, 12, 599258, 11, 599262, 11, 599269, 10, 599271, 10, 599272,
	    12, 599273, 12, 599277, 10, 599279, 10, 599282, 11, 599285, 10, 599286, 11, 599287, 10, 599288, 12, 599289, 12,
	    599290, 11, 599293, 10, 599294, 11, 599295, 10
	];
	exports.p2D = [0, 0, 1, -1, 0, 0, -1, 1, 0, 2, 1, 1, 1, 2, 2, 0, 1, 2, 0, 2, 1, 0, 0, 0];
	exports.p3D = [
	    0, 0, 1, -1, 0, 0, 1, 0, -1, 0, 0, -1, 1, 0, 0, 0, 1, -1, 0, 0, -1, 0, 1, 0, 0, -1, 1, 0, 2, 1, 1, 0, 1, 1, 1, -1, 0,
	    2, 1, 0, 1, 1, 1, -1, 1, 0, 2, 0, 1, 1, 1, -1, 1, 1, 1, 3, 2, 1, 0, 3, 1, 2, 0, 1, 3, 2, 0, 1, 3, 1, 0, 2, 1, 3, 0, 2,
	    1, 3, 0, 1, 2, 1, 1, 1, 0, 0, 2, 2, 0, 0, 1, 1, 0, 1, 0, 2, 0, 2, 0, 1, 1, 0, 0, 1, 2, 0, 0, 2, 2, 0, 0, 0, 0, 1, 1,
	    -1, 1, 2, 0, 0, 0, 0, 1, -1, 1, 1, 2, 0, 0, 0, 0, 1, 1, 1, -1, 2, 3, 1, 1, 1, 2, 0, 0, 2, 2, 3, 1, 1, 1, 2, 2, 0, 0,
	    2, 3, 1, 1, 1, 2, 0, 2, 0, 2, 1, 1, -1, 1, 2, 0, 0, 2, 2, 1, 1, -1, 1, 2, 2, 0, 0, 2, 1, -1, 1, 1, 2, 0, 0, 2, 2, 1,
	    -1, 1, 1, 2, 0, 2, 0, 2, 1, 1, 1, -1, 2, 2, 0, 0, 2, 1, 1, 1, -1, 2, 0, 2, 0
	];
	exports.p4D = [
	    0, 0, 1, -1, 0, 0, 0, 1, 0, -1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 1, 0, 0, 0, 0, 1, -1, 0, 0, 0, 1, 0, -1, 0, 0, -1, 0, 1,
	    0, 0, 0, -1, 1, 0, 0, 0, 0, 1, -1, 0, 0, -1, 0, 0, 1, 0, 0, -1, 0, 1, 0, 0, 0, -1, 1, 0, 2, 1, 1, 0, 0, 1, 1, 1, -1,
	    0, 1, 1, 1, 0, -1, 0, 2, 1, 0, 1, 0, 1, 1, -1, 1, 0, 1, 1, 0, 1, -1, 0, 2, 0, 1, 1, 0, 1, -1, 1, 1, 0, 1, 0, 1, 1, -1,
	    0, 2, 1, 0, 0, 1, 1, 1, -1, 0, 1, 1, 1, 0, -1, 1, 0, 2, 0, 1, 0, 1, 1, -1, 1, 0, 1, 1, 0, 1, -1, 1, 0, 2, 0, 0, 1, 1,
	    1, -1, 0, 1, 1, 1, 0, -1, 1, 1, 1, 4, 2, 1, 1, 0, 4, 1, 2, 1, 0, 4, 1, 1, 2, 0, 1, 4, 2, 1, 0, 1, 4, 1, 2, 0, 1, 4, 1,
	    1, 0, 2, 1, 4, 2, 0, 1, 1, 4, 1, 0, 2, 1, 4, 1, 0, 1, 2, 1, 4, 0, 2, 1, 1, 4, 0, 1, 2, 1, 4, 0, 1, 1, 2, 1, 2, 1, 1,
	    0, 0, 3, 2, 1, 0, 0, 3, 1, 2, 0, 0, 1, 2, 1, 0, 1, 0, 3, 2, 0, 1, 0, 3, 1, 0, 2, 0, 1, 2, 0, 1, 1, 0, 3, 0, 2, 1, 0,
	    3, 0, 1, 2, 0, 1, 2, 1, 0, 0, 1, 3, 2, 0, 0, 1, 3, 1, 0, 0, 2, 1, 2, 0, 1, 0, 1, 3, 0, 2, 0, 1, 3, 0, 1, 0, 2, 1, 2,
	    0, 0, 1, 1, 3, 0, 0, 2, 1, 3, 0, 0, 1, 2, 2, 3, 1, 1, 1, 0, 2, 1, 1, 1, -1, 2, 2, 0, 0, 0, 2, 3, 1, 1, 0, 1, 2, 1, 1,
	    -1, 1, 2, 2, 0, 0, 0, 2, 3, 1, 0, 1, 1, 2, 1, -1, 1, 1, 2, 2, 0, 0, 0, 2, 3, 1, 1, 1, 0, 2, 1, 1, 1, -1, 2, 0, 2, 0,
	    0, 2, 3, 1, 1, 0, 1, 2, 1, 1, -1, 1, 2, 0, 2, 0, 0, 2, 3, 0, 1, 1, 1, 2, -1, 1, 1, 1, 2, 0, 2, 0, 0, 2, 3, 1, 1, 1, 0,
	    2, 1, 1, 1, -1, 2, 0, 0, 2, 0, 2, 3, 1, 0, 1, 1, 2, 1, -1, 1, 1, 2, 0, 0, 2, 0, 2, 3, 0, 1, 1, 1, 2, -1, 1, 1, 1, 2,
	    0, 0, 2, 0, 2, 3, 1, 1, 0, 1, 2, 1, 1, -1, 1, 2, 0, 0, 0, 2, 2, 3, 1, 0, 1, 1, 2, 1, -1, 1, 1, 2, 0, 0, 0, 2, 2, 3, 0,
	    1, 1, 1, 2, -1, 1, 1, 1, 2, 0, 0, 0, 2, 2, 1, 1, 1, -1, 0, 1, 1, 1, 0, -1, 0, 0, 0, 0, 0, 2, 1, 1, -1, 1, 0, 1, 1, 0,
	    1, -1, 0, 0, 0, 0, 0, 2, 1, -1, 1, 1, 0, 1, 0, 1, 1, -1, 0, 0, 0, 0, 0, 2, 1, 1, -1, 0, 1, 1, 1, 0, -1, 1, 0, 0, 0, 0,
	    0, 2, 1, -1, 1, 0, 1, 1, 0, 1, -1, 1, 0, 0, 0, 0, 0, 2, 1, -1, 0, 1, 1, 1, 0, -1, 1, 1, 0, 0, 0, 0, 0, 2, 1, 1, 1, -1,
	    0, 1, 1, 1, 0, -1, 2, 2, 0, 0, 0, 2, 1, 1, -1, 1, 0, 1, 1, 0, 1, -1, 2, 2, 0, 0, 0, 2, 1, 1, -1, 0, 1, 1, 1, 0, -1, 1,
	    2, 2, 0, 0, 0, 2, 1, 1, 1, -1, 0, 1, 1, 1, 0, -1, 2, 0, 2, 0, 0, 2, 1, -1, 1, 1, 0, 1, 0, 1, 1, -1, 2, 0, 2, 0, 0, 2,
	    1, -1, 1, 0, 1, 1, 0, 1, -1, 1, 2, 0, 2, 0, 0, 2, 1, 1, -1, 1, 0, 1, 1, 0, 1, -1, 2, 0, 0, 2, 0, 2, 1, -1, 1, 1, 0, 1,
	    0, 1, 1, -1, 2, 0, 0, 2, 0, 2, 1, -1, 0, 1, 1, 1, 0, -1, 1, 1, 2, 0, 0, 2, 0, 2, 1, 1, -1, 0, 1, 1, 1, 0, -1, 1, 2, 0,
	    0, 0, 2, 2, 1, -1, 1, 0, 1, 1, 0, 1, -1, 1, 2, 0, 0, 0, 2, 2, 1, -1, 0, 1, 1, 1, 0, -1, 1, 1, 2, 0, 0, 0, 2, 3, 1, 1,
	    0, 0, 0, 2, 2, 0, 0, 0, 2, 1, 1, 1, -1, 3, 1, 0, 1, 0, 0, 2, 0, 2, 0, 0, 2, 1, 1, 1, -1, 3, 1, 0, 0, 1, 0, 2, 0, 0, 2,
	    0, 2, 1, 1, 1, -1, 3, 1, 1, 0, 0, 0, 2, 2, 0, 0, 0, 2, 1, 1, -1, 1, 3, 1, 0, 1, 0, 0, 2, 0, 2, 0, 0, 2, 1, 1, -1, 1,
	    3, 1, 0, 0, 0, 1, 2, 0, 0, 0, 2, 2, 1, 1, -1, 1, 3, 1, 1, 0, 0, 0, 2, 2, 0, 0, 0, 2, 1, -1, 1, 1, 3, 1, 0, 0, 1, 0, 2,
	    0, 0, 2, 0, 2, 1, -1, 1, 1, 3, 1, 0, 0, 0, 1, 2, 0, 0, 0, 2, 2, 1, -1, 1, 1, 3, 1, 0, 1, 0, 0, 2, 0, 2, 0, 0, 2, -1,
	    1, 1, 1, 3, 1, 0, 0, 1, 0, 2, 0, 0, 2, 0, 2, -1, 1, 1, 1, 3, 1, 0, 0, 0, 1, 2, 0, 0, 0, 2, 2, -1, 1, 1, 1, 3, 3, 2, 1,
	    0, 0, 3, 1, 2, 0, 0, 4, 1, 1, 1, 1, 3, 3, 2, 0, 1, 0, 3, 1, 0, 2, 0, 4, 1, 1, 1, 1, 3, 3, 0, 2, 1, 0, 3, 0, 1, 2, 0,
	    4, 1, 1, 1, 1, 3, 3, 2, 0, 0, 1, 3, 1, 0, 0, 2, 4, 1, 1, 1, 1, 3, 3, 0, 2, 0, 1, 3, 0, 1, 0, 2, 4, 1, 1, 1, 1, 3, 3,
	    0, 0, 2, 1, 3, 0, 0, 1, 2, 4, 1, 1, 1, 1, 3, 3, 2, 1, 0, 0, 3, 1, 2, 0, 0, 2, 1, 1, 1, -1, 3, 3, 2, 0, 1, 0, 3, 1, 0,
	    2, 0, 2, 1, 1, 1, -1, 3, 3, 0, 2, 1, 0, 3, 0, 1, 2, 0, 2, 1, 1, 1, -1, 3, 3, 2, 1, 0, 0, 3, 1, 2, 0, 0, 2, 1, 1, -1,
	    1, 3, 3, 2, 0, 0, 1, 3, 1, 0, 0, 2, 2, 1, 1, -1, 1, 3, 3, 0, 2, 0, 1, 3, 0, 1, 0, 2, 2, 1, 1, -1, 1, 3, 3, 2, 0, 1, 0,
	    3, 1, 0, 2, 0, 2, 1, -1, 1, 1, 3, 3, 2, 0, 0, 1, 3, 1, 0, 0, 2, 2, 1, -1, 1, 1, 3, 3, 0, 0, 2, 1, 3, 0, 0, 1, 2, 2,
	    1, -1, 1, 1, 3, 3, 0, 2, 1, 0, 3, 0, 1, 2, 0, 2, -1, 1, 1, 1, 3, 3, 0, 2, 0, 1, 3, 0, 1, 0, 2, 2, -1, 1, 1, 1, 3, 3,
	    0, 0, 2, 1, 3, 0, 0, 1, 2, 2, -1, 1, 1, 1
	];


/***/ }),
/* 9 */
/***/ (function(module, exports) {

	// https://github.com/joshforisha/fractal-noise-js
	// https://github.com/joshforisha/fractal-noise-js/blob/master/LICENSE
	"use strict";
	var TWO_PI = 2 * Math.PI;
	function makeCuboid(width, height, depth, noise3, options) {
	    if (options === void 0) { options = {}; }
	    var _a = processOptions(options), amplitude = _a.amplitude, frequency = _a.frequency, octaves = _a.octaves, persistence = _a.persistence;
	    var field = new Array(width);
	    for (var x = 0; x < width; x++) {
	        field[x] = new Array(height);
	        for (var y = 0; y < height; y++) {
	            field[x][y] = new Array(depth);
	            for (var z = 0; z < depth; z++) {
	                var value = 0.0;
	                for (var octave = 0; octave < octaves; octave++) {
	                    var freq = frequency * Math.pow(2, octave);
	                    value += noise3(x * freq, y * freq, z * freq) * (amplitude * Math.pow(persistence, octave));
	                }
	                field[x][y][z] = value / (2 - (1 / Math.pow(2, octaves - 1)));
	            }
	        }
	    }
	    return field;
	}
	exports.makeCuboid = makeCuboid;
	function makeCylinderSurface(circumference, height, noise3, options) {
	    if (options === void 0) { options = {}; }
	    var _a = processOptions(options), amplitude = _a.amplitude, frequency = _a.frequency, octaves = _a.octaves, persistence = _a.persistence;
	    var radius = circumference / TWO_PI;
	    var field = new Array(circumference);
	    for (var x = 0; x < circumference; x++) {
	        field[x] = new Array(height);
	        for (var y = 0; y < height; y++) {
	            var value = 0.0;
	            for (var octave = 0; octave < octaves; octave++) {
	                var freq = frequency * Math.pow(2, octave);
	                var nx = x / circumference;
	                var rdx = nx * TWO_PI;
	                var _b = [radius * Math.sin(rdx), radius * Math.cos(rdx)], a = _b[0], b = _b[1];
	                value += noise3(a * freq, b * freq, y * freq) * (amplitude * Math.pow(persistence, octave));
	            }
	            field[x][y] = value / (2 - (1 / Math.pow(2, octaves - 1)));
	        }
	    }
	    return field;
	}
	exports.makeCylinderSurface = makeCylinderSurface;
	function makeLine(length, noise1, options) {
	    if (options === void 0) { options = {}; }
	    var _a = processOptions(options), amplitude = _a.amplitude, frequency = _a.frequency, octaves = _a.octaves, persistence = _a.persistence;
	    var field = new Array(length);
	    for (var x = 0; x < length; x++) {
	        var value = 0.0;
	        for (var octave = 0; octave < octaves; octave++) {
	            var freq = frequency * Math.pow(2, octaves);
	            value += noise1(x * freq) * (amplitude * Math.pow(persistence, octave));
	        }
	        field[x] = value / (2 - (1 / Math.pow(2, octaves - 1)));
	    }
	    return field;
	}
	exports.makeLine = makeLine;
	function makeRectangle(width, height, noise2, options) {
	    if (options === void 0) { options = {}; }
	    var _a = processOptions(options), amplitude = _a.amplitude, frequency = _a.frequency, octaves = _a.octaves, persistence = _a.persistence;
	    var field = new Array(width);
	    for (var x = 0; x < width; x++) {
	        field[x] = new Array(height);
	        for (var y = 0; y < height; y++) {
	            var value = 0.0;
	            for (var octave = 0; octave < octaves; octave++) {
	                var freq = frequency * Math.pow(2, octave);
	                value += noise2(x * freq, y * freq) * (amplitude * Math.pow(persistence, octave));
	            }
	            field[x][y] = value / (2 - (1 / Math.pow(2, octaves - 1)));
	        }
	    }
	    return field;
	}
	exports.makeRectangle = makeRectangle;
	function makeSphereSurface(circumference, noise3, options) {
	    if (options === void 0) { options = {}; }
	    var _a = processOptions(options), amplitude = _a.amplitude, frequency = _a.frequency, octaves = _a.octaves, persistence = _a.persistence;
	    var field = new Array(circumference);
	    for (var x = 0; x < circumference; x++) {
	        field[x] = new Array(circumference);
	        for (var y = 0; y < circumference; y++) {
	            var value = 0.0;
	            for (var octave = 0; octave < octaves; octave++) {
	                var freq = frequency * Math.pow(2, octave);
	                var _b = [x / circumference, y / circumference], nx = _b[0], ny = _b[1];
	                var _c = [nx * TWO_PI, ny * Math.PI], rdx = _c[0], rdy = _c[1];
	                var sinY = Math.sin(rdy + Math.PI);
	                var a = TWO_PI * Math.sin(rdx) * sinY;
	                var b = TWO_PI * Math.cos(rdx) * sinY;
	                var d = TWO_PI * Math.cos(rdy);
	                value += noise3(a * freq, b * freq, d * freq) * (amplitude * Math.pow(persistence, octave));
	            }
	            field[x][y] = value / (2 - (1 / Math.pow(2, octaves - 1)));
	        }
	    }
	    return field;
	}
	exports.makeSphereSurface = makeSphereSurface;
	function processOptions(options) {
	    return {
	        amplitude: typeof options.amplitude === 'number' ? options.amplitude : 1.0,
	        frequency: typeof options.frequency === 'number' ? options.frequency : 1.0,
	        octaves: typeof options.octaves === 'number' ? Math.floor(options.octaves) : 1,
	        persistence: typeof options.persistence === 'number' ? options.persistence : 0.5
	    };
	}


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var drawable_1 = __webpack_require__(6);
	var particlesystem_1 = __webpack_require__(11);
	var Ship = (function (_super) {
	    __extends(Ship, _super);
	    function Ship(x, y) {
	        var _this = this;
	        if (x === void 0) { x = 0; }
	        if (y === void 0) { y = 0; }
	        _super.call(this, "images/ship.png", x, y);
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
	        this.smoke = new particlesystem_1.default({
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
	        this.on("collides", function (obstacles) {
	            obstacles.stop();
	            _this.dead = true;
	            _this.explode();
	        });
	        this.on("powerup", function () {
	            _this.pickup.play();
	        });
	    }
	    Ship.prototype.reset = function () {
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
	    };
	    Ship.prototype.keyDown = function (key) {
	        _super.prototype.keyUp.call(this, key);
	        //console.log(key.key);
	        switch (key.key) {
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
	            case " ":
	                this.fire();
	                break;
	        }
	    };
	    Ship.prototype.keyUp = function (key) {
	        _super.prototype.keyDown.call(this, key);
	        switch (key.key) {
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
	    };
	    Ship.prototype.fire = function () {
	        this.emit("fire");
	    };
	    Ship.prototype.explode = function () {
	        var _this = this;
	        this.explosion = new particlesystem_1.default({
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
	        this.explosion.on("eol", function () {
	            delete _this.explosion;
	            _this.emit("death");
	        });
	        this.boom.play();
	    };
	    Ship.prototype.draw = function (context) {
	        if (!this.dead) {
	            _super.prototype.draw.call(this, context);
	            this.smoke.draw(context);
	        }
	        else {
	            if (this.explosion) {
	                this.explosion.draw(context);
	            }
	        }
	    };
	    Ship.prototype.update = function (delta) {
	        _super.prototype.update.call(this, delta);
	        if (this.up) {
	            this.y -= this.velocity * delta;
	            if (this.y < this.upLimit) {
	                this.y = this.upLimit;
	            }
	        }
	        if (this.down) {
	            this.y += this.velocity * delta;
	            if (this.y > this.downLimit) {
	                this.y = this.downLimit;
	            }
	        }
	        if (this.left) {
	            this.x -= this.velocity * delta;
	            if (this.x < this.leftLimit) {
	                this.x = this.leftLimit;
	            }
	        }
	        if (this.right) {
	            this.x += this.velocity * delta;
	            if (this.x > this.rightLimit) {
	                this.x = this.rightLimit;
	            }
	        }
	        this.x = Math.floor(this.x);
	        this.y = Math.floor(this.y);
	        this.smoke.x = this.x;
	        this.smoke.y = this.y + this.texture.height / 2;
	        this.smoke.update(delta);
	        if (this.dead && this.explosion) {
	            this.explosion.update(delta);
	        }
	    };
	    return Ship;
	}(drawable_1.default));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Ship;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var gameobject_1 = __webpack_require__(3);
	var drawable_1 = __webpack_require__(6);
	var Particle = (function (_super) {
	    __extends(Particle, _super);
	    function Particle(options) {
	        _super.call(this, options.texture, options.x || 0, options.y || 0);
	        this.variation = options.variation || 0.1;
	        this.lifeTime = (options.lifeTime / 2) + (options.lifeTime / 2) * Math.random();
	        this.vertical = options.vertical + (this.variation * Math.random() - (this.variation / 2.0));
	        this.horizontal = options.horizontal + (this.variation * Math.random() - (this.variation / 2.0));
	        this.lifeStart = Date.now();
	        this.scale = 1.0;
	        this.alive = true;
	    }
	    Particle.prototype.update = function (delta) {
	        this.y += this.vertical * delta;
	        this.x += this.horizontal * delta;
	        var lifeSoFar = Date.now() - this.lifeStart;
	        this.scale = (1.0 - (1.0 / this.lifeTime) * lifeSoFar);
	        if (this.scale < 0) {
	            this.scale = 0;
	        }
	        if (this.alive && lifeSoFar > this.lifeTime) {
	            this.alive = false;
	            this.emit("eol", this);
	        }
	    };
	    Particle.prototype.draw = function (context) {
	        context.save();
	        context.translate(this.x, this.y);
	        //context.scale(this.scale, this.scale);
	        context.rotate(this.rotation * (Math.PI / 180));
	        var width = (this.texture.width * this.scale);
	        var height = (this.texture.height * this.scale);
	        context.drawImage(this.texture, width / 2 * -1, height / 2 * -1, width, height);
	        context.restore();
	    };
	    return Particle;
	}(drawable_1.default));
	var ParticleSystem = (function (_super) {
	    __extends(ParticleSystem, _super);
	    function ParticleSystem(options) {
	        _super.call(this);
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
	    ParticleSystem.prototype.fill = function () {
	        for (var i = 0; i < this.particleCount; i++) {
	            this.addParticle();
	        }
	    };
	    ParticleSystem.prototype.addParticle = function () {
	        var _this = this;
	        this.options.x = this.x + (Math.random() * this.width | 0);
	        this.options.y = this.y + (Math.random() * this.height | 0);
	        var particle = new Particle(this.options);
	        this.particles.push(particle);
	        particle.on("eol", function (particle) {
	            particle.x = _this.x + (Math.random() * _this.width | 0);
	            particle.y = _this.y + (Math.random() * _this.height | 0);
	            particle.lifeStart = Date.now();
	            particle.alive = true;
	        });
	    };
	    ParticleSystem.prototype.update = function (delta) {
	        _super.prototype.update.call(this, delta);
	        for (var i = 0; i < this.particles.length; i++) {
	            this.particles[i].update(delta);
	        }
	        if (this.systemLifeTime !== 0 && Date.now() - this.lifeStart > this.systemLifeTime) {
	            this.alive = false;
	            this.emit("eol", this);
	        }
	        if (this.particles.length < this.particleCount) {
	            this.addParticle();
	        }
	    };
	    ParticleSystem.prototype.draw = function (context) {
	        if (this.alive) {
	            _super.prototype.draw.call(this, context);
	            for (var i = 0; i < this.particles.length; i++) {
	                this.particles[i].draw(context);
	            }
	        }
	    };
	    return ParticleSystem;
	}(gameobject_1.default));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = ParticleSystem;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var gameobject_1 = __webpack_require__(3);
	var particlesystem_1 = __webpack_require__(11);
	var Bullet = (function (_super) {
	    __extends(Bullet, _super);
	    function Bullet(x, y) {
	        var _this = this;
	        if (x === void 0) { x = 0; }
	        if (y === void 0) { y = 0; }
	        _super.call(this);
	        this.x = x;
	        this.y = y;
	        this.velocity = 0.25;
	        this.alive = true;
	        this.trail = new particlesystem_1.default({
	            systemLifeTime: 0,
	            horizontal: 0,
	            lifeTime: 800,
	            particleCount: 40,
	            texture: "images/particle_small.png",
	            variation: 0.01,
	            vertical: 0.1,
	            x: 0,
	            y: 0
	        });
	        this.add(this.trail);
	        this.on('collides', function (obstacles) {
	            _this.explode(obstacles);
	        });
	    }
	    Bullet.prototype.explode = function (obstacles) {
	        var _this = this;
	        this.obstacles = obstacles;
	        if (this.explosion) {
	            return;
	        }
	        this.explosion = new particlesystem_1.default({
	            systemLifeTime: 500,
	            horizontal: 0,
	            lifeTime: 1000,
	            particleCount: 50,
	            texture: "images/particle.png",
	            variation: 0.1,
	            vertical: 0.2,
	            x: this.x,
	            y: this.y
	        });
	        this.explosion.fill();
	        this.deathOffset = obstacles.offset;
	        this.explosion.on("eol", function () {
	            console.log('explosion ended');
	            delete _this.explosion;
	            _this.emit('eol');
	        });
	        this.emit('uncollide');
	        this.alive = false;
	    };
	    Bullet.prototype.update = function (delta) {
	        _super.prototype.update.call(this, delta);
	        if (this.alive) {
	            this.y -= Math.floor(this.velocity * delta);
	            if (this.y < 0) {
	                this.alive = false;
	                this.emit("eol");
	            }
	        }
	        else {
	            if (this.explosion && this.obstacles) {
	                var offset = this.obstacles.offset - this.deathOffset;
	                this.explosion.y = this.y + offset - 10;
	                this.explosion.update(delta);
	            }
	        }
	    };
	    Bullet.prototype.draw = function (context) {
	        if (this.alive) {
	            context.save();
	            context.translate(this.x, this.y);
	            _super.prototype.draw.call(this, context);
	            context.restore();
	        }
	        else {
	            if (this.explosion) {
	                this.explosion.draw(context);
	            }
	        }
	    };
	    return Bullet;
	}(gameobject_1.default));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Bullet;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var gameobject_1 = __webpack_require__(3);
	var GameUI = (function (_super) {
	    __extends(GameUI, _super);
	    function GameUI() {
	        _super.call(this);
	        this.rocket = new Image();
	        this.rocket.src = "images/rocket_2.png";
	    }
	    GameUI.prototype.draw = function (context) {
	        _super.prototype.draw.call(this, context);
	        context.save();
	        if (this.stats) {
	            context.font = '14px Orbitron';
	            context.fillStyle = "#aa00aa";
	            context.fillText("SCORE: " + this.stats.score, 4, 14);
	            context.textAlign = "end";
	            context.fillText("LEVEL " + this.stats.level, 306, 14);
	            for (var i = 0; i < this.stats.bullets; i++) {
	                context.drawImage(this.rocket, 4 + 16 * i, 16);
	            }
	        }
	        context.restore();
	    };
	    return GameUI;
	}(gameobject_1.default));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = GameUI;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var gameobject_1 = __webpack_require__(3);
	var MenuUI = (function (_super) {
	    __extends(MenuUI, _super);
	    function MenuUI() {
	        _super.call(this);
	        this.score = 0;
	        this.level = "LEVEL ONE";
	    }
	    MenuUI.prototype.keyDown = function (key) {
	        if (key.key === "Enter") {
	            this.emit("start-game");
	        }
	    };
	    MenuUI.prototype.draw = function (context) {
	        _super.prototype.draw.call(this, context);
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
	    };
	    return MenuUI;
	}(gameobject_1.default));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = MenuUI;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var gameobject_1 = __webpack_require__(3);
	var Death = (function (_super) {
	    __extends(Death, _super);
	    function Death() {
	        _super.call(this);
	    }
	    Death.prototype.keyDown = function (key) {
	        if (key.key === "Enter") {
	            this.emit("start-game");
	        }
	    };
	    Death.prototype.draw = function (context) {
	        _super.prototype.draw.call(this, context);
	        context.save();
	        context.font = '36px Orbitron';
	        context.fillStyle = "#00aaaa";
	        context.textAlign = "center";
	        context.fillText("OH NO! DEATH!", 162, 66);
	        context.fillStyle = "#aa00aa";
	        context.textAlign = "center";
	        context.fillText("OH NO! DEATH!", 160, 64);
	        context.fillStyle = "#aaaaaa";
	        context.font = '24px Orbitron';
	        context.fillText("<PRESS ENTER>", 160, 128);
	        context.restore();
	    };
	    return Death;
	}(gameobject_1.default));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Death;


/***/ })
/******/ ]);