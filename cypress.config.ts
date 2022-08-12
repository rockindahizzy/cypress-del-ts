import { defineConfig } from "cypress";
import * as path from "path";
import {deleteSync} from 'del';

export default defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {
      const version = config.env.version || 'development'
      config.projectId = "5jgpns"
      config.defaultCommandTimeout = 10000
      config.chromeWebSecurity = false
      // on("task", {
      //   async checkGmail(args: CheckGmailParam) {
      //     return await checkGmail(args);
      //   },
      // });
      on('after:spec', (spec, results) => {
        if (results && results.stats.failures === 0 && results.video) {
          // `del()` returns a promise, so it's important to return it to ensure
          // deleting the video is finished before moving on
          deleteSync(results.video)
        }
      })
      return config
    }
  },
});
