import { pageUrl } from "/lib/xp/portal";
import type { Link } from ".";

export function getUrl(link: Link["link"]): string {
  switch (link?._selected) {
    case "internal":
      return pageUrl({
        id: link.internal.internalLink,
      });

    case "external":
      return link.external.externalLink;

    default:
      return "_/error/404?message=Content+not+found";
  }
}
