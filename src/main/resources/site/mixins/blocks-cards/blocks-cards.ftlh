[#-- @ftlvariable name="locale" type="String" --]
[#-- @ftlvariable name="title" type="String" --]
[#-- @ftlvariable name="classes" type="String" --]
[#-- @ftlvariable name="cardsMarkup" type="String" --]
[#-- @ftlvariable name="link.url" type="String" --]
[#-- @ftlvariable name="link.text" type="String" --]

[#setting locale=locale]

<div lang="${.lang}" class="blocks-cards${classes?has_content?string(' ${classes!""}', "")}">
  [#if title?has_content]
    <h2>${title}</h2>
  [/#if]

  <div class="blocks-cards--cards">
    ${cardsMarkup?no_esc}
  </div>

  [#if link?has_content]
    <div class="blocks-cards--actions">
      <a
        href="${link.url}"
        class="blocks-cards--link">

        ${link.text}
      </a>
    </div>
  [/#if]
</div>
