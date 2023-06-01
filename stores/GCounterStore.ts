import GCounter from "@/lib/GCounter";
import Store from "./Store";

class GCounterStore extends GCounter implements Store<number> {
  listeners: Set<Function>;

  constructor(initialValue = 0) {
    super(initialValue);
    this.listeners = new Set();
  }

  getSnapshot = () => {
    return this.value;
  };

  getServerSnapshot = () => 0;

  subscribe = (listener: Function) => {
    this.listeners.add(listener);

    return () => {
      this.listeners.delete(listener);
    };
  };

  notifyListeners = () => {
    this.listeners.forEach((listener) => listener(this.value));
  };

  increment = (amount?: number | undefined): void => {
    super.increment(amount);

    this.notifyListeners();
  };

  merge = (other: GCounter): void => {
    super.merge(other);

    this.notifyListeners();
  };
}

export default GCounterStore;
