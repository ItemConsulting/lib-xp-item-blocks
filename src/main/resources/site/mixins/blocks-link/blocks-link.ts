import { pageUrl, attachmentUrl, type Content } from "/lib/xp/portal";
import { findOne } from "/lib/item-blocks/contents";
import { startsWith } from "/lib/item-blocks/utils";
import type { BlocksLink } from ".";
import type { ContentMedia, PickSelectedValue } from "/lib/item-blocks/types";

const LINK_TYPE_INTERNAL = "internal";
const LINK_TYPE_EXTERNAL = "external";
const LINK_TYPE_DOWNLOAD = "download";
const LINK_TYPE_NOT_FOUND = "not-found";

export const URL_CONTENT_NOT_FOUND = "_/error/404?message=Content+not+found";

const LINK_NOT_FOUND = {
  type: typeof LINK_TYPE_NOT_FOUND,
  url: URL_CONTENT_NOT_FOUND,
} as const;

export type InternalLink = {
  type: typeof LINK_TYPE_INTERNAL;
  url: string;
  content: Content<unknown>;
};

export type ExternalLink = {
  type: typeof LINK_TYPE_EXTERNAL;
  url: string;
};

export type DownloadLink = {
  type: typeof LINK_TYPE_DOWNLOAD;
  url: string;
  content: ContentMedia;
};

export type Link = InternalLink | ExternalLink | DownloadLink | typeof LINK_NOT_FOUND;

type RawLink = BlocksLink["link"];
type RawLinkInternal = PickSelectedValue<RawLink, "internal">;

export function process(link: RawLink): Link | undefined {
  switch (link?._selected) {
    case "internal":
      return processInternalLink(link.internal);

    case "external":
      return {
        type: LINK_TYPE_EXTERNAL,
        url: link.external.externalLink,
      };

    case "none":
      return undefined;

    default:
      return LINK_NOT_FOUND;
  }
}

function processInternalLink(internal: RawLinkInternal): Link | undefined {
  const content = findOne({
    key: internal.internalLink,
  });

  if (!content) {
    return LINK_NOT_FOUND;
  } else if (isContentMedia(content)) {
    return {
      type: LINK_TYPE_DOWNLOAD,
      url: attachmentUrl({
        path: content._path,
        download: true,
      }),
      content,
    };
  } else {
    return {
      type: LINK_TYPE_INTERNAL,
      url: pageUrl({
        path: content._path,
      }),
      content,
    };
  }
}

function isContentMedia(content: Content<unknown>): content is ContentMedia {
  return startsWith(content.type, "media:");
}
