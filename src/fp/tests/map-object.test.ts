import { asserts } from "./deps.ts";
import mapObject from "../map-object.ts";

Deno.test("hex/fp/map-object:basic", () => {
  const obj1 = { a: 1, b: 2, c: 3, d: 4, e: 5 };
  const func1 = (value: number, key: string) => ({ [key]: value - 1 });

  const result = mapObject(obj1, func1);

  asserts.assertNotStrictEquals(result, obj1);
  asserts.assertEquals(Object.keys(result).length, 5);
  asserts.assertEquals(result, { a: 0, b: 1, c: 2, d: 3, e: 4 });
});

Deno.test("hex/fp/map-object:with-value-skipping", () => {
  const obj1 = { a: 1, b: 2, c: null };
  const func1 = function func(value: number | null, key: string) {
    if (value === null) {
      return null;
    }

    return { [key]: value - 1 };
  };

  const result = mapObject(obj1, func1);

  asserts.assertNotStrictEquals(result, obj1);
  asserts.assertEquals(Object.keys(result).length, 2);
  asserts.assertEquals(result, { a: 0, b: 1 });
});