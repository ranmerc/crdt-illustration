type GSetTypes = string | number | boolean;

type GSetIterable = Array<GSetTypes> | Set<GSetTypes>;

export default class GSet {
  private _values: Set<GSetTypes>;

  static difference(A: GSet, B: GSet) {
    let differenceSet = A._values;

    for (const element of B._values) {
      if (differenceSet.has(element)) {
        differenceSet.delete(element);
      }
    }

    return differenceSet;
  }

  constructor(initialSet?: GSetIterable) {
    this._values = initialSet ? new Set(initialSet) : new Set();
  }

  values() {
    return this._values;
  }

  add(value: GSetTypes) {
    this._values.add(value);
  }

  has(value: GSetTypes) {
    return this._values.has(value);
  }

  merge(other: GSet) {
    this._values = new Set([...this.values(), ...other.values()]);
  }
}
