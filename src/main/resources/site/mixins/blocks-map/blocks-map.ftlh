[#-- @ftlvariable name="locale" type="java.lang.String" --]
[#-- @ftlvariable name="classes" type="java.lang.String" --]
[#-- @ftlvariable name="lng" type="java.lang.String" --]
[#-- @ftlvariable name="lat" type="java.lang.String" --]
[#-- @ftlvariable name="zoom" type="java.lang.String" --]
[#setting locale=locale]

<div class="blocks-map ${classes!}" lang="${.lang}">
  <script type="module" src="${assetBaseUrl}/blocks/maplibre-gl.mjs"></script>

  <maplibre-gl
    style="color: black;"
    lng="${lng}"
    lat="${lat}"
    zoom="${zoom}"
    workerSrc="${assetBaseUrl}/maplibre-gl/5.6.1/dist/maplibre-gl-csp-worker.js"
    styleSrc="${assetBaseUrl}/maplibre-gl/5.6.1/dist/maplibre-gl.css">

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
