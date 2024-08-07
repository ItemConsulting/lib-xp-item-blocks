[#-- @ftlvariable name="text" type="String" --]
[#-- @ftlvariable name="author" type="String" --]
[#-- @ftlvariable name="publicationTitle" type="String" --]
[#-- @ftlvariable name="publicationUrl" type="String" --]
[#-- @ftlvariable name="image" type="java.util.HashMap" --]

<div class="blocks-quote">
  <blockquote${publicationUrl?has_content?string(' cite="${publicationUrl}"', '')}>
    <div class="blocks-quote--text">
      ${text}
    </div>

    [#if author?has_content || publicationTitle?has_content]
      <footer>
        [#if author?has_content]
          ${author}
        [/#if]

        [#if publicationTitle?has_content]
          <cite>${publicationTitle}</cite>
        [/#if]
      </footer>
    [/#if]
  </blockquote>

  [#if image?has_content]
    <figure>
      <img
        src="${image.src}"
        class="blocks-quote--image"
        alt="${image.altText!""}"
        [#if image.width?has_content]width="${image.width}"[/#if]
        [#if image.height?has_content]height="${image.height}"[/#if]>
    </figure>
  [/#if]
</div>

