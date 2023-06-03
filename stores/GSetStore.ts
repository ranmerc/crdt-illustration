import GSet from "@/lib/GSet";
import Store from "./Store";
import { GSetTypes } from "@/lib/GSet";
import { GSetIterable } from "@/lib/GSet";

class GSetStore extends GSet implements Store<Set<GSetTypes>> {
  listeners: Set<Function>;
  emptySet: Set<GSetTypes>;

  constructor(initialValue?: GSetIterable) {
    super(initialValue);
    this.listeners = new Set();
    this.emptySet = new Set([]);
  }

  getSnapshot = () => {
    return this.values();
  };

  getServerSnapshot = () => this.emptySet;

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

  merge(other: GSet): void {
    super.merge(other);

    this.notifyListeners();
  }
}

export default GSetStore;
