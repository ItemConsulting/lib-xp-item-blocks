<#-- @ftlvariable name="locale" type="String" -->
<#-- @ftlvariable name="text" type="String" -->
<#-- @ftlvariable name="author" type="String" -->
<#-- @ftlvariable name="publicationTitle" type="String" -->
<#-- @ftlvariable name="publicationUrl" type="String" -->
<#-- @ftlvariable name="image" type="java.util.HashMap" -->

<#setting locale=locale>

<div lang="${.lang}" class="blocks-quote">
  <blockquote
    <#if publicationUrl??>cite="${publicationUrl}"</#if>
  >

    <div class="blocks-quote--text">
      ${text?no_esc}
    </div>

    <#if author?has_content || publicationTitle?has_content>
      <footer>
        <#if author?has_content>
          ${author}
        </#if>

        <#if publicationTitle?has_content>
          <cite>${publicationTitle}</cite>
        </#if>
      </footer>
    </#if>
  </blockquote>

  <#if image??>
    <figure>
      <img
        src="${image.src}"
        class="blocks-quote--image"
        alt="${image.altText!""}"
        <#if image.width??>width="${image.width}"</#if>
        <#if image.height??>height="${image.height}"</#if>
      >
    </figure>
  </#if>
</div>

