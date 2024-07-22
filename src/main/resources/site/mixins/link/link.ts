import { pageUrl } from "/lib/xp/portal";
import type { Link } from ".";

export const URL_CONTENT_NOT_FOUND = "_/error/404?message=Content+not+found";

export function getUrl(link: Link["link"]): string {
  switch (link?._selected) {
    case "internal":
      return pageUrl({
        id: link.internal.internalLink,
      });

    case "external":
      return link.external.externalLink;

    default:
      return URL_CONTENT_NOT_FOUND;
  }
}
