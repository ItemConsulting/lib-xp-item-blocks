import { get as getOne, type Content } from "/lib/xp/content";
import { processBlocks, type BlockProcessorParams } from "/site/mixins/blocks/blocks";
import { forceArray } from "/lib/item-blocks/arrays";
import type { Blocks as BlocksRaw } from "/site/mixins/blocks";
import type { BlocksReuse as BlocksReuseRaw } from ".";

export function process(block: BlocksReuseRaw, params: BlockProcessorParams): string[] {
  const content = block.contentId ? getOne<Content<BlocksRaw>>({ key: block.contentId }) : undefined;

  return processBlocks(forceArray(content?.data.blocks), params);
}
