import Store from "./Store";
import { GSetTypes } from "@/lib/GSet";
import { GSetIterable } from "@/lib/GSet";
import TwoPSet from "@/lib/2PSet";

export interface TwoPSetStoreType {
  added: Set<GSetTypes>;
  removed: Set<GSetTypes>;
  values: Set<GSetTypes>;
}

class TwoPSetStore extends TwoPSet implements Store<TwoPSetStoreType> {
  listeners: Set<Function>;
  private initialServerData: TwoPSetStoreType;
  private _cachedData: TwoPSetStoreType;

  constructor(addedInitial?: GSetIterable, removedInitial?: GSetIterable) {
    super(addedInitial, removedInitial);

    this.listeners = new Set();
    this.initialServerData = {
      added: new Set(),
      removed: new Set(),
      values: new Set(),
    };
    this._cachedData = {
      added: this._added.values(),
      removed: this._removed.values(),
      values: this.values(),
    };
  }

  getSnapshot = () => {
    // don't check for values() as it returns a new object on every call
    if (
      this._cachedData.added != this._added.values() ||
      this._cachedData.removed != this._removed.values()
    ) {
      this._cachedData = {
        added: this._added.values(),
        removed: this._removed.values(),
        values: this.values(),
      };
    }

    return this._cachedData;
  };

  getServerSnapshot = () => this.initialServerData;

  subscribe = (listener: Function) => {
    this.listeners.add(listener);

    return () => {
      this.listeners.delete(listener);
    };
  };

  notifyListeners = () => {
    this.listeners.forEach((listener) => listener(this.values()));
  };

  add(value: GSetTypes): void {
    super.add(value);

    this.notifyListeners();
  }

  remove(value: GSetTypes): void {
    super.remove(value);

    this.notifyListeners();
  }

  merge(other: TwoPSet): void {
    super.merge(other);

    this.notifyListeners();
  }
}

export default TwoPSetStore;
