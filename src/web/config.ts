import { deepMerge } from "../fp/deep-merge.ts";

interface Config {
  react?: {
    strictMode?: boolean;
  };

  compilation?: {
    minify?: boolean;
    sourceMaps?: boolean;
  };

  constants?: Record<string, string>;

  app?: {
    baseDir?: string;
    startRoute?: string;
    extensions?: string[];
  };

  i18n?: {
    mode?: string;
    languages?: string[];
  };

  rewrites?: {
    source: string;
    destination: string;
  }[];
}

const defaultConfig: Config = {
  react: {
    strictMode: false,
  },

  compilation: {
    minify: false,
    sourceMaps: false,
  },

  constants: {
    "site-name": "hex",
    "site-description":
      "hex is a free and open source project that helps you build your next web application.",
    "site-url": "https://deno.land/x/hex",
    "twitter-handle": "@denohex",
  },

  app: {
    baseDir: "./src/app/",
    startRoute: "home",
    extensions: [".tsx", ".ts", ".jsx", ".js", ".mdx", ".md"],
  },

  i18n: {
    mode: "url",
    languages: [
      "en",
    ],
  },

  rewrites: [],
};

const makeConfig = (config: Config) => {
  const newConfig = deepMerge(defaultConfig, config);

  return newConfig;
};

const readConfig = async function readConfig(baseDir: string) {
  const variations = [
    `${baseDir}/hex.config.ts`,
    `${baseDir}/hex.config.js`,
  ];

  let config;
  for (const variation of variations) {
    try {
      config = (await import(variation))?.default;

      break;
    } catch (err) {
      if (!(err instanceof Deno.errors.NotFound)) {
        throw err;
      }

      // otherwise, do nothing
    }
  }

  if (config === undefined) {
    return defaultConfig;
  }

  return makeConfig(config);
};

export { type Config, defaultConfig, makeConfig, readConfig };
