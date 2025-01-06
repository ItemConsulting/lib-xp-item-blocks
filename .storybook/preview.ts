import type { Preview } from "@itemconsulting/xp-storybook-utils";

import "./styles/reset.css";
import "./styles/demo-styles.css";
import "../src/main/resources/assets/styles/themes.stories.css";
import "../src/main/resources/assets/styles/variables.stories.css";
import "../src/main/resources/assets/styles/blocks/flow.css";
import "../src/main/resources/assets/styles/blocks/html-area.css";

declare const process: { env: { STORYBOOK_SERVER_URL?: string } };

if (!process.env.STORYBOOK_SERVER_URL) {
  throw Error(`You need to create a file named ".env" with "STORYBOOK_SERVER_URL" in it. Then restart storybook.`);
}

const preview: Preview = {
  parameters: {
    server: {
      url: process.env.STORYBOOK_SERVER_URL,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
