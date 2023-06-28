"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDefaultVisualization = getDefaultVisualization;
exports.newVisualization = newVisualization;
exports.default = void 0;

var _lodash = require("lodash");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _boxPlot = _interopRequireDefault(require("./box-plot"));

var _chart = _interopRequireDefault(require("./chart"));

var _choropleth = _interopRequireDefault(require("./choropleth"));

var _cohort = _interopRequireDefault(require("./cohort"));

var _counter = _interopRequireDefault(require("./counter"));

var _details = _interopRequireDefault(require("./details"));

var _funnel = _interopRequireDefault(require("./funnel"));

var _map = _interopRequireDefault(require("./map"));

var _pivot = _interopRequireDefault(require("./pivot"));

var _sankey = _interopRequireDefault(require("./sankey"));

var _sunburst = _interopRequireDefault(require("./sunburst"));

var _table = _interopRequireDefault(require("./table"));

var _wordCloud = _interopRequireDefault(require("./word-cloud"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// @ts-expect-error ts-migrate(2322) FIXME: Type 'Requireable<InferProps<{ type: Validator<str... Remove this comment to see the full error message
var VisualizationConfig = _propTypes.default.shape({
  type: _propTypes.default.string.isRequired,
  name: _propTypes.default.string.isRequired,
  getOptions: _propTypes.default.func.isRequired,
  isDefault: _propTypes.default.bool,
  isDeprecated: _propTypes.default.bool,
  Renderer: _propTypes.default.func.isRequired,
  Editor: _propTypes.default.func,
  // other config options
  autoHeight: _propTypes.default.bool,
  defaultRows: _propTypes.default.number,
  defaultColumns: _propTypes.default.number,
  minRows: _propTypes.default.number,
  maxRows: _propTypes.default.number,
  minColumns: _propTypes.default.number,
  maxColumns: _propTypes.default.number
});

var registeredVisualizations = {};

function validateVisualizationConfig(config) {
  var typeSpecs = {
    config: VisualizationConfig
  };
  var values = {
    config
  };

  _propTypes.default.checkPropTypes(typeSpecs, values, "prop", "registerVisualization");
}

function registerVisualization(config) {
  validateVisualizationConfig(config);
  config = _objectSpread({
    Editor: () => null
  }, config, {
    isDefault: config.isDefault && !config.isDeprecated
  }); // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message

  if (registeredVisualizations[config.type]) {
    throw new Error("Visualization ".concat(config.type, " already registered."));
  } // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message


  registeredVisualizations[config.type] = config;
}

(0, _lodash.each)((0, _lodash.flatten)([_boxPlot.default, _chart.default, _choropleth.default, _cohort.default, _counter.default, _details.default, _funnel.default, _map.default, _pivot.default, _sankey.default, _sunburst.default, _table.default, _wordCloud.default]), registerVisualization);
var _default = registeredVisualizations;
exports.default = _default;

function getDefaultVisualization() {
  // return any visualization explicitly marked as default, or any non-deprecated otherwise
  return (// @ts-expect-error ts-migrate(2339) FIXME: Property 'isDefault' does not exist on type 'never... Remove this comment to see the full error message
    (0, _lodash.find)(registeredVisualizations, visualization => visualization.isDefault) || // @ts-expect-error ts-migrate(2339) FIXME: Property 'isDeprecated' does not exist on type 'ne... Remove this comment to see the full error message
    (0, _lodash.find)(registeredVisualizations, visualization => !visualization.isDeprecated)
  );
}

function newVisualization() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  // @ts-expect-error ts-migrate(2538) FIXME: Type 'null' cannot be used as an index type.
  var visualization = type ? registeredVisualizations[type] : getDefaultVisualization();
  return {
    type: visualization.type,
    name: visualization.name,
    description: "",
    options
  };
}
//# sourceMappingURL=registeredVisualizations.js.map