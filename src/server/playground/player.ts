import { Entity } from './entity';
import { NPC } from './npc';

export class Player extends Entity {
  opponent: NPC | undefined
  private _speed = 5;
  public orientation: boolean;
  private _move: { up: boolean; left: boolean; right: boolean; down: boolean } =
    { up: false, left: false, right: false, down: false };

  constructor(
    _name: string,
    _x: number,
    _y: number,
    _hp: number,
    _cur_hp: number,
  ) {
    super(_name, _x, _y, _hp, _cur_hp);
    this.orientation = true;
    this.opponent = undefined;
  }

  play(
    up: boolean,
    left: boolean,
    right: boolean,
    down: boolean,
    orientation: boolean,
  ) {
    this._move = { up: up, left: left, right: right, down: down };
    this.orientation = orientation;
  }

  private _moving(size: { x: number; y: number }) {
    // this._x < 0 && ( () => {this._x = 0; return false;})

    if (
      //up
      this._move.up &&
      !this._move.left &&
      !this._move.right &&
      !this._move.down
    ) {
      this._y = this._y - this._speed;
    } else {
      if (
        //left
        !this._move.up &&
        this._move.left &&
        !this._move.right &&
        !this._move.down
      ) {
        this._x = this._x - this._speed;
      } else {
        if (
          //right
          !this._move.up &&
          !this._move.left &&
          this._move.right &&
          !this._move.down
        ) {
          this._x = this._x + this._speed;
        } else {
          if (
            !this._move.up &&
            !this._move.left &&
            !this._move.right &&
            this._move.down
          ) {
            this._y = this._y + this._speed;
          } else {
            if (
              this._move.up &&
              this._move.left &&
              !this._move.right &&
              !this._move.down
            ) {
              this._y = this._y - this._speed / Math.sqrt(2);
              this._x = this._x - this._speed / Math.sqrt(2);
            } else {
              if (
                this._move.up &&
                !this._move.left &&
                this._move.right &&
                !this._move.down
              ) {
                this._y = this._y - this._speed / Math.sqrt(2);
                this._x = this._x + this._speed / Math.sqrt(2);
              } else {
                if (
                  !this._move.up &&
                  this._move.left &&
                  !this._move.right &&
                  this._move.down
                ) {
                  this._y = this._y + this._speed / Math.sqrt(2);
                  this._x = this._x - this._speed / Math.sqrt(2);
                } else {
                  if (
                    !this._move.up &&
                    !this._move.left &&
                    this._move.right &&
                    this._move.down
                  ) {
                    this._y = this._y + this._speed / Math.sqrt(2);
                    this._x = this._x + this._speed / Math.sqrt(2);
                  } else {
                  }
                }
              }
            }
          }
        }
      }
    }
    if (this._x < 0) {
      this._x = 0;
    }
    if (this._x > size.x) {
      this._x = size.x;
    }
    if (this._y < 0) {
      this._y = 0;
    }
    if (this._y > size.y) {
      this._y = size.y;
    }
  }
  move = this._moving;

  getInBattle(): void {
    this.move = () => {
      return;
    };
  }

  geOutBattle() {
    this.move = this._moving;
  }

  findOpponent(opponent: NPC): any {
    // const opponent = arrNPC.filter(
    //   (npc) => npc.opponent?.name === this.name,
    // )[0];
    if (opponent.status.alive && !opponent.status.battle && this._status.alive && !this._status.battle) {
      this.setStatus = {battle:true};
      opponent.setStatus = {battle: true};
      this.getInBattle()
      this.opponent = opponent      
    }
  }
}
