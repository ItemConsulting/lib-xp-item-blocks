import type {
  CustomSelectorServiceResponseBody,
  CustomSelectorServiceResponseHit,
} from "@item-enonic-types/global/controller";

const DEFAULT_THEME = "accent=#0062BA,neutral=#1E2B3C,brand1=#F45F63,brand2=#E5AA20,brand3=#1E98F5";

export function get(): XP.Response<CustomSelectorServiceResponseBody> {
  const hits = parseThemeString(app.config.themes ?? DEFAULT_THEME);

  return {
    body: {
      total: hits.length,
      count: hits.length,
      hits,
    },
  };
}

function parseThemeString(themesStr: string): CustomSelectorServiceResponseHit[] {
  return themesStr.split(",").map((theme) => {
    const [name, hex] = theme.split("=");

    return {
      id: name,
      displayName: name,
      description: hex,
      icon: {
        data: `<svg viewBox="0 0 100 100" fill="${hex}" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="50" /></svg>`,
        type: "image/svg+xml",
      },
    };
  });
}
