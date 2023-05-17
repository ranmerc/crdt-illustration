export default class GCounter {
  private _counter: number;

  constructor(initialValue = 0) {
    this._counter = initialValue;
  }

  get value() {
    return this._counter;
  }

  increment(amount?: number) {
    if (amount && amount < 1) return;

    if (amount === undefined || amount === null) amount = 1;

    this._counter = this._counter + amount;
  }

  merge(other: GCounter) {
    this._counter = Math.max(this._counter, other._counter);
  }
}
