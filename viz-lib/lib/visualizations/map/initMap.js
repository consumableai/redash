"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = initMap;

var _lodash = require("lodash");

var _chromaJs = _interopRequireDefault(require("chroma-js"));

var _leaflet = _interopRequireDefault(require("leaflet"));

require("leaflet.markercluster");

require("leaflet/dist/leaflet.css");

require("leaflet.markercluster/dist/MarkerCluster.css");

require("leaflet.markercluster/dist/MarkerCluster.Default.css");

require("beautifymarker");

require("beautifymarker/leaflet-beautify-marker-icon.css");

var _markerIcon = _interopRequireDefault(require("leaflet/dist/images/marker-icon.png"));

var _markerIcon2x = _interopRequireDefault(require("leaflet/dist/images/marker-icon-2x.png"));

var _markerShadow = _interopRequireDefault(require("leaflet/dist/images/marker-shadow.png"));

require("leaflet-fullscreen");

require("leaflet-fullscreen/dist/leaflet.fullscreen.css");

var _valueFormat = require("../../lib/value-format");

var _sanitize = _interopRequireDefault(require("../../services/sanitize"));

var _resizeObserver = _interopRequireDefault(require("../../services/resizeObserver"));

var _chooseTextColorForBackground = _interopRequireDefault(require("../../lib/chooseTextColorForBackground"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'leaflet/dist/images/marker-ico... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'leaflet/dist/images/marker-ico... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'leaflet/dist/images/marker-sha... Remove this comment to see the full error message
// This is a workaround for an issue with giving Leaflet load the icon on its own.
_leaflet.default.Icon.Default.mergeOptions({
  iconUrl: _markerIcon.default,
  iconRetinaUrl: _markerIcon2x.default,
  shadowUrl: _markerShadow.default
}); // @ts-expect-error ts-migrate(2339) FIXME: Property '_getIconUrl' does not exist on type 'Def... Remove this comment to see the full error message


delete _leaflet.default.Icon.Default.prototype._getIconUrl;
var iconAnchors = {
  marker: [14, 32],
  circle: [10, 10],
  rectangle: [11, 11],
  "circle-dot": [1, 2],
  "rectangle-dot": [1, 2],
  doughnut: [8, 8]
};
var popupAnchors = {
  rectangle: [0, -3],
  circle: [1, -3]
};

var createHeatpointMarker = (lat, lon, color) => _leaflet.default.circleMarker([lat, lon], {
  fillColor: color,
  fillOpacity: 0.9,
  stroke: false
}); // @ts-expect-error ts-migrate(2339) FIXME: Property 'MarkerClusterIcon' does not exist on typ... Remove this comment to see the full error message


_leaflet.default.MarkerClusterIcon = _leaflet.default.DivIcon.extend({
  options: {
    color: null,
    className: "marker-cluster",
    iconSize: new _leaflet.default.Point(40, 40)
  },

  // @ts-expect-error ts-migrate(7019) FIXME: Rest parameter 'args' implicitly has an 'any[]' ty... Remove this comment to see the full error message
  createIcon() {
    var color = (0, _chromaJs.default)(this.options.color);
    var textColor = (0, _chooseTextColorForBackground.default)(color);
    var borderColor = color.alpha(0.4).css();
    var backgroundColor = color.alpha(0.8).css();

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var icon = _leaflet.default.DivIcon.prototype.createIcon.call(this, ...args);

    icon.innerHTML = "\n      <div style=\"background: ".concat(backgroundColor, "\">\n        <span style=\"color: ").concat(textColor, "\">").concat((0, _lodash.toString)(this.options.html), "</span>\n      </div>\n    ");
    icon.style.background = borderColor;
    return icon;
  }

}); // @ts-expect-error ts-migrate(2339) FIXME: Property 'markerClusterIcon' does not exist on typ... Remove this comment to see the full error message

_leaflet.default.markerClusterIcon = function () {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return new _leaflet.default.MarkerClusterIcon(...args);
};

function createIconMarker(lat, lon, _ref) {
  var iconShape = _ref.iconShape,
      iconFont = _ref.iconFont,
      foregroundColor = _ref.foregroundColor,
      backgroundColor = _ref.backgroundColor,
      borderColor = _ref.borderColor;

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'BeautifyIcon' does not exist on type 'ty... Remove this comment to see the full error message
  var icon = _leaflet.default.BeautifyIcon.icon({
    iconShape,
    icon: iconFont,
    iconSize: iconShape === "rectangle" ? [22, 22] : false,
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    iconAnchor: iconAnchors[iconShape],
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    popupAnchor: popupAnchors[iconShape],
    prefix: "fa",
    textColor: foregroundColor,
    backgroundColor,
    borderColor
  });

  return _leaflet.default.marker([lat, lon], {
    icon
  });
}

function createMarkerClusterGroup(color) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'markerClusterGroup' does not exist on ty... Remove this comment to see the full error message
  return _leaflet.default.markerClusterGroup({
    iconCreateFunction(cluster) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'markerClusterIcon' does not exist on typ... Remove this comment to see the full error message
      return _leaflet.default.markerClusterIcon({
        color,
        html: cluster.getChildCount()
      });
    }

  });
}

