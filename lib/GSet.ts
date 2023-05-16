export default class GSet {
  private _values: Set<any>;

  constructor() {
    this._values = new Set();
  }

  values() {
    return Array.from(this._values);
  }

  add(value: any) {
    this._values.add(value);
  }

  merge(other: GSet) {
    this._values = new Set([...this.values(), ...other.values()]);
  }
}
