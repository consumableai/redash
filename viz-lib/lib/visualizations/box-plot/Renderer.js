"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Renderer;

var _lodash = require("lodash");

var _d2 = _interopRequireDefault(require("d3"));

var _react = _interopRequireWildcard(require("react"));

var _resizeObserver = _interopRequireDefault(require("../../services/resizeObserver"));

var _propTypes = require("../prop-types");

var _d3box = _interopRequireDefault(require("./d3box"));

require("./renderer.less");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function calcIqr(k) {
  return d => {
    var q1 = d.quartiles[0];
    var q3 = d.quartiles[2];
    var iqr = (q3 - q1) * k;
    var i = -1;
    var j = d.length;
    i += 1;

    while (d[i] < q1 - iqr) {
      i += 1;
    }

    j -= 1;

    while (d[j] > q3 + iqr) {
      j -= 1;
    }

    return [i, j];
  };
}

function render(container, data, _ref) {
  var xAxisLabel = _ref.xAxisLabel,
      yAxisLabel = _ref.yAxisLabel;
  container = _d2.default.select(container);
  var containerBounds = container.node().getBoundingClientRect();
  var containerWidth = Math.floor(containerBounds.width);
  var containerHeight = Math.floor(containerBounds.height);
  var margin = {
    top: 10,
    right: 50,
    bottom: 40,
    left: 50,
    inner: 25
  };
  var width = containerWidth - margin.right - margin.left;
  var height = containerHeight - margin.top - margin.bottom;
  var min = Infinity;
  var max = -Infinity;
  var mydata = [];
  var value = 0;
  var d = [];
  var columns = (0, _lodash.map)(data.columns, col => col.name); // @ts-expect-error ts-migrate(2339) FIXME: Property 'scale' does not exist on type 'typeof im... Remove this comment to see the full error message

  var xscale = _d2.default.scale.ordinal().domain(columns).rangeBands([0, containerWidth - margin.left - margin.right]);

  var boxWidth;

  if (columns.length > 1) {
    boxWidth = Math.min(xscale(columns[1]), 120.0);
  } else {
    boxWidth = 120.0;
  }

  margin.inner = boxWidth / 3.0;
  (0, _lodash.each)(columns, (column, i) => {
    d = mydata[i] = [];
    (0, _lodash.each)(data.rows, row => {
      value = row[column];
      d.push(value);
      if (value > max) max = Math.ceil(value);
      if (value < min) min = Math.floor(value);
    });
  }); // @ts-expect-error ts-migrate(2339) FIXME: Property 'scale' does not exist on type 'typeof im... Remove this comment to see the full error message

  var yscale = _d2.default.scale.linear().domain([min * 0.99, max * 1.01]).range([height, 0]);

  var chart = (0, _d3box.default)().whiskers(calcIqr(1.5)) // @ts-expect-error ts-migrate(2339) FIXME: Property 'width' does not exist on type '{ (g: any... Remove this comment to see the full error message
  .width(boxWidth - 2 * margin.inner).height(height).domain([min * 0.99, max * 1.01]);

  var xAxis = _d2.default.svg // @ts-expect-error ts-migrate(2339) FIXME: Property 'axis' does not exist on type '(url: stri... Remove this comment to see the full error message
  .axis().scale(xscale).orient("bottom");

  var yAxis = _d2.default.svg // @ts-expect-error ts-migrate(2339) FIXME: Property 'axis' does not exist on type '(url: stri... Remove this comment to see the full error message
  .axis().scale(yscale).orient("left");

  var xLines = _d2.default.svg // @ts-expect-error ts-migrate(2339) FIXME: Property 'axis' does not exist on type '(url: stri... Remove this comment to see the full error message
  .axis().scale(xscale).tickSize(height).orient("bottom");

  var yLines = _d2.default.svg // @ts-expect-error ts-migrate(2339) FIXME: Property 'axis' does not exist on type '(url: stri... Remove this comment to see the full error message
  .axis().scale(yscale).tickSize(width).orient("right");

  function barOffset(i) {
    return xscale(columns[i]) + (xscale(columns[1]) - margin.inner) / 2.0;
  }

  container.selectAll("*").remove();
  var svg = container.append("svg").attr("width", containerWidth).attr("height", height + margin.bottom + margin.top);
  var plot = svg.append("g").attr("width", containerWidth - margin.left - margin.right).attr("transform", "translate(".concat(margin.left, ",").concat(margin.top, ")"));
  svg.append("text").attr("class", "box").attr("x", containerWidth / 2.0).attr("text-anchor", "middle").attr("y", height + margin.bottom).text(xAxisLabel);
  svg.append("text").attr("class", "box").attr("transform", "translate(10,".concat((height + margin.top + margin.bottom) / 2.0, ")rotate(-90)")).attr("text-anchor", "middle").text(yAxisLabel);
  plot.append("rect").attr("class", "grid-background").attr("width", width).attr("height", height);
  plot.append("g").attr("class", "grid").call(yLines);
  plot.append("g").attr("class", "grid").call(xLines);
  plot.append("g").attr("class", "x axis").attr("transform", "translate(0,".concat(height, ")")).call(xAxis);
  plot.append("g").attr("class", "y axis").call(yAxis);
  plot.selectAll(".box").data(mydata).enter().append("g").attr("class", "box").attr("width", boxWidth).attr("height", height).attr("transform", (_, i) => "translate(".concat(barOffset(i), ",", 0, ")")).call(chart);
}

function Renderer(_ref2) {
  var data = _ref2.data,
      options = _ref2.options;

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      container = _useState2[0],
      setContainer = _useState2[1];

  (0, _react.useEffect)(() => {
    if (container) {
      render(container, data, options);
      var unwatch = (0, _resizeObserver.default)(container, () => {
        render(container, data, options);
      });
      return unwatch;
    }
  }, [container, data, options]); // @ts-expect-error ts-migrate(2322) FIXME: Type 'Dispatch<SetStateAction<null>>' is not assig... Remove this comment to see the full error message

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "box-plot-deprecated-visualization-container",
    ref: setContainer
  });
}

Renderer.propTypes = _propTypes.RendererPropTypes;
//# sourceMappingURL=Renderer.js.map