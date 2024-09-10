[#macro render card]
  <div class="blocks-card ${card.classes!''}">
    [@linkOrDiv href=card.url!"" class="blocks-card--card"]
      [#if card.image?has_content]
        <figure class="blocks-card--image">
          <img
            src="${card.image.src}"
            alt="${card.image.altText!""}"
            [#if card.image.width?has_content]width="${card.image.width}"[/#if]
            [#if card.image.height?has_content]height="${card.image.height}"[/#if]
          />
        </figure>
      [/#if]

      [#if card.kicker?has_content || card.title?has_content || card.text?has_content]
        <div class="blocks-card--body html-area">
          [#if card.kicker?has_content]
            <small class="blocks-card--kicker">
              ${card.kicker}
            </small>
          [/#if]

          [#if card.title?has_content]
            <h3 class="blocks-card--title">
              ${card.title}
            </h3>
          [/#if]

          [#if card.text?has_content]
            <div class="blocks-card--text flow">
              ${card.text}
            </div>
          [/#if]
        </div>
      [/#if]
    [/@linkOrDiv]
  </div>
[/#macro]

[#macro linkOrDiv href class]
  [#if href?has_content]
    <a href="${href}" class="${class}">
      [#nested]
    </a>
  [#else]
    <div class="${class}">
      [#nested]
    </div>
  [/#if]
[/#macro]
