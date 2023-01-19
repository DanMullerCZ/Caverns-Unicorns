import { Entity } from "./entity";
import { Player } from "./player";

export class NPC extends Entity{
    constructor(_name: string, _x: number, _y: number) {
        super(_name, _x, _y);
        // add some npc data aj data draka
    }

    getNearbies(players: Map<string, Player>){
        const playerArr = Array.from(players.values())
        return playerArr.filter((player) => {
            return this.calcDist(this._x, this._y, player.coords.x, player.coords.y) < 199
        })
    }

    calcDist(x1: number, y1: number, x2: number, y2: number) {
        const distX = Math.abs(x1 - x2)
        const distY = Math.abs(y1 - y2)
        const result = Math.sqrt((distX)**2 + (distY)**2)
        console.log(result)
        return result
      }
}