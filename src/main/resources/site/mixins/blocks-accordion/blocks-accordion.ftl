[#-- @ftlvariable name="classes" type="String" --]
[#-- @ftlvariable name="items" type="java.util.ArrayList" --]

<div class="blocks-accordion${classes?has_content?string(' ${classes!""}', "")}">
  [#list items as item]
    <details-animated class="blocks-accordion-item">
      <details>
        <summary>
          <h3>${item.title}</h3>
        </summary>

        <div class="blocks-accordion--text html-area">
          ${item.text}
        </div>
      </details>
    </details-animated>
  [/#list]
</div>
