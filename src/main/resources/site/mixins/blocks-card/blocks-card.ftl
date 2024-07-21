[#macro render card]
  <div class="blocks-card">
    [@linkOrDiv href=card.url class="blocks-card--card ${card.classes!''}"]
      [#if card.imageSrc?has_content]
        <figure class="blocks-card--image">
          <img
            src="${card.imageSrc}"
            alt=""
          />
        </figure>
      [/#if]

      [#if card.kicker?has_content || card.title?has_content || card.text?has_content]
        <div class="blocks-card--body">
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
            <div class="blocks-card--text">
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