function createMarkersLayer(options, _ref2) {
  var color = _ref2.color,
      points = _ref2.points;
  var classify = options.classify,
      clusterMarkers = options.clusterMarkers,
      customizeMarkers = options.customizeMarkers;
  var result = clusterMarkers ? createMarkerClusterGroup(color) : _leaflet.default.featureGroup(); // create markers

  (0, _lodash.each)(points, (_ref3) => {
    var lat = _ref3.lat,
        lon = _ref3.lon,
        row = _ref3.row;
    var rowCopy = (0, _lodash.clone)(row);
    rowCopy[options.latColName] = lat;
    rowCopy[options.lonColName] = lon;
    var marker;

    if (classify) {
      marker = createHeatpointMarker(lat, lon, color);
    } else {
      if (customizeMarkers) {
        marker = createIconMarker(lat, lon, options);
      } else {
        marker = _leaflet.default.marker([lat, lon]);
      }
    }

    if (options.tooltip.enabled) {
      if (options.tooltip.template !== "") {
        marker.bindTooltip((0, _sanitize.default)((0, _valueFormat.formatSimpleTemplate)(options.tooltip.template, rowCopy)));
      } else {
        marker.bindTooltip("\n          <strong>".concat(lat, ", ").concat(lon, "</strong>\n        "));
      }
    }

    if (options.popup.enabled) {
      if (options.popup.template !== "") {
        marker.bindPopup((0, _sanitize.default)((0, _valueFormat.formatSimpleTemplate)(options.popup.template, rowCopy)));
      } else {
        marker.bindPopup("\n          <ul style=\"list-style-type: none; padding-left: 0\">\n            <li><strong>".concat(lat, ", ").concat(lon, "</strong>\n            ").concat((0, _lodash.map)(row, (v, k) => "<li>".concat(k, ": ").concat(v, "</li>")).join(""), "\n          </ul>\n        "));
      }
    }

    result.addLayer(marker);
  });
  return result;
}

function initMap(container) {
  var _map = _leaflet.default.map(container, {
    center: [0.0, 0.0],
    zoom: 1,
    scrollWheelZoom: false,
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ center: [number, number]; zoom... Remove this comment to see the full error message
    fullscreenControl: true
  });

  var _tileLayer = _leaflet.default.tileLayer("//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(_map);

  var _markerLayers = _leaflet.default.featureGroup().addTo(_map);

  var _layersControls = _leaflet.default.control.layers().addTo(_map);

  var onBoundsChange = () => {};

  var boundsChangedFromMap = false;

  var onMapMoveEnd = () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 1.
    onBoundsChange(_map.getBounds());
  };

  _map.on("focus", () => {
    boundsChangedFromMap = true;

    _map.on("moveend", onMapMoveEnd);
  });

  _map.on("blur", () => {
    _map.off("moveend", onMapMoveEnd);

    boundsChangedFromMap = false;
  });

  function updateLayers(groups, options) {
    _tileLayer.setUrl(options.mapTileUrl);

    _markerLayers.eachLayer(layer => {
      _markerLayers.removeLayer(layer);

      _layersControls.removeLayer(layer);
    });

    (0, _lodash.each)(groups, group => {
      var layer = createMarkersLayer(options, group);

      _markerLayers.addLayer(layer);

      _layersControls.addOverlay(layer, group.name);
    }); // hide layers control if it is empty

    if (groups.length > 0) {
      _layersControls.addTo(_map);
    } else {
      _layersControls.remove();
    }
  }

  function updateBounds(bounds) {
    if (!boundsChangedFromMap) {
      bounds = bounds ? _leaflet.default.latLngBounds([bounds._southWest.lat, bounds._southWest.lng], [bounds._northEast.lat, bounds._northEast.lng]) : _markerLayers.getBounds();

      if (bounds.isValid()) {
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
    get onBoundsChange() {
      return onBoundsChange;
    },

    set onBoundsChange(value) {
      onBoundsChange = (0, _lodash.isFunction)(value) ? value : () => {};
    },

    updateLayers,
    updateBounds,

    destroy() {
      unwatchResize();

      _map.remove();
    }

  };
}
//# sourceMappingURL=initMap.js.map