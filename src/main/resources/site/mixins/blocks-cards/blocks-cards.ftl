[#-- @ftlvariable name="title" type="String" --]
[#-- @ftlvariable name="classes" type="String" --]
[#-- @ftlvariable name="items" type="java.util.ArrayList<String>" --]
[#-- @ftlvariable name="link" type="no.item.blocks.Link" --]

<div class="blocks-cards${classes?has_content?string(' ${classes!""}', "")}">
  [#if title?has_content]
    <h2>${title}</h2>
  [/#if]

  <div class="blocks-cards--cards">
    [#list items as item]
      ${item}
    [/#list]
  </div>

  [#if link?has_content]
    <div class="blocks-cards--actions">
      <a
        href="${link.url}"
        class="blocks-cards--link">

        ${link.text}
      </a>
    </div>
  [/#if]
</div>
