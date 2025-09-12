import type { ImageParams } from "/lib/item-blocks/images";

export type BlocksCard = {
  locale: string;
  url?: string;
  classes?: string;
  image?: ImageParams;
  kicker?: string;
  title?: string;
  text?: string;
};
