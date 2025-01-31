import { asserts, bdd } from "./deps.ts";
import { deepMerge } from "../deep-merge.ts";

type Dummy1Prop = {
  inners: {
    inner1: number;
    inner2: number[];
    inner3?: number;
  };
  outer?: string;
};

class Dummy1 {
  prop: Dummy1Prop;

  constructor(prop: Dummy1Prop) {
    this.prop = prop;
  }
}

type Dummy2Prop = {
  inners: {
    inner2: number[];
    inner3: number;
  };
  outer: string;
};

class Dummy2 {
  prop: Dummy2Prop;

  constructor(prop: Dummy2Prop) {
    this.prop = prop;
  }
}

bdd.describe("hex/lib/fp/deep-merge", () => {
  bdd.it("basic", () => {
    const obj1 = {
      a: {
        b: [1, 2, 3],
        c: {
          d: 4,
        },
      },
    };

    const obj2 = {
      a: {
        b: [55],
      },
      e: "hello",
    };

    const result = deepMerge(obj1, obj2);

    asserts.assertNotStrictEquals(result, obj1);
    asserts.assertNotStrictEquals(result, obj2);
    asserts.assertStrictEquals(result.constructor, Object);
    asserts.assertEquals(result, {
      a: {
        b: [55],
        c: {
          d: 4,
        },
      },
      e: "hello",
    });
  });

  bdd.it("classes", () => {
    const obj1 = new Dummy1({
      inners: {
        inner1: 1,
        inner2: [2, 3],
      },
    });

    const obj2 = new Dummy2({
      inners: {
        inner2: [4, 5],
        inner3: 6,
      },
      outer: "sub-mariner",
    });

    const result = deepMerge(obj1, obj2);

    asserts.assertNotStrictEquals(result, obj1);
    asserts.assertNotStrictEquals(result, obj2);
    asserts.assertStrictEquals(result.constructor, Dummy1);
    asserts.assertEquals(
      result,
      new Dummy1({
        inners: {
          inner1: 1,
          inner2: [4, 5],
          inner3: 6,
        },
        outer: "sub-mariner",
      }),
    );
  });
});
