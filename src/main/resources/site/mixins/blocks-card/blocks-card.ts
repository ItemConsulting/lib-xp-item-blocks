import { get as getOne } from "/lib/xp/content";
import { processHtml } from "/lib/xp/portal";
import { process as processLink } from "/site/mixins/blocks-link/blocks-link";
import { isEmptyOrUndefined, notNullOrUndefined } from "/lib/item-blocks/utils";
import { getImageParams, type ImageParams } from "/lib/item-blocks/images";
import { render } from "/lib/tineikt/freemarker";
import type { ContentImage, ContentVector } from "/lib/item-blocks/types";
import type { BlocksCard as BlocksCardRaw } from ".";
import type { BlocksCard } from "/site/mixins/blocks-card/blocks-card.freemarker";
import {
  isBlocksImagePlacement,
  process as processImagePlacement,
} from "/site/mixins/blocks-image-placement/blocks-image-placement";

type BlocksCardRawWithOptionalFields = BlocksCardRaw & {
  theme?: string;
  imageClass?: string;
};

const WIDTH_CONTAINER = 676; // At 620 multi column layouts will become single column
const WIDTH_LARGEST_IN_CARD = 431; // Largest common width in multi column layouts
const IMAGE_PROPORTION_16_9 = 9 / 16;

const view = resolve("blocks-card.ftl");

export function process(block: BlocksCardRawWithOptionalFields): string {
  const image = block.imageId
    ? (getOne<ContentImage | ContentVector>({
        key: block.imageId,
      }) ?? undefined)
    : undefined;

  const link = block.link ? processLink(block.link) : undefined;
  const imageOnly =
    block.imageId !== undefined && [link?.url, block.kicker, block.title, block.text].every(isEmptyOrUndefined);

  return render<BlocksCard>(view, {
    url: link?.url,
    classes: [
      block.theme ? `theme-${block.theme}` : undefined,
      `blocks-card--link-${link?.type ?? "none"}`,
      isBlocksImagePlacement(block) ? processImagePlacement(block) : undefined,
    ]
      .filter(notNullOrUndefined)
      .join(" "),
    kicker: block.kicker,
    title: block.title,
    text: processHtml({ value: block.text ?? "" }),
    image: image
      ? getImage({
          imageContent: image,
          imageOnly,
        })
      : undefined,
  });
}

function getImage({ imageContent, imageOnly }: GetImageSrcParams): ImageParams {
  const width = imageOnly ? WIDTH_CONTAINER : getImageMaxWidth();
  const height = Math.round(width * IMAGE_PROPORTION_16_9);

  return getImageParams({
    imageContent,
    width,
    height,
  });
}

function getImageMaxWidth(): number {
  try {
    return app.config.cardImageMaxWidth ? parseInt(app.config.cardImageMaxWidth) : WIDTH_LARGEST_IN_CARD;
  } catch {
    log.error(`"cardImageMaxWidth" in configuration does not contain a valid value`);
  }

  return WIDTH_LARGEST_IN_CARD;
}

type GetImageSrcParams = {
  imageContent: ContentImage | ContentVector;
  imageOnly: boolean;
};
