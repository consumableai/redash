"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Editor;

var _lodash = require("lodash");

var _react = _interopRequireDefault(require("react"));

var _editor = require("../../components/visualizations/editor");

var _propTypes = require("../prop-types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Editor(_ref) {
  var options = _ref.options,
      onOptionsChange = _ref.onOptionsChange;

  var updateOptions = updates => {
    onOptionsChange((0, _lodash.merge)({}, options, updates));
  };

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Switch // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
  , {
    "data-test": "PivotEditor.HideControls" // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
    ,
    id: "pivot-show-controls" // @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'never'.
    ,
    defaultChecked: !options.controls.enabled // @ts-expect-error ts-migrate(2322) FIXME: Type '(enabled: any) => void' is not assignable to... Remove this comment to see the full error message
    ,
    onChange: enabled => updateOptions({
      controls: {
        enabled: !enabled
      }
    })
  }, "Show Pivot Controls")), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Switch // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
  , {
    id: "pivot-show-row-totals" // @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
    ,
    defaultChecked: options.rendererOptions.table.rowTotals // @ts-expect-error ts-migrate(2322) FIXME: Type '(rowTotals: any) => void' is not assignable ... Remove this comment to see the full error message
    ,
    onChange: rowTotals => updateOptions({
      rendererOptions: {
        table: {
          rowTotals
        }
      }
    })
  }, "Show Row Totals")), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Switch // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
  , {
    id: "pivot-show-column-totals" // @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
    ,
    defaultChecked: options.rendererOptions.table.colTotals // @ts-expect-error ts-migrate(2322) FIXME: Type '(colTotals: any) => void' is not assignable ... Remove this comment to see the full error message
    ,
    onChange: colTotals => updateOptions({
      rendererOptions: {
        table: {
          colTotals
        }
      }
    })
  }, "Show Column Totals")));
}

Editor.propTypes = _propTypes.EditorPropTypes;
//# sourceMappingURL=Editor.js.map