import { asserts, bdd } from "./deps.ts";
import { splitObject } from "../split-object.ts";

bdd.describe("hex/lib/fp/split-object", () => {
  bdd.it("basic", () => {
    const obj1 = { a: 1, b: 2, c: 3, d: 4, e: 5 };
    const int1 = 3;

    const result = splitObject(obj1, int1);

    asserts.assertNotStrictEquals(result.items, obj1);
    asserts.assertEquals(Object.keys(result.items).length, 3);
    asserts.assertEquals(result.items, { a: 1, b: 2, c: 3 });

    asserts.assertNotStrictEquals(result.rest, obj1);
    asserts.assertEquals(Object.keys(result.rest).length, 2);
    asserts.assertEquals(result.rest, { d: 4, e: 5 });
  });
});
