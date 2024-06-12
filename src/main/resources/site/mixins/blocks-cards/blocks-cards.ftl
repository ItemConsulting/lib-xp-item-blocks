[#-- @ftlvariable name="title" type="String" --]
[#-- @ftlvariable name="classes" type="String" --]
[#-- @ftlvariable name="cards" type="java.util.ArrayList" --]
[#-- @ftlvariable name="link" type="no.item.blocks.Link" --]

<div class="blocks-cards${classes?has_content?string(' ${classes!""}', "")}">
  [#if title?has_content]
    <h2>${title}</h2>
  [/#if]

  <div class="blocks-cards--cards">
    [#list cards as card]
      [@cardItem card=card /]
    [/#list]
  </div>

  [#if link?has_content]
    <a
      href="${link.url}"
      class="blocks-cards--link">

      ${link.text}
    </a>
  [/#if]
</div>

[#macro cardItem card]
  <a
    href="${card.url}"
    class="blocks-cards--card${card.classes?has_content?string(' ${card.classes!""}', "")}">

    [#if card.imageSrc?has_content]
      <img
        src="${card.imageSrc}"
        alt=""
        class="blocks-cards--image"
      />
    [/#if]

    <div class="blocks-cards--body">
      [#if card.label?has_content]
        <div class="blocks-cards--kicker">
          ${card.kicker}
        </div>
      [/#if]

      <h3 class="blocks-cards--title">
        ${card.title}
      </h3>

      <div class="blocks-cards--text">
        ${card.text}
      </div>
    </div>
  </a>
[/#macro]
