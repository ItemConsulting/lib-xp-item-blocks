[#-- @ftlvariable name="id" type="String" --]
[#-- @ftlvariable name="images" type="java.util.ArrayList" --]
[#-- @ftlvariable name="locale" type="String" --]

<popover-gallery
  class="blocks-images blocks-images-size-${(images![])?size}"
  data-popover-close-aria-label="[@localize key="mixin.blocks-images.close" locale=locale /]">
  [#list images![] as image ]
    <a
      href="${image.fullSizeSrc}"
      id="${id}-image-${image_index}"
      class="blocks-images--expand-link"
      target="_blank">

      [#if image.caption?has_content]
      <figure>
        <picture>
          <img
            srcset="${image.srcset}"
            sizes="${image.sizes}"
            src="${image.src}"
            alt="${image.altText!""}">
        </picture>
        <figcaption>${image.caption}</figcaption>
      </figure>
      [#else]
        <picture>
          <img
            src="${image.src}"
            alt="${image.altText!""}"
            [#if image.srcset?has_content]srcset="${image.srcset}"[/#if]
            [#if image.sizes?has_content]sizes="${image.sizes}"[/#if]
            [#if image.width?has_content]width="${image.width}"[/#if]
            [#if image.height?has_content]height="${image.height}"[/#if]>
        </picture>
      [/#if]
    </a>
  [/#list]
</popover-gallery>

