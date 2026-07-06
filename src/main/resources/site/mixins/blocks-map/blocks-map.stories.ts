import id from "./blocks-map.ftlh";
import "../../../assets/styles/blocks/blocks-map.css";
import "../../../assets/scripts/blocks/maplibre-gl";
import type { StoryObj, Meta } from "@itemconsulting/xp-storybook-utils";
import type { BlocksMap } from "./blocks-map.freemarker";

export default {
  title: "Blocks/Map",
  parameters: {
    server: { id },
    layout: "centered",
  },
} satisfies Meta<BlocksMap>;

export const map: StoryObj<BlocksMap> = {
  args: {
    locale: "no",
    lat: "59.912087",
    lng: "10.736717",
    zoom: 15,
    styleSrc: "maplibre-gl.css",
    workerSrc: "maplibre-gl-csp-worker-dev.js",
    markers: [
      {
        type: "popup",
        lat: "59.912087",
        lng: "10.736717",
        text: "<p>Dette er en test</p>"
      }
    ]
  },
};
