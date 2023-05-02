export default class GCounter {
  constructor(initialValue) {
    this._counter = initialValue ?? 0;
  }

  get value() {
    return this._counter;
  }

  increment(amount) {
    if (amount && amount < 1) return;

    if (amount === undefined || amount === null) amount = 1;

    this._counter = this._counter + amount;
  }

  merge(other) {
    this._counter = Math.max(this._counter, other._counter);
  }
}
