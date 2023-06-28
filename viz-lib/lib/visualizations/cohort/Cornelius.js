"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Cornelius;

var _lodash = require("lodash");

var _moment = _interopRequireDefault(require("moment"));

var _chromaJs = _interopRequireDefault(require("chroma-js"));

var _react = _interopRequireWildcard(require("react"));

var _tooltip = _interopRequireDefault(require("antd/lib/tooltip"));

var _valueFormat = require("../../lib/value-format");

var _chooseTextColorForBackground = _interopRequireDefault(require("../../lib/chooseTextColorForBackground"));

require("./cornelius.less");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*!
 * React port of Cornelius library (based on v0.1 released under the MIT license)
 * Original library: http://restorando.github.io/cornelius
 */
var momentInterval = {
  daily: "days",
  weekly: "weeks",
  monthly: "months",
  yearly: "years"
};
var timeLabelFormats = {
  daily: "MMMM D, YYYY",
  weekly: "[Week of] MMM D, YYYY",
  monthly: "MMMM YYYY",
  yearly: "YYYY"
};
var defaultOptions = {
  initialDate: null,
  timeInterval: "monthly",
  noValuePlaceholder: "-",
  rawNumberOnHover: true,
  displayAbsoluteValues: false,
  initialIntervalNumber: 1,
  maxColumns: Infinity,
  title: null,
  timeColumnTitle: "Time",
  peopleColumnTitle: "People",
  stageColumnTitle: "{{ @ }}",
  numberFormat: "0,0[.]00",
  percentFormat: "0.00%",
  timeLabelFormat: timeLabelFormats.monthly,
  colors: {
    min: "#ffffff",
    max: "#041d66",
    steps: 7
  }
};

function prepareOptions(options) {
  options = (0, _lodash.extend)({}, defaultOptions, options, {
    initialDate: (0, _moment.default)(options.initialDate),
    colors: (0, _lodash.extend)({}, defaultOptions.colors, options.colors)
  });
  return (0, _lodash.extend)(options, {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    timeLabelFormat: timeLabelFormats[options.timeInterval],
    formatNumber: (0, _valueFormat.createNumberFormatter)(options.numberFormat),
    formatPercent: (0, _valueFormat.createNumberFormatter)(options.percentFormat),
    getColorForValue: _chromaJs.default.scale([options.colors.min, options.colors.max]).mode("hsl").domain([0, 100]).classes(options.colors.steps)
  });
}

function isLightColor(backgroundColor) {
  backgroundColor = (0, _chromaJs.default)(backgroundColor);
  var white = "#ffffff";
  var black = "#000000";
  return _chromaJs.default.contrast(backgroundColor, white) < _chromaJs.default.contrast(backgroundColor, black);
}

function formatStageTitle(options, index) {
  return (0, _valueFormat.formatSimpleTemplate)(options.stageColumnTitle, {
    "@": options.initialIntervalNumber - 1 + index
  });
}

function formatTimeLabel(options, offset) {
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  var interval = momentInterval[options.timeInterval];
  return options.initialDate.clone().add(offset, interval).format(options.timeLabelFormat);
}

function CorneliusHeader(_ref) {
  var options = _ref.options,
      maxRowLength = _ref.maxRowLength;
  // eslint-disable-line react/prop-types
  var cells = [];

  for (var i = 1; i < maxRowLength; i += 1) {
    cells.push( /*#__PURE__*/_react.default.createElement("th", {
      key: "col".concat(i),
      className: "cornelius-stage"
    }, formatStageTitle(options, i)));
  }

  return /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("th", {
    className: "cornelius-time"
  }, options.timeColumnTitle), /*#__PURE__*/_react.default.createElement("th", {
    className: "cornelius-people"
  }, options.peopleColumnTitle), cells);
}

