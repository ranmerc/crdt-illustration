export type GSetTypes = string | number | boolean;

export type GSetIterable = Array<GSetTypes> | Set<GSetTypes>;

export default class GSet {
  private _values: Set<GSetTypes>;

  static difference(A: GSet, B: GSet) {
    let differenceSet = new Set(A._values);

    for (const element of B._values) {
      if (differenceSet.has(element)) {
        differenceSet.delete(element);
      }
    }

    return differenceSet;
  }

  constructor(initial?: GSetIterable) {
    this._values = initial ? new Set(initial) : new Set();
  }

  values() {
    return this._values;
  }

  add(value: GSetTypes) {
    this._values = new Set([...this.values(), value]);
  }

  has(value: GSetTypes) {
    return this._values.has(value);
  }

  merge(other: GSet) {
    this._values = new Set([...this.values(), ...other.values()]);
  }
}
