"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Playground = void 0;
class Playground {
    constructor() {
        this.players = new Map();
        this.interval = setInterval(() => {
            this.players.forEach((value, key) => {
                value.move();
            });
        }, 25);
    }
    setState({ name, up, left, right, down, orientation }) {
        var _a;
        if (this.players.has(name)) {
            (_a = this.players.get(name)) === null || _a === void 0 ? void 0 : _a.play(up, left, right, down, orientation);
        }
        else {
            this.players.set(name, new Player(name));
        }
    }
    getState() {
        const state = {};
        this.players.forEach((player) => {
            state[player.name] = { x: player.coords.x, y: player.coords.y, orientation: player.orientation };
        });
        return state;
    }
}
exports.Playground = Playground;
class Player {
    constructor(_name) {
        this._name = _name;
        this._speed = 10;
        this._move = { up: false, left: false, right: false, down: false };
        this._x = 0;
        this._y = -400;
        this.orientation = true;
    }
    get name() {
        return this._name;
    }
    get coords() {
        return { x: this._x, y: this._y };
    }
    play(up, left, right, down, orientation) {
        this._move = { up: up, left: left, right: right, down: down };
        this.orientation = orientation;
    }
    move() {
        if (
        //up
        this._move.up &&
            !this._move.left &&
            !this._move.right &&
            !this._move.down) {
            this._y = this._y - this._speed;
        }
        else {
            if (
            //left
            !this._move.up &&
                this._move.left &&
                !this._move.right &&
                !this._move.down) {
                this._x = this._x - this._speed;
            }
            else {
                if (
                //right
                !this._move.up &&
                    !this._move.left &&
                    this._move.right &&
                    !this._move.down) {
                    this._x = this._x + this._speed;
                }
                else {
                    if (!this._move.up &&
                        !this._move.left &&
                        !this._move.right &&
                        this._move.down) {
                        this._y = this._y + this._speed;
                    }
                    else {
                        if (this._move.up &&
                            this._move.left &&
                            !this._move.right &&
                            !this._move.down) {
                            this._y = this._y - this._speed / Math.sqrt(2);
                            this._x = this._x - this._speed / Math.sqrt(2);
                        }
                        else {
                            if (this._move.up &&
                                !this._move.left &&
                                this._move.right &&
                                !this._move.down) {
                                this._y = this._y - this._speed / Math.sqrt(2);
                                this._x = this._x + this._speed / Math.sqrt(2);
                            }
                            else {
                                if (!this._move.up &&
                                    this._move.left &&
                                    !this._move.right &&
                                    this._move.down) {
                                    this._y = this._y + this._speed / Math.sqrt(2);
                                    this._x = this._x - this._speed / Math.sqrt(2);
                                }
                                else {
                                    if (!this._move.up &&
                                        !this._move.left &&
                                        this._move.right &&
                                        this._move.down) {
                                        this._y = this._y + this._speed / Math.sqrt(2);
                                        this._x = this._x + this._speed / Math.sqrt(2);
                                    }
                                    else {
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
