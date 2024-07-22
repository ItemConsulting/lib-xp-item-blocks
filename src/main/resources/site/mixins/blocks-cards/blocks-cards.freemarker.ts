import type { BlocksCard } from "../blocks-card/blocks-card.freemarker";

export type BlocksCards = {
  title?: string;
  items: BlocksCard[];
  classes?: string;
  link?: {
    url: string;
    text: string;
  };
};
