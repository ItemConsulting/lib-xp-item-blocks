[#-- @ftlvariable name="blocks" type="java.util.ArrayList" --]
[#-- @ftlvariable name="classes" type="String" --]
<div class="blocks${classes?has_content?string(" ${classes!''}", "")} content-grid">
  [#list blocks![] as block]
    ${block}
  [/#list]
</div>
