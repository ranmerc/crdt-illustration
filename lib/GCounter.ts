export default class GCounter {
  private _counter: number;

  constructor(initialValue: number) {
    this._counter = initialValue ?? 0;
  }

  get value() {
    return this._counter;
  }

  increment(amount: number) {
    if (amount && amount < 1) return;

    if (amount === undefined || amount === null) amount = 1;

    this._counter = this._counter + amount;
  }

  merge(other: GCounter) {
    this._counter = Math.max(this._counter, other._counter);
  }
}
