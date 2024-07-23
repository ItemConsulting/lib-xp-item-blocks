import { get as getOne } from "/lib/xp/content";
import { getUrl } from "/site/mixins/link/link";
import { isEmptyOrUndefined } from "/lib/item-blocks/utils";
import { getImageParams, type ImageParams } from "/lib/item-blocks/images";
import type { ContentImage, ContentVector, Unarray } from "/lib/item-blocks/types";
import type { BlocksCards as RawBlocksCards } from "/site/mixins/blocks-cards";
import type { BlocksCard } from "/site/mixins/blocks-card/blocks-card.freemarker";

const WIDTH_CONTAINER = 676; // At 620 multi column layouts will become single column
const WIDTH_LARGEST_IN_CARD = 431; // Largest common width in multi column layouts
const IMAGE_PROPORTION_16_9 = 9 / 16;

export function process(item: Unarray<RawBlocksCards["items"]>): BlocksCard {
  const image = item.imageId
    ? getOne<ContentImage | ContentVector>({
        key: item.imageId,
      }) ?? undefined
    : undefined;

  const url = getUrl(item.link);
  const imageOnly = item.imageId !== undefined && [url, item.kicker, item.title, item.text].every(isEmptyOrUndefined);

  return {
    url,
    kicker: item.kicker,
    title: item.title,
    text: item.text,
    image: image
      ? getImage({
          imageContent: image,
          imageOnly,
        })
      : undefined,
  };
}

function getImage({ imageContent, imageOnly }: GetImageSrcParams): ImageParams {
  const width = imageOnly ? WIDTH_CONTAINER : WIDTH_LARGEST_IN_CARD;
  const height = Math.round(width * IMAGE_PROPORTION_16_9);

  return getImageParams({
    imageContent,
    width,
    height,
  });
}

type GetImageSrcParams = {
  imageContent: ContentImage | ContentVector;
  imageOnly: boolean;
};
