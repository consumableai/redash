"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPieDimensions = getPieDimensions;
exports.default = preparePieData;

var _lodash = require("lodash");

var _d = _interopRequireDefault(require("d3"));

var _chooseTextColorForBackground = _interopRequireDefault(require("../../../lib/chooseTextColorForBackground"));

var _ColorPalette = require("../../ColorPalette");

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getPieDimensions(series) {
  var rows = series.length > 2 ? 2 : 1;
  var cellsInRow = Math.ceil(series.length / rows);
  var cellWidth = 1 / cellsInRow;
  var cellHeight = 1 / rows;
  var xPadding = 0.02;
  var yPadding = 0.1;
  return {
    rows,
    cellsInRow,
    cellWidth,
    cellHeight,
    xPadding,
    yPadding
  };
}

function getPieHoverInfoPattern(options) {
  var hasX = /{{\s*@@x\s*}}/.test(options.textFormat);
  var result = "text";
  if (!hasX) result += "+label";
  return result;
}

function prepareSeries(series, options, additionalOptions) {
  var cellWidth = additionalOptions.cellWidth,
      cellHeight = additionalOptions.cellHeight,
      xPadding = additionalOptions.xPadding,
      yPadding = additionalOptions.yPadding,
      cellsInRow = additionalOptions.cellsInRow,
      hasX = additionalOptions.hasX,
      index = additionalOptions.index,
      hoverInfoPattern = additionalOptions.hoverInfoPattern,
      getValueColor = additionalOptions.getValueColor;
  var seriesOptions = (0, _lodash.extend)({
    type: options.globalSeriesType,
    yAxis: 0
  }, options.seriesOptions[series.name]);
  var xPosition = index % cellsInRow * cellWidth;
  var yPosition = Math.floor(index / cellsInRow) * cellHeight;
  var labels = [];
  var values = [];
  var sourceData = new Map();
  var seriesTotal = (0, _lodash.reduce)(series.data, (result, row) => {
    var y = (0, _utils.cleanNumber)(row.y);
    return result + Math.abs(y);
  }, 0);
  (0, _lodash.each)(series.data, row => {
    var x = hasX ? (0, _utils.normalizeValue)(row.x, options.xAxis.type) : "Slice ".concat(index);
    var y = (0, _utils.cleanNumber)(row.y);
    labels.push(x);
    values.push(y);
    sourceData.set(x, {
      x,
      y,
      yPercent: y / seriesTotal * 100,
      row
    });
  });
  var markerColors = (0, _lodash.map)(series.data, row => getValueColor(row.x));
  var textColors = (0, _lodash.map)(markerColors, c => (0, _chooseTextColorForBackground.default)(c));
  return {
    visible: true,
    values,
    labels,
    type: "pie",
    hole: 0.4,
    marker: {
      colors: markerColors
    },
    hoverinfo: hoverInfoPattern,
    text: [],
    textinfo: options.showDataLabels ? "percent" : "none",
    textposition: "inside",
    textfont: {
      color: textColors
    },
    name: seriesOptions.name || series.name,
    direction: options.direction.type,
    domain: {
      x: [xPosition, xPosition + cellWidth - xPadding],
      y: [yPosition, yPosition + cellHeight - yPadding]
    },
    sourceData
  };
}

function preparePieData(seriesList, options) {
  // we will use this to assign colors for values that have no explicitly set color
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'scale' does not exist on type 'typeof im... Remove this comment to see the full error message
  var getDefaultColor = _d.default.scale.ordinal().domain([]).range(_ColorPalette.ColorPaletteArray);

  var valuesColors = {};
  (0, _lodash.each)(options.valuesOptions, (item, key) => {
    if ((0, _lodash.isString)(item.color) && item.color !== "") {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      valuesColors[key] = item.color;
    }
  });

  var additionalOptions = _objectSpread({}, getPieDimensions(seriesList), {
    hasX: (0, _lodash.includes)(options.columnMapping, "x"),
    hoverInfoPattern: getPieHoverInfoPattern(options),
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    getValueColor: v => valuesColors[v] || getDefaultColor(v)
  });

  return (0, _lodash.map)(seriesList, (series, index) => prepareSeries(series, options, _objectSpread({}, additionalOptions, {
    index
  })));
}
//# sourceMappingURL=preparePieData.js.map