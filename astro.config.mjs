// @ts-check
import { defineConfig, envField } from "astro/config";

// https://astro.build/config
export default defineConfig({
  env: {
    schema: {
      API_HOST: envField.string({ context: "server", access: "public" }),
      API_TOKEN: envField.string({ context: "server", access: "secret" }),
    },
  },
});
