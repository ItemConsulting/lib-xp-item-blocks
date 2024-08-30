import { BlocksConfig } from "/site/mixins";

type BlockLayout = NonNullable<BlocksConfig["blockLayout"]>;

type BlocksConfigClasses = `content-grid--layout-${BlockLayout}`;

export function getBlocksConfigClasses(blocksConfig?: BlocksConfig): BlocksConfigClasses {
  return `content-grid--layout-${blocksConfig?.blockLayout ?? "narrow"}`;
}
