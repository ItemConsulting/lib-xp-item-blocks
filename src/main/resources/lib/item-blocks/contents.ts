import { type Content, type GetContentParams, get as getOne } from "/lib/xp/content";

export function findOne(params: Partial<GetContentParams>): Content | null {
  return params.key
    ? getOne({
        key: params.key,
        versionId: params.versionId,
      })
    : null;
}
