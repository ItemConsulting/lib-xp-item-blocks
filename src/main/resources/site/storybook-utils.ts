import type { InputType } from "storybook/internal/types";

export const controlRadioTheme: InputType = {
  name: "Theme",
  description: "Chose a color theme for the component",
  options: ["accent", "neutral", "brand1", "brand2"],
  control: {
    type: "inline-radio",
    labels: {
      accent: "Accent",
      neutral: "Neutral",
      brand1: "Brand1",
      brand2: "Brand2",
    },
  },
};
