[#-- @ftlvariable name="id" type="String" --]
[#-- @ftlvariable name="title" type="String" --]
[#-- @ftlvariable name="classes" type="String" --]
[#-- @ftlvariable name="items" type="java.util.ArrayList" --]

<div
  class="blocks-accordion${classes?has_content?string(' ${classes!""}', "")}"
  [#if id?has_content]id="${id}"[/#if]>
  [#if title?has_content]
    <h2>${title}</h2>
  [/#if]

  [#list items as item]
    <details-animated class="blocks-accordion-item">
      <details>
        <summary>
          <h3>${item.title}</h3>
        </summary>

        <div class="blocks-accordion--text flow html-area">
          ${item.text}
        </div>
      </details>
    </details-animated>
  [/#list]
</div>
