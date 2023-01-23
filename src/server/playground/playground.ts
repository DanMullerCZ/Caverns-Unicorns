import { NPC } from './npc';
import { Player } from './player';
import { prisma } from '../db/client';
import { listNPC } from './listNPC';
import { specificNPC } from './listNPC';

export class Playground {
  private players = new Map<string, Player>();
  private _enemies: NPC[] = [];
  private _width = 1570;
  private _height = 860;

  constructor() {
    this.createNPCs(
      [1, 1, 0, 0],
      [listNPC.demon, listNPC.bandit, listNPC.zombie, listNPC.sheep],
    );
  }

  createNPCs(arrNum: number[], arr2: specificNPC[]): void {
    arrNum.forEach((num: number, index: number) => {
      for (let i = 0; i < num; i++) {
        this._enemies.push(
          new NPC(
            ...this.setNPC(
              arr2[index],
              Math.random() * this._width,
              Math.random() * this._height,
            ),
          ),
        );
      }
    });
  }

  setNPC(
    npc: specificNPC,
    x: number,
    y: number,
  ): [string, number, number, number, number, number, number, string, number] {
    return [
      npc.name,
      x,
      y,
      npc.hp,
      npc.cur_hp,
      npc.dmg,
      npc.pwr,
      npc.img,
      npc.exp,
    ];
  }

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
      this.players.set(name, new Player(name, 0, 0, 10, 10));
    }
  }
  getState() {
    const state: {
      [k: string]: {
        x: number;
        y: number;
        orientation: boolean;
        status: { battle: boolean; alive: boolean };
      };
    } = {};
    this.players.forEach((player) => {
      state[player.name] = {
        x: player.coords.x,
        y: player.coords.y,
        orientation: player.orientation,
        status: player.status,
      };
    });
    return state;
  }

  public get enemies(): NPC[] {
    return this._enemies;
  }

  public get size() {
    return { x: this._width, y: this._height };
  }

  async fillWithNPCs() {
    const npcFromDbArr = await prisma.characters.findMany({
      where: {
        name: 'ales',
      },
    });
    npcFromDbArr.forEach((npc) => {
      if (!this._enemies.some((x) => x.name === npc.name)) {
        console.log('Adding ' + npc.name);
        // this._enemies.push(new NPC(npc.name, 300, 350)); // we need to create new db model with all npcs
      }
    });
  }

  getOpponent(name: string) {
    const player = this.players.get(name) as Player;
    const npc = this.players.get(name)?.opponent as NPC;
    return { player: player.name, enemy: npc.name };
  }

  interval = setInterval(() => {
    this.players.forEach((value) => {
      value.move(this.size);
    });
    this._enemies.forEach((enemy) => {
      const array = enemy.getNearbies(this.players);
    });
  }, 25);
  
  surface(x: number, y: number) {
    if (y > 0.96 * x + 189.37 && y < -1.09 * x + 654.83) {
      return 'deadland';
    }
    if (
      (y > -0.95 * x + 924.5 &&
        y > 0.15 * x + 471.48 &&
        y > 0.9 * x + 119.38 &&
        x > 103 &&
        x < 577) ||
      (y > -1.16 * x + 1325.64 && y > 0.02 * x + 623.8 && y > 1.03 * x + -55.67)
    ) {
      return 'forest';
    }
    if (y > -1.02 * x + 2165.57) {
      return 'desert';
    }
    if (
      (y < 1.13 * x + 84.34 && y < -0.74 * x + 320.09) ||
      (y < 0.12 * x + 152.94 && x > 196 && x < 281) ||
      (y < 1.0 * x + -110.0 && y < -0.7 * x + 455.44) ||
      (y < 0.0 * x + 175.0 && x > 390 && x < 495) ||
      (y < 0.82 * x + -229.28 &&
        y < 0.0 * x + 281.0 &&
        x > 504 &&
        x < 1176 &&
        y < -0.94 * x + 1296.16) ||
      (y < -0.08 * x + 285.91 && x > 1177 && x < 1296) ||
      (y < 1.04 * x + -1147.63 && y < -0.58 * x + 1213.99)
    ) {
      return 'hills&mountains';
    }
    return 'grass';
  }
}
