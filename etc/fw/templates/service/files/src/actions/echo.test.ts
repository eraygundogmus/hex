import * as di from "@hex/lib/di/mod.ts";
import { echoAction } from "@app/actions/echo.ts";
import { asserts } from "@app/deps.ts";

Deno.test("actions:echo", async (t) => {
  await t.step("basic output", () => {
    const slug = "eser";
    const test = "placeholder value";

    di.registry.setValue("test", test);

    const expected = {
      message: `Hello ${slug}! Testing ${test}...`,
      timestamp: new Date().toLocaleDateString(),
    };

    asserts.assertEquals(expected, echoAction({ registry: di.registry, slug }));
  });
});
