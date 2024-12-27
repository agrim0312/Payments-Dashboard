import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    supportFile:false,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 10000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
