<#-- @ftlvariable name="locale" type="String" -->
<#-- @ftlvariable name="text" type="String" -->
<#-- @ftlvariable name="author" type="String" -->
<#-- @ftlvariable name="image" type="java.util.HashMap" -->

<#setting locale=locale>

<div
  lang="${.lang}"
  class="blocks-quote">

  <blockquote>
    <div class="blocks-quote__text html-area">
      ${text?no_esc}
    </div>

    <#if author?has_content>
      <footer>
        ${author}
      </footer>
    </#if>
  </blockquote>

  <#if image??>
    <figure>
      <img
        src="${image.src}"
        class="blocks-quote__image"
        alt="${image.altText!""}"
        <#if image.width??>width="${image.width}"</#if>
        <#if image.height??>height="${image.height}"</#if>
      >
    </figure>
  </#if>
</div>

