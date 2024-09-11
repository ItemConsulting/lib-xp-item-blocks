import { BlocksImagePlacement } from ".";

export function process(block: BlocksImagePlacement): string {
  return block.imageClass ?? "blocks-card--image-left";
}

export function isBlocksImagePlacement(block: unknown): block is BlocksImagePlacement {
  return block !== undefined && (block as unknown as BlocksImagePlacement).imageClass !== undefined;
}
