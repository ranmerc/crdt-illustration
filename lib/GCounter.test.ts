import GCounter from "./GCounter";

describe("GCounter initialization", () => {
  test("Default initializing with 0", () => {
    const counter = new GCounter();

    expect(counter.value).toBe(0);
  });

  test("Initializes with given value", () => {
    const value = 42;
    const counter = new GCounter(value);

    expect(counter.value).toBe(42);
  });
});

describe("GCounter increments", () => {
  test("Does not change on increment less than 0", () => {
    const counter = new GCounter();
    counter.increment(-1);

    expect(counter.value).toBe(0);
  });

  test("Does not change on increment 0", () => {
    const counter = new GCounter();
    counter.increment(0);

    expect(counter.value).toBe(0);
  });

  test("Does change on increment with no value", () => {
    const counter = new GCounter();
    counter.increment();

    expect(counter.value).toBe(1);
  });

  test("Does change on increment with value", () => {
    const counter = new GCounter();
    counter.increment(42);

    expect(counter.value).toBe(42);
  });
});

describe("GCounter merging", () => {
  test("Current counter changes when current value is less", () => {
    const current = new GCounter(4);
    const other = new GCounter(42);
    current.merge(other);

    expect(current.value).toBe(42);
  });

  test("Other counter changes when other value is less", () => {
    const current = new GCounter(42);
    const other = new GCounter(4);
    other.merge(current);

    expect(other.value).toBe(42);
  });

  test("Does not change when both are equal", () => {
    const current = new GCounter(42);
    const other = new GCounter(42);
    current.merge(other);
    other.merge(current);

    expect(current.value).toBe(42);
    expect(other.value).toBe(42);
  });
});
