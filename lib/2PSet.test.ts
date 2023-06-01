import TwoPSet from "./2PSet";

describe("2PSet initialization", () => {
  test("Initializes with empty set", () => {
    const set = new TwoPSet();

    expect(set.values()).toEqual(new Set());
  });

  test("Initializes with only added iterable", () => {
    const set = new TwoPSet([1, 2, 3, 4, 5]);

    expect(set.values()).toEqual(new Set([1, 2, 3, 4, 5]));
  });

  test("Initializes with only removed iterable", () => {
    const set = new TwoPSet([], [1, 2, 3, 4]);

    expect(set.values()).toEqual(new Set());
  });

  test("Initializes with both removed and added iterable", () => {
    const set = new TwoPSet([1, 2, 3, 4, 5], [1, 2, 3, 4, 5]);

    expect(set.values()).toEqual(new Set());
  });
});

describe("2PSet addition", () => {
  test("Elements get added", () => {
    const set = new TwoPSet();

    set.add(2);
    set.add(5);

    expect(set.values()).toEqual(new Set([5, 2]));
  });

  test("Added element exists", () => {
    const set = new TwoPSet();

    set.add("hello");
    set.add("world");

    expect(set.has("world")).toBeTruthy();
  });

  test("Not added elements do not exist", () => {
    const set = new TwoPSet();

    set.add("hello");
    set.add("world");

    expect(set.has(3)).toBeFalsy();
  });
});

describe("2PSet removal", () => {
  test("Added elements get removed", () => {
    const set = new TwoPSet();

    set.add("hello");
    set.add("world");
    set.remove("world");

    expect(set.values()).toEqual(new Set(["hello"]));
  });

  test("Unadded elements do not get removed", () => {
    const set = new TwoPSet();

    set.add("hello");
    set.add("world");
    set.remove(5);

    expect(set.values()).toEqual(new Set(["hello", "world"]));
  });
});

describe("2PSet possession", () => {
  test("Has added element", () => {
    const set = new TwoPSet();

    set.add(3);

    expect(set.has(3)).toBeTruthy();
  });

  test("Does not have unadded element", () => {
    const set = new TwoPSet();

    expect(set.has(3)).toBeFalsy();
  });

  test("Does not have removed element", () => {
    const set = new TwoPSet();

    set.add(4);
    set.add(5);
    set.remove(4);

    expect(set.has(4)).toBeFalsy();
  });
});

describe("2PSet merging", () => {
  test("Only added sets", () => {
    const s1 = new TwoPSet([1, 2, 3]);
    const s2 = new TwoPSet(["hello"]);

    s1.merge(s2);
    s2.merge(s1);

    expect(s1.values()).toEqual(new Set([1, 2, 3, "hello"]));
    expect(s2.values()).toEqual(new Set([1, 2, 3, "hello"]));
  });

  test("Only removed sets", () => {
    const s1 = new TwoPSet([], [1, 2, 3]);
    const s2 = new TwoPSet([], ["hello"]);

    s1.merge(s2);
    s2.merge(s1);

    expect(s1.values()).toEqual(new Set());
    expect(s2.values()).toEqual(new Set());
  });

  test("Both added and removed sets", () => {
    const s1 = new TwoPSet([1, 2, 3, 4, 5, "world"], [2, 3]);
    const s2 = new TwoPSet(["hello", "real", 3, 4, "world"], ["hello", 1]);

    s1.merge(s2);
    s2.merge(s1);

    expect(s1.values()).toEqual(new Set([4, 5, "world", "real"]));
    expect(s2.values()).toEqual(new Set([4, 5, "world", "real"]));
  });
});
