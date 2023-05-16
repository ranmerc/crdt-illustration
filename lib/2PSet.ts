import GSet from "./GSet";

export default class TwoPSet {
  private _added: GSet;
  private _removed: GSet;

  constructor() {
    this._added = new GSet();
    this._removed = new GSet();
  }

  values() {
    const difference = GSet.difference(this._added, this._removed);
    return difference.values();
  }

  add(element) {
    this._added.add(element);
  }

  remove(element) {
    if (this._added.has(element)) {
      this._removed.add(element);
    }
  }

  merge(other) {
    this._added.merge(other._added);
    this._removed.merge(other._removed);
  }
}
