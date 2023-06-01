import PNCounter from "@/lib/PNCounter";
import Store from "./Store";

export interface PNCounterStoreType {
  p: number;
  n: number;
  value: number;
}

export default class PNCounterStore
  extends PNCounter
  implements Store<PNCounterStoreType>
{
  listeners: Set<Function>;

  // return the cached value if nothing changes
  _cachedData: PNCounterStoreType;

  constructor(
    initialValues: {
      pVal?: number;
      nVal?: number;
    } = {}
  ) {
    super(initialValues);

    this.listeners = new Set();
    this._cachedData = {
      p: this.p.value,
      n: this.n.value,
      value: this.value,
    };
  }

  // Should return the same object if nothing changes
  getSnapshot = () => {
    if (
      this._cachedData.p != this.p.value ||
      this._cachedData.n != this.n.value ||
      this._cachedData.value != this.value
    ) {
      this._cachedData = {
        p: this.p.value,
        n: this.n.value,
        value: this.value,
      };
    }

    return this._cachedData;
  };

  // only called once on the server
  getServerSnapshot = () => {
    return {
      p: 0,
      n: 0,
      value: 0,
    };
  };

  subscribe = (listener: Function) => {
    this.listeners.add(listener);

    return () => {
      this.listeners.delete(listener);
    };
  };

  notifyListeners = () => {
    this.listeners.forEach((listener) => listener(this.value));
  };

  increment(amount?: number | undefined): void {
    super.increment(amount);

    this.notifyListeners();
  }

  decrement(amount?: number | undefined): void {
    super.decrement(amount);

    this.notifyListeners();
  }

  merge(other: PNCounter): void {
    super.merge(other);

    this.notifyListeners();
  }
}
