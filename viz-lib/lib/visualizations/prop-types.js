"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditorPropTypes = exports.RendererPropTypes = exports.VisualizationType = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VisualizationOptions = _propTypes.default.object;

// eslint-disable-line react/forbid-prop-types
var Data = _propTypes.default.shape({
  columns: _propTypes.default.arrayOf(_propTypes.default.object).isRequired,
  rows: _propTypes.default.arrayOf(_propTypes.default.object).isRequired
});

// @ts-expect-error ts-migrate(2322) FIXME: Type 'Requireable<InferProps<{ id: Requireable<num... Remove this comment to see the full error message
var VisualizationType = _propTypes.default.shape({
  id: _propTypes.default.number,
  type: _propTypes.default.string.isRequired,
  name: _propTypes.default.string.isRequired,
  options: VisualizationOptions.isRequired
});

exports.VisualizationType = VisualizationType;
// For each visualization's renderer
var RendererPropTypes = {
  visualizationName: _propTypes.default.string,
  data: Data.isRequired,
  options: VisualizationOptions.isRequired,
  onOptionsChange: _propTypes.default.func // (newOptions) => void

}; // For each visualization's editor

exports.RendererPropTypes = RendererPropTypes;
var EditorPropTypes = {
  visualizationName: _propTypes.default.string,
  data: Data.isRequired,
  options: VisualizationOptions.isRequired,
  onOptionsChange: _propTypes.default.func.isRequired // (newOptions) => void

};
exports.EditorPropTypes = EditorPropTypes;
//# sourceMappingURL=prop-types.js.map