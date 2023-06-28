"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = GridSettings;

var _lodash = require("lodash");

var _react = _interopRequireDefault(require("react"));

var _editor = require("../../../components/visualizations/editor");

var _propTypes = require("../../prop-types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ALLOWED_ITEM_PER_PAGE = [5, 10, 15, 20, 25, 50, 100, 150, 200, 250, 500];

function GridSettings(_ref) {
  var options = _ref.options,
      onOptionsChange = _ref.onOptionsChange;
  return (
    /*#__PURE__*/
    // @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message
    _react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Select, {
      label: "Items per page",
      "data-test": "Table.ItemsPerPage",
      defaultValue: options.itemsPerPage,
      onChange: itemsPerPage => onOptionsChange({
        itemsPerPage
      })
    }, (0, _lodash.map)(ALLOWED_ITEM_PER_PAGE, value =>
    /*#__PURE__*/
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
    _react.default.createElement(_editor.Select.Option, {
      key: "ipp".concat(value),
      value: value,
      "data-test": "Table.ItemsPerPage.".concat(value)
    }, value))))
  );
}

GridSettings.propTypes = _propTypes.EditorPropTypes;
//# sourceMappingURL=GridSettings.js.map