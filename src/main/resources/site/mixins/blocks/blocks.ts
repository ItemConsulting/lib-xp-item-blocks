import { get as getOne, type Content } from "/lib/xp/content";
import { flatMap, forceArray } from "/lib/item-blocks/arrays";
import { getComponent, getContent } from "/lib/xp/portal";
import { render } from "/lib/tineikt/freemarker";
import { process as processBlocksAccordion } from "/site/mixins/blocks-accordion/blocks-accordion";
import { process as processBlocksText } from "/site/mixins/blocks-text/blocks-text";
import { process as processBlocksCards } from "/site/mixins/blocks-cards/blocks-cards";
import { process as processBlocksFactbox } from "/site/mixins/blocks-factbox/blocks-factbox";
import { process as processBlocksImages } from "/site/mixins/blocks-images/blocks-images";
import { process as processBlocksQuote } from "/site/mixins/blocks-quote/blocks-quote";
import type { Component } from "@enonic-types/core";
import type { Blocks as BlocksRaw } from ".";
import type { BlocksReuse as BlocksReuseRaw } from "/site/mixins/blocks-reuse";
import type { Blocks } from "/site/mixins/blocks/blocks.freemarker";

export type BlockProcessor<Block> = (block: Block, params?: BlockProcessorParams) => string | string[];

export type BlockProcessorParams = {
  component: Component;
  locale: string;
};

const REGISTERED_BLOCK_PROCESSORS: Record<string, BlockProcessor<unknown>> = {
  accordion: processBlocksAccordion as BlockProcessor<unknown>,
  text: processBlocksText as BlockProcessor<unknown>,
  images: processBlocksImages as BlockProcessor<unknown>,
  factbox: processBlocksFactbox as BlockProcessor<unknown>,
  cards: processBlocksCards as BlockProcessor<unknown>,
  reuse: processBlocksReuse as BlockProcessor<unknown>,
  quote: processBlocksQuote as BlockProcessor<unknown>,
};

const view = resolve("blocks.ftl");

export function process(config: BlocksRaw, params?: BlockProcessorParams): string {
  const component = params?.component ?? getComponent();
  const locale = params?.locale ?? getContent()?.language ?? app.config.defaultLocale ?? "no";

  if (!component) {
    throw new Error("Component not found in scope");
  }

  return render<Blocks>(view, {
    classes: `blocks--gap-${config.gapRow ?? "md"},`,
    blocks: processBlocks(config.blocks ?? [], { component, locale }),
  });
}

export function processBlocks(blocks: NonNullable<BlocksRaw["blocks"]>, params: BlockProcessorParams): string[] {
  return flatMap(forceArray(blocks), (block) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const value = block[block._selected];
    return value ? processBlock(block._selected, value, params) : [];
  });
}

export function processBlock(selected: string, block: unknown, params: BlockProcessorParams): string[] {
  const processor = REGISTERED_BLOCK_PROCESSORS[selected];
  return processor ? forceArray(processor(block, params)) : [];
}

export function registerBlockProcessor<Block>(selected: string, processor: BlockProcessor<Block>): void {
  REGISTERED_BLOCK_PROCESSORS[selected] = processor as BlockProcessor<unknown>;
}

export function unregisterBlockProcessor(selected: string): void {
  if (REGISTERED_BLOCK_PROCESSORS[selected]) {
    delete REGISTERED_BLOCK_PROCESSORS[selected];
  }
}

export function processBlocksReuse(block: BlocksReuseRaw, params: BlockProcessorParams): string[] {
  const content = block.contentId ? getOne<Content<BlocksRaw>>({ key: block.contentId }) : undefined;

  return processBlocks(forceArray(content?.data.blocks), params);
}
