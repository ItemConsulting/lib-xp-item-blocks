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
import { Unarray } from "/lib/item-blocks/types";

export type BlockProcessor<Block> = (block: Block, params?: BlockProcessorParams) => string | string[];

export type BlockProcessorParams = {
  component: Component;
  locale: string;
};

export type ProcessParams = {
  blocks?: ProcessableBlock[];
  gapRow?: string;
};

export type ProcessableBlock = {
  _selected: string;
  [name: string]: unknown;
};

type BlocksName = Unarray<NonNullable<BlocksRaw["blocks"]>>["_selected"];

const BLOCK_PROCESSORS_BUILT_IN: Record<BlocksName, BlockProcessor<unknown>> = {
  "blocks-accordion": processBlocksAccordion as BlockProcessor<unknown>,
  "blocks-text": processBlocksText as BlockProcessor<unknown>,
  "blocks-images": processBlocksImages as BlockProcessor<unknown>,
  "blocks-factbox": processBlocksFactbox as BlockProcessor<unknown>,
  "blocks-cards": processBlocksCards as BlockProcessor<unknown>,
  "blocks-reuse": processBlocksReuse as BlockProcessor<unknown>,
  "blocks-quote": processBlocksQuote as BlockProcessor<unknown>,
};

const REGISTERED_BLOCK_PROCESSORS: Record<string, BlockProcessor<unknown>> = {
  ...BLOCK_PROCESSORS_BUILT_IN,
};

const view = resolve("blocks.ftl");

export function process(config: ProcessParams, params?: BlockProcessorParams): string {
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

function processBlocks(blocks: ProcessableBlock[], params: BlockProcessorParams): string[] {
  return flatMap(forceArray(blocks), (block) => {
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
