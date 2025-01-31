import { asserts, bdd } from "./deps.ts";
import { filterArray } from "../filter-array.ts";

bdd.describe("hex/lib/fp/filter-array", () => {
  bdd.it("basic", () => {
    const arr1 = [1, 2, 3, 4, 5];
    const func1 = (x: number) => x <= 3;

    const result = filterArray(arr1, func1);

    asserts.assertNotStrictEquals(result, arr1);
    asserts.assertEquals(result.length, 3);
    asserts.assertEquals(result, [1, 2, 3]);
  });

  bdd.it("with-generator", () => {
    const gen1 = function* () {
      yield 1;
      yield 2;
      yield 3;
      yield 4;
      yield 5;
    };
    const func1 = (x: number) => x <= 3;

    const generated1 = gen1();
    const result = filterArray(generated1, func1);

    // deno-lint-ignore no-explicit-any
    asserts.assertNotStrictEquals(<any> result, <any> generated1);
    asserts.assertEquals(result.length, 3);
    asserts.assertEquals(result, [1, 2, 3]);
  });
});
