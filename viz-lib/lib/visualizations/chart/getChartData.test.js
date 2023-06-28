"use strict";

var _getChartData = _interopRequireDefault(require("./getChartData"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable global-require, import/no-unresolved */
describe("Visualizations", () => {
  describe("Chart", () => {
    describe("getChartData", () => {
      test("Single series", () => {
        var _require = require("./fixtures/getChartData/single-series"),
            input = _require.input,
            output = _require.output;

        var data = (0, _getChartData.default)(input.data, input.options);
        expect(data).toEqual(output.data);
      });
      test("Multiple series: multiple Y mappings", () => {
        var _require2 = require("./fixtures/getChartData/multiple-series-multiple-y"),
            input = _require2.input,
            output = _require2.output;

        var data = (0, _getChartData.default)(input.data, input.options);
        expect(data).toEqual(output.data);
      });
      test("Multiple series: grouped", () => {
        var _require3 = require("./fixtures/getChartData/multiple-series-grouped"),
            input = _require3.input,
            output = _require3.output;

        var data = (0, _getChartData.default)(input.data, input.options);
        expect(data).toEqual(output.data);
      });
      test("Multiple series: sorted", () => {
        var _require4 = require("./fixtures/getChartData/multiple-series-sorted"),
            input = _require4.input,
            output = _require4.output;

        var data = (0, _getChartData.default)(input.data, input.options);
        expect(data).toEqual(output.data);
      });
    });
  });
});
//# sourceMappingURL=getChartData.test.js.map