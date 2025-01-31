import { run } from "@hex/fw/web/mod.ts";

run({
  urls: {
    structure: "/[lang]/[...path]",
    rewrites: [
      // {
      //   source: "/",
      //   destination: "/en/"
      // }
    ],
  },

  i18n: {
    languages: [
      "en",
      "tr",
    ],
  },
});
