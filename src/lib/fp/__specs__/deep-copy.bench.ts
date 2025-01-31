import { deepCopy, deepCopy2 } from "../deep-copy.ts";

const group = "deep-copy";

class Dummy {
  prop: unknown;

  constructor(prop: unknown) {
    this.prop = prop;
  }
}

Deno.bench("hex/fp/deep-copy", { group, baseline: true }, () => {
  const obj1 = new Dummy({ value: 5 });

  deepCopy(obj1);
});

Deno.bench("hex/fp/deep-copy-2", { group }, () => {
  const obj1 = new Dummy({ value: 5 });

  deepCopy2(obj1);
});

Deno.bench("structuredClone", { group }, () => {
  const obj1 = new Dummy({ value: 5 });

  structuredClone(obj1);
});
