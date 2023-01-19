import { NPC } from "./npc";
import { Player } from "./player";
import { prisma } from "../db/client"

export class Playground {
  private players = new Map<string, Player>();
  private _enemies = [new NPC('NPC', 0, 0)];
  private _width = 1200;
  private _height = 600;

  setState({
    name,
    up,
    left,
    right,
    down,
    orientation,
  }: {
    name: string;
    up: boolean;
    left: boolean;
    right: boolean;
    down: boolean;
    orientation: boolean;
  }) {
    if (this.players.has(name)) {
      this.players.get(name)?.play(up, left, right, down, orientation);
    } else {
      this.players.set(name, new Player(name, 0, 0));
    }
  }
  getState() {
    const state: {
      [k: string]: { x: number; y: number; orientation: boolean, distance: number };
    } = {};
    this.players.forEach((player) => {
      state[player.name] = {
        x: player.coords.x,
        y: player.coords.y,
        orientation: player.orientation,
        distance: this.getCloseEntities()
      };
    });
    return state;
  }

  getCloseEntities() {
    const jakubX = this.players.get('Jakub')?.coords.x as number
    const danielX = this.players.get('Daniel')?.coords.x as number
    const dist_x = jakubX - danielX
    return dist_x
  }

  
  public get enemies(): NPC[] {
    return this._enemies
  }

  public get size() {
    return {x: this._width, y: this._height}
  }
  

  async fillWithNPCs(){
    const npcFromDbArr = await prisma.characters.findMany({
      where: {
        name: 'ales'
      }
    })
    npcFromDbArr.forEach((npc) => {
      if(! this._enemies.some(x => x.name === npc.name)){
        console.log("Adding " + npc.name)
        this._enemies.push(new NPC(npc.name, 0, 0)) // we need to create new db model with all npcs
      }
    })
  }

  interval = setInterval(() => {
    this.players.forEach((value) => {
      value.move(this.size);
    });
    this._enemies.forEach((enemy) => {
      const array = enemy.getNearbies(this.players).map(e => e.name)
      if(array.length > 0){
        console.log(array)
      }
    })
  }, 25);
}


