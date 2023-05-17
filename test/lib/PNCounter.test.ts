import PNCounter from "../../lib/PNCounter";

function randomNumber(lower: number, upper: number) {
  return Math.floor((upper - lower) * Math.random()) + lower;
}

describe("PNCounter initialization", () => {
  test("Default initializing with 0", () => {
    const counter = new PNCounter();

    expect(counter.value).toBe(0);
  });

  test("Initializes with P value only", () => {
    const counter = new PNCounter({
      pVal: 4,
    });

    expect(counter.value).toBe(4);
  });

  test("Initializes with N value only", () => {
    const counter = new PNCounter({
      nVal: 4,
    });

    expect(counter.value).toBe(-4);
  });

  test("Initializes with same values of P and N", () => {
    const counter = new PNCounter({
      pVal: 4,
      nVal: 4,
    });

    expect(counter.value).toBe(0);
  });

  test("Initializes with different values of P and N (P > N)", () => {
    const counter = new PNCounter({
      pVal: 10,
      nVal: 5,
    });

    expect(counter.value).toBe(5);
  });

  test("Initializes with different values of P and N (N > P)", () => {
    const counter = new PNCounter({
      pVal: 6,
      nVal: 15,
    });

    expect(counter.value).toBe(-9);
  });
});

describe("PNCounter increment/decrement", () => {
  test("Correct value after random increments", () => {
    const counter = new PNCounter();

    const numIncrements = randomNumber(0, 100);

    counter.increment(numIncrements);

    expect(counter.value).toBe(numIncrements);
  });

  test("Correct value after random decrements", () => {
    const counter = new PNCounter();

    const numDecrements = randomNumber(0, 100);

    counter.decrement(numDecrements);

    expect(counter.value).toBe(-numDecrements);
  });

  test("Correct value with random increments and decrements", () => {
    const counter = new PNCounter();
    const numDecrement = randomNumber(0, 100);
    const numIncrement = randomNumber(0, 100);

    for (let i = 0; i < numIncrement; i++) {
      counter.increment();
    }

    for (let i = 0; i < numDecrement; i++) {
      counter.decrement();
    }

    expect(counter.value).toBe(numIncrement - numDecrement);
  });
});

describe("PNCounter merging", () => {
  test("Current P value is larger", () => {
    let current = new PNCounter();
    let other = new PNCounter();

    current.increment(10);
    current.decrement(3);
    other.increment(5);
    other.decrement(3);

    current.merge(other);
    other.merge(current);

    expect(current.value).toBe(7);
    expect(other.value).toBe(7);
  });

  test("Current N value is larger", () => {
    let current = new PNCounter();
    let other = new PNCounter();

    current.increment(10);
    current.decrement(13);
    other.increment(10);
    other.decrement(3);

    current.merge(other);
    other.merge(current);

    expect(current.value).toBe(-3);
    expect(other.value).toBe(-3);
  });

  test("Other P value is larger", () => {
    let current = new PNCounter();
    let other = new PNCounter();

    current.increment(10);
    current.decrement(3);
    other.increment(13);
    other.decrement(3);

    current.merge(other);
    other.merge(current);

    expect(current.value).toBe(10);
    expect(other.value).toBe(10);
  });

  test("Other N value is larger", () => {
    let current = new PNCounter();
    let other = new PNCounter();

    current.increment(10);
    current.decrement(3);
    other.increment(10);
    other.decrement(13);

    current.merge(other);
    other.merge(current);

    expect(current.value).toBe(-3);
    expect(other.value).toBe(-3);
  });

  test("Current P value is larger but N value is smaller", () => {
    let current = new PNCounter();
    let other = new PNCounter();

    current.increment(13);
    current.decrement(3);
    other.increment(10);
    other.decrement(13);

    current.merge(other);
    other.merge(current);

    expect(current.value).toBe(0);
    expect(other.value).toBe(0);
  });

  test("Current N value is larger but P value is smaller", () => {
    let current = new PNCounter();
    let other = new PNCounter();

    current.increment(10);
    current.decrement(15);
    other.increment(15);
    other.decrement(3);

    current.merge(other);
    other.merge(current);

    expect(current.value).toBe(0);
    expect(other.value).toBe(0);
  });
});
