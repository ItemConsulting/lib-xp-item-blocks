[#-- @ftlvariable name="images" type="java.util.ArrayList" --]
[#-- @ftlvariable name="locale" type="String" --]

<div class="blocks-images blocks-images-size-${images?size}">
  [#list images![] as image ]
    <figure>

      <div class="blocks-images--img-wrapper">
        <img
          srcset="${image.srcset}"
          sizes="${image.sizes}"
          src="${image.src}"
          alt="${image.altText!""}">

        <a
          href="${image.fullSizeSrc}"
          aria-label="[@localize key="blocksMixin.images.expand" locale=locale /]"
          class="blocks-images--expand-link"
          target="_blank">
        </a>
      </div>

      [#if image.caption?has_content]
        <figcaption>
          ${image.caption}
        </figcaption>
      [/#if]
    </figure>
  [/#list]
</div>

