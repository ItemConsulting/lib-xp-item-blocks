import type { InputType } from "@storybook/types";

export const controlRadioTheme: InputType = {
  options: ["theme-accent", "theme-neutral", "theme-brand1", "theme-brand2", "theme-brand3"],
  control: {
    type: "radio",
    labels: {
      "theme-accent": "Accent",
      "theme-neutral": "Neutral",
      "theme-brand1": "Brand1",
      "theme-brand2": "Brand2",
      "theme-brand3": "Brand3",
    },
  },
};
