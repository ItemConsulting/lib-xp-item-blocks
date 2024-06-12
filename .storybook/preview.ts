import type { Preview } from "@itemconsulting/xp-storybook-utils";

import "./styles/reset.css";
import "./styles/demo-variables.css";
import "./styles/demo-themes.css";
import "./styles/demo-styles.css";
import "../src/main/resources/assets/styles/variables.css";
import "../src/main/resources/assets/styles/flow.css";
import "../src/main/resources/assets/styles/html-area.css";

if(!process.env.STORYBOOK_SERVER_URL) {
  throw Error(`You need to create a file named ".env" with "STORYBOOK_SERVER_URL" in it. Then restart storybook.`)
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
