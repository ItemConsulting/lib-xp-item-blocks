import { get as getOne, type Content, type GetContentParams } from "/lib/xp/content";

export function findOne(params: Partial<GetContentParams>): Content | null {
  return params.key
    ? getOne({
        key: params.key,
        versionId: params.versionId,
      })
    : null;
}
