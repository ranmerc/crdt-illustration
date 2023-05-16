import GCounter from "./GCounter";

export default class PNCounter {
  p: GCounter;
  n: GCounter;

  constructor() {
    this.p = new GCounter(0);
    this.n = new GCounter(0);
  }

  get value() {
    return this.p.value - this.n.value;
  }

  increment(amount: number) {
    this.p.increment(amount);
  }

  decrement(amount: number) {
    this.n.increment(amount);
  }

  merge(other: PNCounter) {
    this.p.merge(other.p);
    this.n.merge(other.n);
  }
}
