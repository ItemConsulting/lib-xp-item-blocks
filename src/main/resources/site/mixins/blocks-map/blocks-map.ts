// TODO When map exists a preload should be added to the page, to start loading the JS early
import { render } from "/lib/freemarker";
import { forceArray } from "/lib/item-blocks/arrays";
import { notNullOrUndefined } from "/lib/item-blocks/utils";
import { processHtml } from "/lib/xp/portal";
import { assetUrl } from "/lib/enonic/asset";
import type { BlocksMap as RawBlocksMap } from ".";
import type { BlocksMap, Marker } from "./blocks-map.freemarker";
import type { BlockProcessorParams } from "/site/mixins/blocks/blocks";
import type { Response } from "@enonic-types/core";

const view = resolve("blocks-map.ftlh");

type MarkerRaw = NonNullable<RawBlocksMap["markers"]>[number];

export function process(block: RawBlocksMap, { locale }: BlockProcessorParams): Response {
  const [lat, lng] = block.center.split(",");
  const assetBaseUrl = assetUrl({ path: "" });
  const mapLibreBaseUrl = `${assetBaseUrl}/maplibre-gl/5.6.1/dist`;

  const model: BlocksMap = {
    locale,
    lng,
    lat,
    zoom: block.zoom,
    markers: forceArray(block.markers).map(getSimpleMarker).filter(notNullOrUndefined),
    workerSrc: `${mapLibreBaseUrl}/maplibre-gl-csp-worker.js`,
    styleSrc: `${mapLibreBaseUrl}/maplibre-gl.css`,
  };

  const importMap = {
    imports: {
      "maplibre-gl": `${mapLibreBaseUrl}/maplibre-gl.js`,
    },
  };

  return {
    body: render<BlocksMap>(view, model),
    pageContributions: {
      headBegin: [
        `<link rel="preload" href="${model.workerSrc}" as="script" />`,
        `<link rel="preload" href="${model.styleSrc}" as="style" />`,
      ],
      headEnd: [
        `<script type="importmap">${JSON.stringify(importMap)}</script>`,
        `<script type="module" src="${assetBaseUrl}/blocks/maplibre-gl.mjs"></script>`,
      ],
    },
  };
}

function getSimpleMarker(markerRaw: MarkerRaw): Marker | undefined {
  switch (markerRaw._selected) {
    case "popup":
      const [lat, lng] = markerRaw.popup.lngLat.split(",");

      return {
        type: "popup",
        lng,
        lat,
        text: processHtml({
          value: markerRaw.popup.text ?? "",
        }),
      };
    default:
      return undefined;
  }
}
