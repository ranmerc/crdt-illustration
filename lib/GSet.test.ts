import GSet from "./GSet";

describe("GSet initialization", () => {
  test("Initializes with empty set", () => {
    const set = new GSet();

    expect(set.values()).toEqual(new Set());
  });

  test("Initializes with array iterable", () => {
    const set = new GSet([1, "str", 2, false]);

    expect(set.values()).toEqual(new Set([1, "str", 2, false]));
  });

  test("Initializes with set iterable", () => {
    const set = new GSet(new Set([1, "str", 2, false]));

    expect(set.values()).toEqual(new Set([1, "str", 2, false]));
  });
});

describe("GSet difference", () => {
  test("Different items", () => {
    const s1 = new GSet(["one", "two", "three", 2]);
    const s2 = new GSet(["1", "two", "three"]);

    const diff = GSet.difference(s1, s2);

    expect(diff).toEqual(new Set(["one", 2]));
  });

  test("Same items in both", () => {
    const s1 = new GSet([1, "two", "three"]);
    const s2 = new GSet([1, "two", "three"]);

    expect(GSet.difference(s1, s2).size).toBe(0);
  });
});

describe("GSet addition", () => {
  test("Elements get added", () => {
    const set = new GSet();

    set.add("string");
    set.add(2);

    expect(set.values()).toEqual(new Set(["string", 2]));
  });

  test("Added element exists", () => {
    const set = new GSet();

    set.add("hello");
    set.add("world");

    expect(set.has("world")).toBeTruthy();
  });

  test("Not added elements do not exist", () => {
    const set = new GSet();

    set.add("hello");
    set.add("world");

    expect(set.has(3)).toBeFalsy();
  });
});

describe("GSet merging", () => {
  test("Different items", () => {
    const s1 = new GSet([1, 2, "hello"]);
    const s2 = new GSet([4, 3, "no"]);

    s1.merge(s2);
    s2.merge(s1);

    expect(s1.values()).toEqual(new Set([1, 2, 3, 4, "hello", "no"]));
    expect(s1.values()).toEqual(new Set([1, 2, 3, 4, "hello", "no"]));
  });

  test("Same items", () => {
    const s1 = new GSet([1, 2, "hello"]);
    const s2 = new GSet([1, 2, "hello"]);

    s1.merge(s2);
    s2.merge(s1);

    expect(s1.values()).toEqual(new Set([1, 2, "hello"]));
    expect(s2.values()).toEqual(new Set([1, 2, "hello"]));
  });
});
