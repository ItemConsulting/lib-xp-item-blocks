[#-- @ftlvariable name="locale" type="java.lang.String" --]
[#-- @ftlvariable name="classes" type="java.lang.String" --]
[#-- @ftlvariable name="lng" type="java.lang.String" --]
[#-- @ftlvariable name="lat" type="java.lang.String" --]
[#-- @ftlvariable name="zoom" type="java.lang.String" --]
[#-- @ftlvariable name="markers" type="java.util.List" --]
[#-- @ftlvariable name="workerSrc" type="java.lang.String" --]
[#-- @ftlvariable name="styleSrc" type="java.lang.String" --]
[#setting locale=locale]

<div class="blocks-map ${classes!}" lang="${.lang}">
  <maplibre-gl
    lng="${lng}"
    lat="${lat}"
    zoom="${zoom}"
    workerSrc="${workerSrc}"
    styleSrc="${styleSrc}">

    [#list markers as marker]
      <div
        class="marker"
        data-lng="${marker.lng}"
        data-lat="${marker.lat}">

        ${marker.text?no_esc}
      </div>
    [/#list]
  </maplibre-gl>
</div>
