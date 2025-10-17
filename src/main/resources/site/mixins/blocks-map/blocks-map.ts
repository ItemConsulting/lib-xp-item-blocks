// TODO When map exists a preload should be added to the page, to start loading the JS early
import { render } from "/lib/freemarker";
import { forceArray } from "/lib/item-blocks/arrays";
import { notNullOrUndefined } from "/lib/item-blocks/utils";
import { processHtml } from "/lib/xp/portal";
import { assetUrl } from "/lib/enonic/asset";
import type { BlocksMap as RawBlocksMap } from ".";
import type { BlocksMap, Marker } from "./blocks-map.freemarker";
import type { BlockProcessorParams } from "/site/mixins/blocks/blocks";

const view = resolve("blocks-map.ftlh");

type MarkerRaw = NonNullable<RawBlocksMap["markers"]>[number];

export function process(block: RawBlocksMap, { locale }: BlockProcessorParams): string {
  const [lat, lng] = block.center.split(",");

  return render<BlocksMap>(view, {
    locale,
    lng,
    lat,
    zoom: block.zoom,
    markers: forceArray(block.markers).map(getSimpleMarker).filter(notNullOrUndefined),
    assetBaseUrl: assetUrl({
      path: "",
    }),
  });
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
