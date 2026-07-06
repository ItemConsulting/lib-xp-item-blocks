import type { Response } from "@enonic-types/core";
import { render } from "/lib/freemarker";
import { processHtml } from "/lib/xp/portal";
import type { BlockProcessorParams } from "/site/mixins/blocks/blocks";
import type { BlocksTheme } from "../blocks-theme";
import type { BlocksFactbox as RawBlocksFactbox } from ".";
import type { BlocksFactbox } from "./blocks-factbox.freemarker";

type RawBlocksFactboxAndTheme = RawBlocksFactbox & BlocksTheme;

const view = resolve("blocks-factbox.ftlh");

export function process(block: RawBlocksFactboxAndTheme, { locale }: BlockProcessorParams): Response {
  const model: BlocksFactbox = {
    locale,
    title: block.title,
    text: processHtml({ value: block.text ?? "" }),
    classes: block.theme ? `theme-${block.theme}` : undefined,
  };

  return {
    body: render<BlocksFactbox>(view, model),
  };
}
