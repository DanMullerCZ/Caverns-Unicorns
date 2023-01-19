export class Entity {
    constructor(protected _name: string, protected _x: number, protected _y: number) {}
    
    get name() {
      return this._name;
    }

    get coords() {
        return { x: this._x, y: this._y };
      }
}