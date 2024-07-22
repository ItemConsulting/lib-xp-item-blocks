import type { ContentImage, ContentVector, Unarray } from "/lib/item-blocks/types";
import type { BlocksCards as RawBlocksCards } from "/site/mixins/blocks-cards";
import { get as getOne } from "/lib/xp/content";
import { getUrl } from "/site/mixins/link/link";
import { imageUrl, type ImageUrlParams } from "/lib/xp/portal";
import type { BlocksCard } from "/site/mixins/blocks-card/blocks-card.freemarker";

/**
 * Variants to check
 * - Image only should cover the whole card
 * - Image size should be configurable
 * - Card with no link should be valid
 */

export function process(item: Unarray<RawBlocksCards["items"]>): BlocksCard {
  const image = item.imageId
    ? getOne<ContentImage | ContentVector>({
        key: item.imageId,
      }) ?? undefined
    : undefined;

  return {
    url: getUrl(item.link),
    kicker: item.kicker,
    title: item.title,
    text: item.text,
    // TODO If no title, intro or text or kicker, the image should we twice the size
    imageSrc: image
      ? imageUrl({
          path: image._path,
          scale: (app.config.cardImageScale as ImageUrlParams["scale"]) ?? "block(471, 265)",
          format: image?.type === "media:image" ? "jpg" : undefined,
        })
      : undefined,
  };
}
