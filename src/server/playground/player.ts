import { Entity } from "./entity";

export class Player extends Entity{
    private _speed = 30;
    public orientation: boolean;
    private size = { x: 0, y: 0}
    private _move: { up: boolean; left: boolean; right: boolean; down: boolean } =
      { up: false, left: false, right: false, down: false };
  
    constructor(_name: string, _x: number, _y: number) {
        super(_name, _x, _y);
        this.orientation = true;
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
      move(size: {x: number; y: number}) {
        // this._x < 0 && ( () => {this._x = 0; return false;})
        if( this._x < 0){
          this._x = 0
        }
        if(this._x > size.x){
          this._x = size.x
        }
        if(this._y < 0){
          this._y = 0
        }
        if(this._y > size.y){
          this._y = size.y
        }
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
      }
}