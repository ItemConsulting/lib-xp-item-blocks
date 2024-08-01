import { get as getOne, type Content, type GetContentParams } from "/lib/xp/content";

export function findOne<Hit extends Content<unknown> = Content>(params: Partial<GetContentParams>): Hit | null {
  return params.key
    ? getOne<Hit>({
        key: params.key,
        versionId: params.versionId,
      })
    : null;
}
