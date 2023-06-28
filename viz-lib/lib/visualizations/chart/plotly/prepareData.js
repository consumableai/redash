"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = prepareData;

var _preparePieData = _interopRequireDefault(require("./preparePieData"));

var _prepareHeatmapData = _interopRequireDefault(require("./prepareHeatmapData"));

var _prepareDefaultData = _interopRequireDefault(require("./prepareDefaultData"));

var _updateData = _interopRequireDefault(require("./updateData"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function prepareData(seriesList, options) {
  switch (options.globalSeriesType) {
    case "pie":
      return (0, _updateData.default)((0, _preparePieData.default)(seriesList, options), options);

    case "heatmap":
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      return (0, _updateData.default)((0, _prepareHeatmapData.default)(seriesList, options, options));

    default:
      return (0, _updateData.default)((0, _prepareDefaultData.default)(seriesList, options), options);
  }
}
//# sourceMappingURL=prepareData.js.map