import { DEFAULT_XP_SERVER, type Preview } from "@itemconsulting/xp-storybook-utils";
// Designsystemet design tokens (--ds-color-*, data-color palette switching).
// :root defaults to the light color-scheme, so no data-color-scheme is required.
import "@digdir/designsystemet-css/base.css";
import "@digdir/designsystemet-css/theme.css";
import "@digdir/designsystemet-css/details.css";
import "@digdir/designsystemet-css/card.css";
import "@digdir/designsystemet-css/heading.css";
import "@digdir/designsystemet-css/paragraph.css";
import "@digdir/designsystemet-css/link.css";
import "../src/main/resources/assets/styles/variables.stories.css";
import "../src/main/resources/assets/styles/blocks/blocks-content-grid.css";
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
  // Toolbar toggle for Designsystemet's color scheme. DS resolves --ds-color-*
  // (and base.css sets the body background/text) from the data-color-scheme
  // attribute, so setting it on the preview root themes the whole canvas.
  // "auto" follows the OS `prefers-color-scheme`.
  globalTypes: {
    colorScheme: {
      description: "Designsystemet color scheme",
      defaultValue: "light",
      toolbar: {
        title: "Color scheme",
        icon: "contrast",
        dynamicTitle: true,
        items: [
          { value: "light", title: "Light", icon: "sun" },
          { value: "dark", title: "Dark", icon: "moon" },
          { value: "auto", title: "Auto", icon: "browser" },
        ],
      },
    },
  },
  decorators: [
    (story, { globals }) => {
      document.documentElement.setAttribute("data-color-scheme", globals.colorScheme ?? "light");
      return story();
    },
  ],
} satisfies Preview;
