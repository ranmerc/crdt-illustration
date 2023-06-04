import GSet from "./GSet";
import { GSetIterable, GSetTypes } from "./GSet";

export default class TwoPSet {
  protected _added: GSet;
  protected _removed: GSet;

  constructor(addedInitial?: GSetIterable, removedInitial?: GSetIterable) {
    this._added = new GSet(addedInitial);
    this._removed = new GSet(removedInitial);
  }

  values() {
    return GSet.difference(this._added, this._removed);
  }

  add(element: GSetTypes) {
    this._added = new GSet([...this._added.values(), element]);
  }

  remove(element: GSetTypes) {
    // add to remove set only if it exists in add set
    if (this._added.has(element)) {
      this._removed = new GSet([...this._removed.values(), element]);
    }
  }

  has(element: GSetTypes) {
    if (this._added.has(element) && !this._removed.has(element)) {
      return true;
    }

    return false;
  }

  merge(other: TwoPSet) {
    this._added.merge(other._added);
    this._removed.merge(other._removed);
  }
}
