# Item Blocks

![Build badge](https://github.com/ItemConsulting/lib-xp-item-blocks/actions/workflows/main.yml/badge.svg)
[![](https://repo.itemtest.no/api/badge/latest/releases/no/item/lib-xp-item-blocks)](https://repo.itemtest.no/#/releases/no/item/lib-xp-item-blocks)
[![](https://img.shields.io/npm/types/%40item-enonic-types%2Flib-blocks)](https://www.npmjs.com/package/@item-enonic-types/lib-blocks)


## Gradle

To install this library you may need to add some new dependencies to your app's build.gradle file.

```groovy
repositories {
  maven { url "https://repo.itemtest.no/releases" }
}

dependencies {
  include "no.item:lib-xp-item-blocks:0.3.1"
  // if you want to use the map block, include these too
  include "com.enonic.lib:lib-asset:1.0.3"
  webjar "org.webjars.npm:maplibre-gl:5.6.1"
}
```

## Add types to tsconfig.json

```json
{
  "compilerOptions": {
    "paths": {
      "/*": [
        "./src/main/resources/*",
        "./.xp-codegen/*",
        "./node_modules/@itemconsulting/lib-item-blocks/dist/*"
      ]
    }
  }
}
```

This will allow you to use functions deployed in the jar-file. 

Example of how to register a new block processor in _main.ts_.

```typescript
import { registerBlockProcessor } from "/site/mixins/blocks/blocks";
import { blockProcessor } from "/site/mixins/my-block/my-block"

registerBlockProcessor("my-block", blockProcessor)
```

## CSS custom properties

This library expects some custom properties to be present, so that the blocks can be configured to fit in your 
design system.

```css
:root {
  /* Containers */
  --blocks-container-sm: 75ch;
  --blocks-container-md: 778px;
  --blocks-container-lg: 940px;

  /* Spacing */
  --blocks-spacing-sm: 1rem;
  --blocks-spacing-md: 1rem;
  --blocks-spacing-lg: 1.25rem;
  --blocks-spacing-xl: 2rem;
  --blocks-spacing-xxl: 3rem;
}
```

## Content Security Policy

If you are using the Map Block, you need to open CSP to allow data to be fetched from **OpenFreeMap**. 

_com.enonic.xp.admin.cfg_

```ini
site.preview.contentSecurityPolicy = default-src 'self'; base-uri 'self'; form-action 'self'; script-src 'self'; object-src 'none'; img-src * data: blob:; style-src * 'unsafe-inline'; font-src * data:; connect-src 'self' https://tiles.openfreemap.org; worker-src 'self' blob: ; child-src 'self' blob: ;
```

## Translations

To use the translations included in this project you need to copy the contents of 
[phrases.properties](src/main/resources/i18n/phrases.properties) and
[phrases_no.properties](src/main/resources/i18n/phrases_no.properties) in files with the same names in your project.

## Deploy to Maven

```bash
./gradlew publish -P com.enonic.xp.app.production=true
```
