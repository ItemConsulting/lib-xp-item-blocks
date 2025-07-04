[#-- @ftlvariable name="blocks" type="java.util.List<String>" --]
[#-- @ftlvariable name="classes" type="String" --]
[#-- @ftlvariable name="blockTypes" type="java.util.List<String>" --]
<div class="${classes!"blocks content-grid"}">
  [#list blocks![] as block]
    ${block}
  [/#list]
</div>
