"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Editor;

var _lodash = require("lodash");

var _react = _interopRequireDefault(require("react"));

var Grid = _interopRequireWildcard(require("antd/lib/grid"));

var _editor = require("../../components/visualizations/editor");

var _propTypes = require("../prop-types");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Editor(_ref) {
  var options = _ref.options,
      data = _ref.data,
      onOptionsChange = _ref.onOptionsChange;

  var optionsChanged = newOptions => {
    onOptionsChange((0, _lodash.merge)({}, options, newOptions));
  };

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Select, {
    label: "Words Column",
    "data-test": "WordCloud.WordsColumn",
    value: options.column,
    onChange: column => optionsChanged({
      column
    })
  }, (0, _lodash.map)(data.columns, (_ref2) => {
    var name = _ref2.name;
    return (
      /*#__PURE__*/
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
      _react.default.createElement(_editor.Select.Option, {
        key: name,
        "data-test": "WordCloud.WordsColumn." + name
      }, name)
    );
  }))), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Select, {
    label: "Frequencies Column",
    "data-test": "WordCloud.FrequenciesColumn",
    value: options.frequenciesColumn,
    onChange: frequenciesColumn => optionsChanged({
      frequenciesColumn
    })
  }, /*#__PURE__*/_react.default.createElement(_editor.Select.Option, {
    key: "none",
    value: ""
  }, /*#__PURE__*/_react.default.createElement("i", null, "(count word frequencies automatically)")), (0, _lodash.map)(data.columns, (_ref3) => {
    var name = _ref3.name;
    return (
      /*#__PURE__*/
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
      _react.default.createElement(_editor.Select.Option, {
        key: "column-" + name,
        value: name,
        "data-test": "WordCloud.FrequenciesColumn." + name
      }, name)
    );
  }))), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.ControlLabel, {
    label: "Words Length Limit"
  }, /*#__PURE__*/_react.default.createElement(Grid.Row, {
    gutter: 15,
    type: "flex"
  }, /*#__PURE__*/_react.default.createElement(Grid.Col, {
    span: 12
  }, /*#__PURE__*/_react.default.createElement(_editor.InputNumber, {
    "data-test": "WordCloud.WordLengthLimit.Min",
    placeholder: "Min",
    min: 0,
    value: options.wordLengthLimit.min,
    onChange: value => optionsChanged({
      wordLengthLimit: {
        min: value > 0 ? value : null
      }
    })
  })), /*#__PURE__*/_react.default.createElement(Grid.Col, {
    span: 12
  }, /*#__PURE__*/_react.default.createElement(_editor.InputNumber, {
    "data-test": "WordCloud.WordLengthLimit.Max",
    placeholder: "Max",
    min: 0,
    value: options.wordLengthLimit.max,
    onChange: value => optionsChanged({
      wordLengthLimit: {
        max: value > 0 ? value : null
      }
    })
  }))))), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.ControlLabel, {
    label: "Frequencies Limit"
  }, /*#__PURE__*/_react.default.createElement(Grid.Row, {
    gutter: 15,
    type: "flex"
  }, /*#__PURE__*/_react.default.createElement(Grid.Col, {
    span: 12
  }, /*#__PURE__*/_react.default.createElement(_editor.InputNumber, {
    "data-test": "WordCloud.WordCountLimit.Min",
    placeholder: "Min",
    min: 0,
    value: options.wordCountLimit.min,
    onChange: value => optionsChanged({
      wordCountLimit: {
        min: value > 0 ? value : null
      }
    })
  })), /*#__PURE__*/_react.default.createElement(Grid.Col, {
    span: 12
  }, /*#__PURE__*/_react.default.createElement(_editor.InputNumber, {
    "data-test": "WordCloud.WordCountLimit.Max",
    placeholder: "Max",
    min: 0,
    value: options.wordCountLimit.max,
    onChange: value => optionsChanged({
      wordCountLimit: {
        max: value > 0 ? value : null
      }
    })
  }))))));
}

Editor.propTypes = _propTypes.EditorPropTypes;
//# sourceMappingURL=Editor.js.map