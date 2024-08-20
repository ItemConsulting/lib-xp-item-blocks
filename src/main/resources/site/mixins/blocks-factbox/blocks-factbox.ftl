[#-- @ftlvariable name="title" type="String" --]
[#-- @ftlvariable name="text" type="String" --]
[#-- @ftlvariable name="classes" type="String" --]
<aside class="blocks-factbox html-area flow ${classes!""}">
  [#if title?has_content]
    <h2>${title}</h2>
  [/#if]

  ${text}
</aside>
