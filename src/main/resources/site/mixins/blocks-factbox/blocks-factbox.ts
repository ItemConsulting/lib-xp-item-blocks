import { processHtml } from "/lib/xp/portal";
import { render } from "/lib/freemarker";
import type { BlocksFactbox as RawBlocksFactbox } from ".";
import type { BlocksTheme } from "../blocks-theme";
import type { BlocksFactbox } from "./blocks-factbox.freemarker";
import type { BlockProcessorParams } from "/site/mixins/blocks/blocks";
import type { Response } from "@enonic-types/core";

type RawBlocksFactboxAndTheme = RawBlocksFactbox & BlocksTheme;

const view = resolve("blocks-factbox.ftlh");

export function process(block: RawBlocksFactboxAndTheme, { locale }: BlockProcessorParams): Response {
  return {
    body: render<BlocksFactbox>(view, {
      locale,
      title: block.title,
      text: processHtml({ value: block.text ?? "" }),
      classes: block.theme ? `theme-${block.theme}` : undefined,
    }),
  };
}
