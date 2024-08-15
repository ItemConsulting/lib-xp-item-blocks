import { BlocksConfig } from "/site/mixins";

export function getBlocksConfigClasses(blocksConfig?: BlocksConfig): string {
  return [
    `blocks--default-grid-column-${blocksConfig?.blockWidth ?? "content"}`,
    `blocks--gap-${blocksConfig?.gapRow ?? "md"}`,
  ].join(" ");
}
