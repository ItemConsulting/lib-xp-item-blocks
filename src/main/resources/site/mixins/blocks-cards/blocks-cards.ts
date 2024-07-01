import { get as getOne } from "/lib/xp/content";
import { render } from "/lib/tineikt/freemarker";
import { forceArray } from "/lib/item-blocks/arrays";
import { getUrl } from "/site/mixins/link/link";
import { imageUrl, type ImageUrlParams } from "/lib/xp/portal";
import type { BlocksCards as RawBlocksCards } from ".";
import type { ContentImage, ContentVector, Unarray } from "/lib/item-blocks/types";

const view = resolve("blocks-cards.ftl");

export function process(block: RawBlocksCards): string {
  /**
   * Variants to check
   * - Image only should cover the whole card
   * - Image size should be configurable
   * - Card with no link should be valid
   */

  return render(view, {
    title: block.title,
    items: forceArray(block.items).map(processCard),
  });
}

function processCard(item: Unarray<RawBlocksCards["items"]>) {
  const image = item.imageId
    ? getOne<ContentImage | ContentVector>({
        key: item.imageId,
      }) ?? undefined
    : undefined;

  return {
    url: getUrl(item.link),
    title: item.title,
    intro: item.intro,
    imageSrc: image
      ? imageUrl({
          path: image._path,
          scale: (app.config.cardImageScale as ImageUrlParams["scale"]) ?? "block(471, 265)",
          format: image?.type === "media:image" ? "jpg" : undefined,
        })
      : undefined,
    class: `blocks-card--image-position-${item.imagePosition}`,
  };
}
