export default class GSet {
  constructor() {
    this._values = new Set();
  }

  values() {
    return Array.from(this._values);
  }

  add(value) {
    this._values.add(value);
  }

  merge(other) {
    this._values = new Set([...this._values, ...other._values]);
  }
}
