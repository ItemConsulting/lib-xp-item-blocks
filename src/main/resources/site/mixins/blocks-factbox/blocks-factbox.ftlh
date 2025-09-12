[#-- @ftlvariable name="locale" type="String" --]
[#-- @ftlvariable name="title" type="String" --]
[#-- @ftlvariable name="text" type="String" --]
[#-- @ftlvariable name="classes" type="String" --]

[#setting locale=locale]

<aside lang="${.lang}" class="blocks-factbox html-area flow ${classes!""} content-grid--breakout">
  [#if title?has_content]
    <h2>${title}</h2>
  [/#if]

  ${text?no_esc}
</aside>
