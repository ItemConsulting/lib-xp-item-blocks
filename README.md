# Item Blocks

## Config

```
defaultLocale=no
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

## Translations

To use the translations included in this project you need to copy the contents of 
[phrases.properties](src/main/resources/i18n/phrases.properties) and
[phrases_no.properties](src/main/resources/i18n/phrases_no.properties) in files with the same names in your project.
