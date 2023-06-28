"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = initChoropleth;

var _lodash = require("lodash");

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _leaflet = _interopRequireDefault(require("leaflet"));

require("leaflet/dist/leaflet.css");

require("leaflet-fullscreen");

require("leaflet-fullscreen/dist/leaflet.fullscreen.css");

var _valueFormat = require("../../../lib/value-format");

var _sanitize = _interopRequireDefault(require("../../../services/sanitize"));

var _resizeObserver = _interopRequireDefault(require("../../../services/resizeObserver"));

var _utils = require("./utils");

var _Legend = _interopRequireDefault(require("./Legend"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CustomControl = _leaflet.default.Control.extend({
  options: {
    position: "topright"
  },

  onAdd() {
    var div = document.createElement("div");
    div.className = "leaflet-bar leaflet-custom-toolbar";
    div.style.background = "#fff";
    div.style.backgroundClip = "padding-box";
    return div;
  },

  onRemove() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'getContainer' does not exist on type '{ ... Remove this comment to see the full error message
    _reactDom.default.unmountComponentAtNode(this.getContainer());
  }

});

function prepareLayer(_ref) {
  var feature = _ref.feature,
      layer = _ref.layer,
      data = _ref.data,
      options = _ref.options,
      limits = _ref.limits,
      colors = _ref.colors,
      formatValue = _ref.formatValue;
  var value = (0, _utils.getValueForFeature)(feature, data, options.targetField);
  var valueFormatted = formatValue(value);
  var featureData = (0, _utils.prepareFeatureProperties)(feature, valueFormatted, data, options.targetField);
  var color = (0, _utils.getColorByValue)(value, limits, colors, options.colors.noValue);
  layer.setStyle({
    color: options.colors.borders,
    weight: 1,
    fillColor: color,
    fillOpacity: 1
  });

  if (options.tooltip.enabled) {
    layer.bindTooltip((0, _sanitize.default)((0, _valueFormat.formatSimpleTemplate)(options.tooltip.template, featureData)), {
      sticky: true
    });
  }

  if (options.popup.enabled) {
    layer.bindPopup((0, _sanitize.default)((0, _valueFormat.formatSimpleTemplate)(options.popup.template, featureData)));
  }

  layer.on("mouseover", () => {
    layer.setStyle({
      weight: 2,
      fillColor: (0, _utils.darkenColor)(color)
    });
  });
  layer.on("mouseout", () => {
    layer.setStyle({
      weight: 1,
      fillColor: color
    });
  });
}

function validateBounds(bounds, fallbackBounds) {
  if (bounds) {
    bounds = _leaflet.default.latLngBounds(bounds[0], bounds[1]);

    if (bounds.isValid()) {
      return bounds;
    }
  }

  if (fallbackBounds && fallbackBounds.isValid()) {
    return fallbackBounds;
  }

  return null;
}

function initChoropleth(container, onBoundsChange) {
  var _map = _leaflet.default.map(container, {
    center: [0.0, 0.0],
    zoom: 1,
    zoomSnap: 0,
    scrollWheelZoom: false,
    maxBoundsViscosity: 1,
    attributionControl: false,
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ center: [number, number]; zoom... Remove this comment to see the full error message
    fullscreenControl: true
  });

  var _choropleth = null;

  var _legend = new CustomControl();

  function handleMapBoundsChange() {
    if ((0, _lodash.isFunction)(onBoundsChange)) {
      var bounds = _map.getBounds();

      onBoundsChange([// @ts-expect-error ts-migrate(2551) FIXME: Property '_southWest' does not exist on type 'LatL... Remove this comment to see the full error message
      [bounds._southWest.lat, bounds._southWest.lng], // @ts-expect-error ts-migrate(2551) FIXME: Property '_northEast' does not exist on type 'LatL... Remove this comment to see the full error message
      [bounds._northEast.lat, bounds._northEast.lng]]);
    }
  }

  var boundsChangedFromMap = false;

  var onMapMoveEnd = () => {
    handleMapBoundsChange();
  };

  _map.on("focus", () => {
    boundsChangedFromMap = true;

    _map.on("moveend", onMapMoveEnd);
  });

  _map.on("blur", () => {
    _map.off("moveend", onMapMoveEnd);

    boundsChangedFromMap = false;
  });

  function updateLayers(geoJson, data, options) {
    _map.eachLayer(layer => _map.removeLayer(layer));

    _map.removeControl(_legend); // @ts-expect-error ts-migrate(2339) FIXME: Property 'features' does not exist on type 'object... Remove this comment to see the full error message


    if (!(0, _lodash.isObject)(geoJson) || !(0, _lodash.isArray)(geoJson.features)) {
      _choropleth = null; // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'null' is not assignable to param... Remove this comment to see the full error message

      _map.setMaxBounds(null);

      return;
    } // @ts-expect-error ts-migrate(2339) FIXME: Property 'features' does not exist on type 'object... Remove this comment to see the full error message


    var _createScale = (0, _utils.createScale)(geoJson.features, data, options),
        limits = _createScale.limits,
        colors = _createScale.colors,
        legend = _createScale.legend;

    var formatValue = (0, _utils.createNumberFormatter)(options.valueFormat, options.noValuePlaceholder); // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'object' is not assignable to par... Remove this comment to see the full error message

    _choropleth = _leaflet.default.geoJSON(geoJson, {
      onEachFeature(feature, layer) {
        prepareLayer({
          feature,
          layer,
          data,
          options,
          limits,
          colors,
          formatValue
        });
      }

    }).addTo(_map);

    var mapBounds = _choropleth.getBounds();

    var bounds = validateBounds(options.bounds, mapBounds);

    _map.fitBounds(bounds, {
      animate: false,
      duration: 0
    }); // equivalent to `_map.setMaxBounds(mapBounds)` but without animation


    _map.options.maxBounds = mapBounds;

    _map.panInsideBounds(mapBounds, {
      animate: false,
      duration: 0
    }); // update legend


    if (options.legend.visible && legend.length > 0) {
      _legend.setPosition(options.legend.position.replace("-", ""));

      _map.addControl(_legend);

      _reactDom.default.render(
      /*#__PURE__*/
      // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
      _react.default.createElement(_Legend.default // @ts-expect-error ts-migrate(2322) FIXME: Type '{ text: any; color: any; limit: any; }[]' is... Remove this comment to see the full error message
      , {
        items: (0, _lodash.map)(legend, item => _objectSpread({}, item, {
          text: formatValue(item.limit)
        })),
        alignText: options.legend.alignText
      }), _legend.getContainer());
    }
  }

  function updateBounds(bounds) {
    if (!boundsChangedFromMap) {
      var layerBounds = _choropleth ? _choropleth.getBounds() : _map.getBounds();
      bounds = validateBounds(bounds, layerBounds);

      if (bounds) {
        _map.fitBounds(bounds, {
          animate: false,
          duration: 0
        });
      }
    }
  }

  var unwatchResize = (0, _resizeObserver.default)(container, () => {
    _map.invalidateSize(false);
  });
  return {
    updateLayers,
    updateBounds,

    destroy() {
      unwatchResize();

      _map.removeControl(_legend); // _map.remove() does not cleanup controls - bug in Leaflet?


      _map.remove();
    }

  };
}
//# sourceMappingURL=initChoropleth.js.map