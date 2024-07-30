[#-- @ftlvariable name="blocks" type="java.util.ArrayList" --]
[#-- @ftlvariable name="classes" type="String" --]
<div class="blocks ${classes!""}">
  [#list blocks![] as block]
    ${block}
  [/#list]
</div>
