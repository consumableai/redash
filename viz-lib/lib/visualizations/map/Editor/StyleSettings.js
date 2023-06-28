"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = StyleSettings;

var _lodash = require("lodash");

var _react = _interopRequireWildcard(require("react"));

var _useDebounce = require("use-debounce");

var _editor = require("../../../components/visualizations/editor");

var _propTypes = require("../../prop-types");

var _ColorPalette = _interopRequireDefault(require("../../ColorPalette"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var mapTiles = [{
  name: "OpenStreetMap",
  url: "//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
}, {
  name: "OpenStreetMap BW",
  url: "//{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
}, {
  name: "OpenStreetMap DE",
  url: "//{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
}, {
  name: "OpenStreetMap FR",
  url: "//{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
}, {
  name: "OpenStreetMap Hot",
  url: "//{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
}, {
  name: "Thunderforest",
  url: "//{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png"
}, {
  name: "Thunderforest Spinal",
  url: "//{s}.tile.thunderforest.com/spinal-map/{z}/{x}/{y}.png"
}, {
  name: "OpenMapSurfer",
  url: "//korona.geog.uni-heidelberg.de/tiles/roads/x={x}&y={y}&z={z}"
}, {
  name: "Stamen Toner",
  url: "//stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png"
}, {
  name: "Stamen Toner Background",
  url: "//stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.png"
}, {
  name: "Stamen Toner Lite",
  url: "//stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.png"
}, {
  name: "OpenTopoMap",
  url: "//{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
}];

var CustomColorPalette = _objectSpread({
  White: "#ffffff"
}, _ColorPalette.default);

function getCustomIconOptionFields(iconShape) {
  switch (iconShape) {
    case "doughnut":
      return {
        showIcon: false,
        showBackgroundColor: true,
        showBorderColor: true
      };

    case "circle-dot":
    case "rectangle-dot":
      return {
        showIcon: false,
        showBackgroundColor: false,
        showBorderColor: true
      };

    default:
      return {
        showIcon: true,
        showBackgroundColor: true,
        showBorderColor: true
      };
  }
}

function StyleSettings(_ref) {
  var options = _ref.options,
      onOptionsChange = _ref.onOptionsChange;

  var _useDebouncedCallback = (0, _useDebounce.useDebouncedCallback)(onOptionsChange, 200),
      _useDebouncedCallback2 = _slicedToArray(_useDebouncedCallback, 1),
      debouncedOnOptionsChange = _useDebouncedCallback2[0];

  var _useMemo = (0, _react.useMemo)(() => getCustomIconOptionFields(options.iconShape), [options.iconShape]),
      showIcon = _useMemo.showIcon,
      showBackgroundColor = _useMemo.showBackgroundColor,
      showBorderColor = _useMemo.showBorderColor;

  var isCustomMarkersStyleAllowed = (0, _lodash.isNil)(options.classify);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Select, {
    label: "Map Tiles",
    "data-test": "Map.Editor.Tiles",
    value: options.mapTileUrl,
    onChange: mapTileUrl => onOptionsChange({
      mapTileUrl
    })
  }, (0, _lodash.map)(mapTiles, (_ref2) => {
    var name = _ref2.name,
        url = _ref2.url;
    return (
      /*#__PURE__*/
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
      _react.default.createElement(_editor.Select.Option, {
        key: url,
        "data-test": "Map.Editor.Tiles." + name
      }, name)
    );
  }))), /*#__PURE__*/_react.default.createElement(_editor.Section.Title, null, "Markers"), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Checkbox, {
    "data-test": "Map.Editor.ClusterMarkers",
    defaultChecked: options.clusterMarkers,
    onChange: event => onOptionsChange({
      clusterMarkers: event.target.checked
    })
  }, "Cluster Markers")), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Checkbox, {
    "data-test": "Map.Editor.CustomizeMarkers",
    disabled: !isCustomMarkersStyleAllowed,
    defaultChecked: options.customizeMarkers,
    onChange: event => onOptionsChange({
      customizeMarkers: event.target.checked
    })
  }, "Override default style"), !isCustomMarkersStyleAllowed &&
  /*#__PURE__*/
  // @ts-expect-error ts-migrate(2746) FIXME: This JSX tag's 'children' prop expects a single ch... Remove this comment to see the full error message
  _react.default.createElement(_editor.ContextHelp, {
    placement: "topLeft",
    arrowPointAtCenter: true
  }, "Custom marker styles are not available", /*#__PURE__*/_react.default.createElement("br", null), "when ", /*#__PURE__*/_react.default.createElement("b", null, "Group By"), " column selected.")), isCustomMarkersStyleAllowed && options.customizeMarkers && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Select, {
    layout: "horizontal",
    label: "Shape",
    "data-test": "Map.Editor.MarkerShape",
    value: options.iconShape,
    onChange: iconShape => onOptionsChange({
      iconShape
    })
  }, /*#__PURE__*/_react.default.createElement(_editor.Select.Option, {
    key: "marker",
    "data-test": "Map.Editor.MarkerShape.marker"
  }, "Marker + Icon"), /*#__PURE__*/_react.default.createElement(_editor.Select.Option, {
    key: "doughnut",
    "data-test": "Map.Editor.MarkerShape.doughnut"
  }, "Circle"), /*#__PURE__*/_react.default.createElement(_editor.Select.Option, {
    key: "circle-dot",
    "data-test": "Map.Editor.MarkerShape.circle-dot"
  }, "Circle Dot"), /*#__PURE__*/_react.default.createElement(_editor.Select.Option, {
    key: "circle",
    "data-test": "Map.Editor.MarkerShape.circle"
  }, "Circle + Icon"), /*#__PURE__*/_react.default.createElement(_editor.Select.Option, {
    key: "rectangle-dot",
    "data-test": "Map.Editor.MarkerShape.rectangle-dot"
  }, "Square Dot"), /*#__PURE__*/_react.default.createElement(_editor.Select.Option, {
    key: "rectangle",
    "data-test": "Map.Editor.MarkerShape.rectangle"
  }, "Square + Icon"))), showIcon &&
  /*#__PURE__*/
  // @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message
  _react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Input, {
    layout: "horizontal",
    label: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, "Icon", /*#__PURE__*/_react.default.createElement(_editor.ContextHelp, {
      placement: "topLeft",
      arrowPointAtCenter: true
    }, /*#__PURE__*/_react.default.createElement("div", {
      style: {
        marginBottom: 5
      }
    }, "Enter an icon name from", " ", /*#__PURE__*/_react.default.createElement("a", {
      href: "https://fontawesome.com/v4.7.0/icons/",
      target: "_blank",
      rel: "noopener noreferrer"
    }, "Font-Awesome 4.7")), /*#__PURE__*/_react.default.createElement("div", {
      style: {
        marginBottom: 5
      }
    }, "Examples: ", /*#__PURE__*/_react.default.createElement("code", null, "check"), ", ", /*#__PURE__*/_react.default.createElement("code", null, "times-circle"), ", ", /*#__PURE__*/_react.default.createElement("code", null, "flag")), /*#__PURE__*/_react.default.createElement("div", null, "Leave blank to remove."))),
    "data-test": "Map.Editor.MarkerIcon",
    defaultValue: options.iconFont,
    onChange: event => debouncedOnOptionsChange({
      iconFont: event.target.value
    })
  })), showIcon &&
  /*#__PURE__*/
  // @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message
  _react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.ColorPicker, {
    layout: "horizontal",
    label: "Icon Color",
    interactive: true,
    presetColors: CustomColorPalette,
    placement: "topRight",
    color: options.foregroundColor,
    triggerProps: {
      "data-test": "Map.Editor.MarkerIconColor"
    },
    onChange: foregroundColor => onOptionsChange({
      foregroundColor
    }) // @ts-expect-error ts-migrate(2339) FIXME: Property 'Label' does not exist on type '({ classN... Remove this comment to see the full error message
    ,
    addonAfter: /*#__PURE__*/_react.default.createElement(_editor.ColorPicker.Label, {
      color: options.foregroundColor,
      presetColors: CustomColorPalette
    })
  })), showBackgroundColor &&
  /*#__PURE__*/
  // @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message
  _react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.ColorPicker, {
    layout: "horizontal",
    label: "Background Color",
    interactive: true,
    presetColors: CustomColorPalette,
    placement: "topRight",
    color: options.backgroundColor,
    triggerProps: {
      "data-test": "Map.Editor.MarkerBackgroundColor"
    },
    onChange: backgroundColor => onOptionsChange({
      backgroundColor
    }) // @ts-expect-error ts-migrate(2339) FIXME: Property 'Label' does not exist on type '({ classN... Remove this comment to see the full error message
    ,
    addonAfter: /*#__PURE__*/_react.default.createElement(_editor.ColorPicker.Label, {
      color: options.backgroundColor,
      presetColors: CustomColorPalette
    })
  })), showBorderColor &&
  /*#__PURE__*/
  // @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message
  _react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.ColorPicker, {
    layout: "horizontal",
    label: "Border Color",
    interactive: true,
    presetColors: CustomColorPalette,
    placement: "topRight",
    color: options.borderColor,
    triggerProps: {
      "data-test": "Map.Editor.MarkerBorderColor"
    },
    onChange: borderColor => onOptionsChange({
      borderColor
    }) // @ts-expect-error ts-migrate(2339) FIXME: Property 'Label' does not exist on type '({ classN... Remove this comment to see the full error message
    ,
    addonAfter: /*#__PURE__*/_react.default.createElement(_editor.ColorPicker.Label, {
      color: options.borderColor,
      presetColors: CustomColorPalette
    })
  }))));
}

StyleSettings.propTypes = _propTypes.EditorPropTypes;
//# sourceMappingURL=StyleSettings.js.map