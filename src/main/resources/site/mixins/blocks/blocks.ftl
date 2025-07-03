[#-- @ftlvariable name="blocks" type="java.util.ArrayList" --]
[#-- @ftlvariable name="classes" type="String" --]
<div class="${classes!"blocks content-grid"}">
  [#list blocks![] as block]
    ${block}
  [/#list]
</div>
