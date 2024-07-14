import type { InputType } from "@storybook/types";

export const controlRadioTheme: InputType = {
  name: "Theme",
  description: "Chose a color theme for the component",
  options: ["theme-accent", "theme-neutral", "theme-brand1", "theme-brand2", "theme-brand3"],
  control: {
    type: "inline-radio",
    labels: {
      "theme-accent": "Accent",
      "theme-neutral": "Neutral",
      "theme-brand1": "Brand1",
      "theme-brand2": "Brand2",
      "theme-brand3": "Brand3",
    },
  },
};
