import { DEFAULT_XP_SERVER, type Preview } from "@itemconsulting/xp-storybook-utils";
import "./styles/reset.css";
import "./styles/demo-styles.css";
import "../src/main/resources/assets/styles/themes.stories.css";
import "../src/main/resources/assets/styles/variables.stories.css";
import "../src/main/resources/assets/styles/blocks/flow.css";
import "../src/main/resources/assets/styles/blocks/html-area.css";

export default {
  parameters: {
    server: DEFAULT_XP_SERVER,
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
} satisfies Preview;
