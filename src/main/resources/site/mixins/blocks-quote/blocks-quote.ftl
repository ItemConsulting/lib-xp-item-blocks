[#-- @ftlvariable name="text" type="String" --]
[#-- @ftlvariable name="author" type="String" --]
[#-- @ftlvariable name="publicationTitle" type="String" --]
[#-- @ftlvariable name="publicationUrl" type="String" --]

<div class="blocks-quote">
  <blockquote${publicationUrl?has_content?string(' cite="${publicationUrl}"', '')}>
    <div class="blocks-quote--text">
      ${text}
    </div>

    [#if author?has_content || publicationTitle?has_content]
      <footer>
        &mdash;
        [#if author?has_content]
          ${author}
        [/#if]

        [#if publicationTitle?has_content]
          <cite>${publicationTitle}</cite>
        [/#if]
      </footer>
    [/#if]
  </blockquote>

  <figure>
    <img
      src="tomaj.jpeg"
      class="blocks-quote--image"
      alt="">
  </figure>
</div>

