import { get as getOne, type Content } from "/lib/xp/content";
import { forceArray } from "/lib/item-blocks/arrays";
import { getComponent, getContent } from "/lib/xp/portal";
import { concat as concatResponse } from "/lib/item-blocks/responses";
import { render } from "/lib/freemarker";
import { process as processBlocksAccordion } from "/site/mixins/blocks-accordion/blocks-accordion";
import { process as processBlocksText } from "/site/mixins/blocks-text/blocks-text";
import { process as processBlocksCard } from "/site/mixins/blocks-card/blocks-card";
import { process as processBlocksCards } from "/site/mixins/blocks-cards/blocks-cards";
import { process as processBlocksFactbox } from "/site/mixins/blocks-factbox/blocks-factbox";
import { process as processBlocksImages } from "/site/mixins/blocks-images/blocks-images";
import { process as processBlocksQuote } from "/site/mixins/blocks-quote/blocks-quote";
import type { Component, Request, Response } from "@enonic-types/core";
import type { Blocks as BlocksRaw } from ".";
import type { BlocksReuse as BlocksReuseRaw } from "/site/mixins/blocks-reuse";
import type { Blocks } from "/site/mixins/blocks/blocks.freemarker";
import type { Optional, Unarray } from "/lib/item-blocks/types";

export type BlockProcessor<Block> = (block: Block, params: BlockProcessorParams) => Response;

export type BlockProcessorParams = {
  content: Content<unknown>;
  component: Component;
  locale: string;
  req: Request;
  classes: string;
  blockIndex: number;
};

export type BlocksParams = {
  blocks?: ProcessableBlock[];
};

export type ProcessableBlock = {
  _selected: string;
  [name: string]: unknown;
};

type BlocksName = Unarray<NonNullable<BlocksRaw["blocks"]>>["_selected"] & "blocks-card";

const BLOCK_PROCESSORS_BUILT_IN: Record<BlocksName, BlockProcessor<unknown>> = {
  "blocks-accordion": processBlocksAccordion as BlockProcessor<unknown>,
  "blocks-text": processBlocksText as BlockProcessor<unknown>,
  "blocks-images": processBlocksImages as BlockProcessor<unknown>,
  "blocks-factbox": processBlocksFactbox as BlockProcessor<unknown>,
  "blocks-card": processBlocksCard as BlockProcessor<unknown>,
  "blocks-cards": processBlocksCards as BlockProcessor<unknown>,
  "blocks-reuse": processBlocksReuse as BlockProcessor<unknown>,
  "blocks-quote": processBlocksQuote as BlockProcessor<unknown>,
};

const REGISTERED_BLOCK_PROCESSORS: Record<string, BlockProcessor<unknown>> = {
  ...BLOCK_PROCESSORS_BUILT_IN,
};

const view = resolve("blocks.ftlh");

export type ProcessParams = Optional<
  BlockProcessorParams,
  "content" | "component" | "locale" | "classes" | "blockIndex"
> & {
  blocksClasses?: string;
};

export function process(config: BlocksParams, params: ProcessParams): Response {
  const component = params.component ?? getComponent();
  const content = params.content ?? getContent();
  const locale = params.locale ?? content?.language ?? "no";

  if (!content) {
    throw new Error("Content not found in scope");
  }
  if (!component) {
    throw new Error("Component not found in scope");
  }

  const processedBlocks = processBlocks(config.blocks ?? [], {
    content,
    component,
    locale,
    classes: params.classes ?? "",
    req: params.req,
  });

  return {
    ...processedBlocks,
    body: render<Blocks>(view, {
      classes: params.blocksClasses,
      blocksMarkup: typeof processedBlocks.body === "string" ? processedBlocks.body : "",
    }),
  };
}

function processBlocks(blocks: ProcessableBlock[], params: Optional<BlockProcessorParams, "blockIndex">): Response {
  return forceArray(blocks)
    .map((block, blockIndex) =>
      processBlock(block._selected, block[block._selected], {
        ...params,
        blockIndex,
      }),
    )
    .reduce<Response>(concatResponse, {});
}

export function processBlock(selected: string, block: unknown, params: BlockProcessorParams): Response {
  const processor = REGISTERED_BLOCK_PROCESSORS[selected];

  if (processor) {
    return processor(block, params);
  } else {
    throw new Error(`No processor registered for block type "${selected}"`);
  }
}

export function registerBlockProcessor<Block>(selected: string, processor: BlockProcessor<Block>): void {
  REGISTERED_BLOCK_PROCESSORS[selected] = processor as BlockProcessor<unknown>;
}

export function unregisterBlockProcessor(selected: string): void {
  if (REGISTERED_BLOCK_PROCESSORS[selected]) {
    delete REGISTERED_BLOCK_PROCESSORS[selected];
  }
}

export function processBlocksReuse(block: BlocksReuseRaw, params: BlockProcessorParams): Response {
  const content = block.contentId ? getOne<Content<BlocksRaw>>({ key: block.contentId }) : undefined;
  /* Use language of the imported content to add content with different [lang] in block list */
  const localizedParams: BlockProcessorParams = {
    ...params,
    locale: content?.language ?? params.locale,
  };

  return processBlocks(forceArray(content?.data.blocks), localizedParams);
}
