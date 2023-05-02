import GCounter from "./GCounter";

export default class PNCounter {
  constructor() {
    this.p = new GCounter();
    this.n = new GCounter();
  }

  get value() {
    return this.p.value - this.n.value;
  }

  increment(amount) {
    this.p.increment(amount);
  }

  decrement(amount) {
    this.n.increment(amount);
  }

  merge(other) {
    this.p.merge(other.p);
    this.n.merge(other.n);
  }
}
