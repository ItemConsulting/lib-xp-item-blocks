import { BlocksConfig } from "/site/mixins";

export function getBlocksConfigClasses(blocksConfig?: BlocksConfig): string {
  return [
    `content-grid--layout-${blocksConfig?.blockLayout ?? "normal"}`,
    `blocks--gap-${blocksConfig?.gapRow ?? "md"}`,
  ].join(" ");
}
