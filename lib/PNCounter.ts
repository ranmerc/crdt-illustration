import GCounter from "./GCounter";

export default class PNCounter {
  p: GCounter;
  n: GCounter;

  constructor(
    initialValues: {
      pVal?: number;
      nVal?: number;
    } = {}
  ) {
    let initialP = initialValues.pVal ?? 0;
    let initialN = initialValues.nVal ?? 0;
    this.p = new GCounter(initialP);
    this.n = new GCounter(initialN);
  }

  get value() {
    return this.p.value - this.n.value;
  }

  increment(amount?: number) {
    this.p.increment(amount);
  }

  decrement(amount?: number) {
    this.n.increment(amount);
  }

  merge(other: PNCounter) {
    this.p.merge(other.p);
    this.n.merge(other.n);
  }
}
