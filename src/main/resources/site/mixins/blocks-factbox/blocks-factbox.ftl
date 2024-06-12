[#-- @ftlvariable name="title" type="String" --]
[#-- @ftlvariable name="text" type="String" --]
<div class="blocks-factbox html-area flow ${themeClass!""}">
  <h2>${title}</h2>

  [@processHtml value=text /]
</div>