function CorneliusRow(_ref2) {
  var options = _ref2.options,
      data = _ref2.data,
      index = _ref2.index,
      maxRowLength = _ref2.maxRowLength;
  // eslint-disable-line react/prop-types
  var baseValue = data[0] || 0;
  var cells = [];

  for (var i = 1; i < maxRowLength; i += 1) {
    var value = data[i];
    var percentageValue = (0, _lodash.isFinite)(value / baseValue) ? value / baseValue * 100 : null;
    var cellProps = {
      key: "col".concat(i)
    };

    if ((0, _lodash.isNil)(percentageValue)) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'className' does not exist on type '{ key... Remove this comment to see the full error message
      cellProps.className = "cornelius-empty"; // @ts-expect-error ts-migrate(2339) FIXME: Property 'children' does not exist on type '{ key:... Remove this comment to see the full error message

      cellProps.children = options.noValuePlaceholder;
    } else {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'className' does not exist on type '{ key... Remove this comment to see the full error message
      cellProps.className = options.displayAbsoluteValues ? "cornelius-absolute" : "cornelius-percentage"; // @ts-expect-error ts-migrate(2339) FIXME: Property 'children' does not exist on type '{ key:... Remove this comment to see the full error message

      cellProps.children = options.displayAbsoluteValues ? options.formatNumber(value) : options.formatPercent(percentageValue);
      var backgroundColor = options.getColorForValue(percentageValue); // @ts-expect-error ts-migrate(2339) FIXME: Property 'style' does not exist on type '{ key: st... Remove this comment to see the full error message

      cellProps.style = {
        backgroundColor,
        color: (0, _chooseTextColorForBackground.default)(backgroundColor)
      }; // @ts-expect-error ts-migrate(2339) FIXME: Property 'style' does not exist on type '{ key: st... Remove this comment to see the full error message

      if (isLightColor(cellProps.style.color)) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'className' does not exist on type '{ key... Remove this comment to see the full error message
        cellProps.className += " cornelius-white-text";
      }

      if (options.rawNumberOnHover && !options.displayAbsoluteValues) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'children' does not exist on type '{ key:... Remove this comment to see the full error message
        cellProps.children = /*#__PURE__*/_react.default.createElement(_tooltip.default, {
          title: options.formatNumber(value),
          mouseEnterDelay: 0,
          mouseLeaveDelay: 0
        }, /*#__PURE__*/_react.default.createElement("div", null, cellProps.children));
      }
    }

    cells.push( /*#__PURE__*/_react.default.createElement("td", cellProps));
  }

  return /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("td", {
    className: "cornelius-label"
  }, formatTimeLabel(options, index)), /*#__PURE__*/_react.default.createElement("td", {
    className: "cornelius-people"
  }, options.formatNumber(baseValue)), cells);
}

function Cornelius(_ref3) {
  var data = _ref3.data,
      options = _ref3.options;
  options = (0, _react.useMemo)(() => prepareOptions(options), [options]);
  var maxRowLength = (0, _react.useMemo)(() => (0, _lodash.min)([// @ts-expect-error ts-migrate(2339) FIXME: Property 'length' does not exist on type 'number'.
  (0, _lodash.max)((0, _lodash.map)(data, d => d.length)) || 0, // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
  options.maxColumns + 1 // each row includes totals, but `maxColumns` is only for stage columns
  ]), [data, options.maxColumns]);

  if (data.length === 0) {
    return null;
  }

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "cornelius-container"
  }, options.title && /*#__PURE__*/_react.default.createElement("div", {
    className: "cornelius-title"
  }, options.title), /*#__PURE__*/_react.default.createElement("table", {
    className: "cornelius-table"
  }, /*#__PURE__*/_react.default.createElement("thead", null, /*#__PURE__*/_react.default.createElement(CorneliusHeader, {
    options: options,
    maxRowLength: maxRowLength
  })), /*#__PURE__*/_react.default.createElement("tbody", null, (0, _lodash.map)(data, (row, index) => /*#__PURE__*/_react.default.createElement(CorneliusRow, {
    key: "row".concat(index),
    options: options,
    data: row,
    index: index,
    maxRowLength: maxRowLength
  })))));
}

Cornelius.defaultProps = {
  data: [],
  options: {}
};
//# sourceMappingURL=Cornelius.js.map