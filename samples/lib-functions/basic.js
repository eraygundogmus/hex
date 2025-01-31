import * as functions from "@hex/lib/functions/mod.ts";

const main = (input) => {
  const to = input.params[0] ?? "world";
  const message = `hello ${to}`;

  return functions.results.text(message);
};

functions.dumper(
  functions.executeFromCli(main),
);
