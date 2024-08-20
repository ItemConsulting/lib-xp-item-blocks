[#-- @ftlvariable name="id" type="String" --]
[#-- @ftlvariable name="title" type="String" --]
[#-- @ftlvariable name="text" type="String" --]
<div
  class="blocks-text html-area flow"
  [#if id?has_content]id="${id}"[/#if]>

  [#if title?has_content]
    <h2 class="blocks-text-title">${title}</h2>
  [/#if]

  [#if text?has_content]
    ${text}
  [/#if]
</div>

