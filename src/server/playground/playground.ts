export class Playground {
    private players = new Map<string, Player>();
    setState({
      name,
      up,
      left,
      right,
      down,
      orientation
    }: {
      name: string;
      up: boolean;
      left: boolean;
      right: boolean;
      down: boolean;
      orientation: boolean
    }) {
      if (this.players.has(name)) {
        this.players.get(name)?.play(up, left, right, down,orientation);
      } else {
        this.players.set(name, new Player(name));
      }
    }
    getState() {
      const state: { [k: string]: { x: number; y: number,orientation:boolean } } = {};
      this.players.forEach((player) => {
        state[player.name] = {x:player.coords.x,y:player.coords.y,orientation:player.orientation};
      });
      return state;
    }
    interval = setInterval(() => {
      this.players.forEach((value, key) => {
        value.move();
      });
    }, 25);
  }
  
  class Player {
    private _x: number;
    private _y: number;
    private _speed = 10;
    public orientation:boolean
    private _move: { up: boolean; left: boolean; right: boolean; down: boolean } =
      { up: false, left: false, right: false, down: false };
  
    constructor(private _name: string) {
      this._x = 0;
      this._y = -400;
      this.orientation = true
    }
    get name() {
      return this._name;
    }
    get coords() {
      return { x: this._x, y: this._y };
    }
  
    play(up: boolean, left: boolean, right: boolean, down: boolean,orientation:boolean) {
      this._move = { up: up, left: left, right: right, down: down };
      this.orientation = orientation
    }
    move() {
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
                this._y = this._y - this._speed/Math.sqrt(2);
                this._x = this._x - this._speed/Math.sqrt(2);
              } else {
                if (
                  this._move.up &&
                  !this._move.left &&
                  this._move.right &&
                  !this._move.down
                ) {
                  this._y = this._y - this._speed/Math.sqrt(2);
                  this._x = this._x + this._speed/Math.sqrt(2);
                } else {
                  if (
                    !this._move.up &&
                    this._move.left &&
                    !this._move.right &&
                    this._move.down
                  ) {
                    this._y = this._y + this._speed/Math.sqrt(2);
                    this._x = this._x - this._speed/Math.sqrt(2);
                  } else {
                    if (
                      !this._move.up &&
                      !this._move.left &&
                      this._move.right &&
                      this._move.down
                    ) {
                      this._y = this._y + this._speed/Math.sqrt(2);
                      this._x = this._x + this._speed/Math.sqrt(2);
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