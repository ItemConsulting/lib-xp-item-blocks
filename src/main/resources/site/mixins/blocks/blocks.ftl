[#-- @ftlvariable name="blocks" type="java.util.ArrayList" --]
[#-- @ftlvariable name="classes" type="String" --]
<div class="blocks${classes?has_content?string(" ${classes!''}", "")}">
  [#list blocks![] as block]
    ${block}
  [/#list]
</div>
