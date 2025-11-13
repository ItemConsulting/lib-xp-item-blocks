# Item Blocks

![Build badge](https://github.com/ItemConsulting/lib-xp-item-blocks/actions/workflows/main.yml/badge.svg)
[![](https://repo.itemtest.no/api/badge/latest/releases/no/item/lib-xp-item-blocks)](https://repo.itemtest.no/#/releases/no/item/lib-xp-item-blocks)
[![](https://img.shields.io/npm/types/%40item-enonic-types%2Flib-blocks)](https://www.npmjs.com/package/@item-enonic-types/lib-blocks)


## Gradle

To install this library you may need to add some new dependencies to your app's build.gradle file.

```groovy
repositories {
  maven { url "https://repo.itemtest.no/releases" }
  maven { url "https://repo.itemtest.no/snapshots" }
}

dependencies {
  include "no.item:lib-xp-item-blocks:0.3.0-SNAPSHOT"
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

Example of how to create a part _blocks-view.ts_ that renders out the blocks.

```typescript
import { process } from "/site/mixins/blocks/blocks";
import { blockProcessor } from "/site/mixins/my-block/my-block"

const view = resolve("blocks-view.ftlh");

export function get(req: Request): Response {
  const content = getContent();
  const component = getComponent();

  ...
  
  const response = process({
    blocks: forceArray(content.data.blocks),
    component,
    content,
    req,
    processors: {
      "my-block": processMedia,
    },
  });

  return response;
}
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

## Translations

To use the translations included in this project you need to copy the contents of 
[phrases.properties](src/main/resources/i18n/phrases.properties) and
[phrases_no.properties](src/main/resources/i18n/phrases_no.properties) in files with the same names in your project.

## Deploy to Maven

```bash
./gradlew publish -P com.enonic.xp.app.production=true
```
