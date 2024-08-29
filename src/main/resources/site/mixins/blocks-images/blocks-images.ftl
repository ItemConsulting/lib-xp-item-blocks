[#-- @ftlvariable name="id" type="String" --]
[#-- @ftlvariable name="images" type="java.util.ArrayList" --]
[#-- @ftlvariable name="locale" type="String" --]

<popover-gallery
  class="blocks-images blocks-images-size-${(images![])?size}"
  data-popover-close-aria-label="[@localize key="blocksImages.close" locale=locale /]">
  [#list images![] as image ]
    <a
      href="${image.fullSizeSrc}"
      id="${id}-image-${image_index}"
      class="blocks-images--expand-link"
      target="_blank">

      [#if image.caption?has_content]
      <figure>
        <img
          srcset="${image.srcset}"
          sizes="${image.sizes}"
          src="${image.src}"
          alt="${image.altText!""}">
        <figcaption>${image.caption}</figcaption>
      </figure>
      [#else]
        <img
          srcset="${image.srcset}"
          sizes="${image.sizes}"
          src="${image.src}"
          alt="${image.altText!""}">
      [/#if]
    </a>
  [/#list]
</popover-gallery>

