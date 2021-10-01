type SplitObjectResult<T> = {
  items: Record<string, T>;
  rest: Record<string, T>;
};

function splitObject<T>(
  instance: Record<string, T>,
  n: number,
): SplitObjectResult<T> {
  let index = 0;

  return Object.keys(instance).reduce(
    (obj: SplitObjectResult<T>, itemKey: string) => {
      if (index < n) {
        index += 1;

        return {
          items: Object.assign({}, obj.items, { [itemKey]: instance[itemKey] }),
          rest: obj.rest,
        };
      }

      return {
        items: obj.items,
        rest: Object.assign({}, obj.rest, { [itemKey]: instance[itemKey] }),
      };
    },
    {
      items: {},
      rest: {},
    },
  );
}

export { splitObject as default };