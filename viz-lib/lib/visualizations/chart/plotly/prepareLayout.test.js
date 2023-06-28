"use strict";

var _getOptions = _interopRequireDefault(require("../getOptions"));

var _prepareLayout = _interopRequireDefault(require("./prepareLayout"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable global-require, import/no-unresolved */
var fakeElement = {
  offsetWidth: 400,
  offsetHeight: 300
};
describe("Visualizations", () => {
  describe("Chart", () => {
    describe("prepareLayout", () => {
      test("Pie", () => {
        var _require = require("./fixtures/prepareLayout/pie"),
            input = _require.input,
            output = _require.output;

        var layout = (0, _prepareLayout.default)(fakeElement, (0, _getOptions.default)(input.options), input.series);
        expect(layout).toEqual(output.layout);
      });
      test("Pie without annotations", () => {
        var _require2 = require("./fixtures/prepareLayout/pie-without-annotations"),
            input = _require2.input,
            output = _require2.output;

        var layout = (0, _prepareLayout.default)(fakeElement, (0, _getOptions.default)(input.options), input.series);
        expect(layout).toEqual(output.layout);
      });
      test("Pie with multiple series", () => {
        var _require3 = require("./fixtures/prepareLayout/pie-multiple-series"),
            input = _require3.input,
            output = _require3.output;

        var layout = (0, _prepareLayout.default)(fakeElement, (0, _getOptions.default)(input.options), input.series);
        expect(layout).toEqual(output.layout);
      });
      test("Box with single Y axis", () => {
        var _require4 = require("./fixtures/prepareLayout/box-single-axis"),
            input = _require4.input,
            output = _require4.output;

        var layout = (0, _prepareLayout.default)(fakeElement, (0, _getOptions.default)(input.options), input.series);
        expect(layout).toEqual(output.layout);
      });
      test("Box with second Y axis", () => {
        var _require5 = require("./fixtures/prepareLayout/box-with-second-axis"),
            input = _require5.input,
            output = _require5.output;

        var layout = (0, _prepareLayout.default)(fakeElement, (0, _getOptions.default)(input.options), input.series);
        expect(layout).toEqual(output.layout);
      });
      test("Default with single Y axis", () => {
        var _require6 = require("./fixtures/prepareLayout/default-single-axis"),
            input = _require6.input,
            output = _require6.output;

        var layout = (0, _prepareLayout.default)(fakeElement, (0, _getOptions.default)(input.options), input.series);
        expect(layout).toEqual(output.layout);
      });
      test("Default with second Y axis", () => {
        var _require7 = require("./fixtures/prepareLayout/default-with-second-axis"),
            input = _require7.input,
            output = _require7.output;

        var layout = (0, _prepareLayout.default)(fakeElement, (0, _getOptions.default)(input.options), input.series);
        expect(layout).toEqual(output.layout);
      });
      test("Default without legend", () => {
        var _require8 = require("./fixtures/prepareLayout/default-without-legend"),
            input = _require8.input,
            output = _require8.output;

        var layout = (0, _prepareLayout.default)(fakeElement, (0, _getOptions.default)(input.options), input.series);
        expect(layout).toEqual(output.layout);
      });
      test("Default with stacking", () => {
        var _require9 = require("./fixtures/prepareLayout/default-with-stacking"),
            input = _require9.input,
            output = _require9.output;

        var layout = (0, _prepareLayout.default)(fakeElement, (0, _getOptions.default)(input.options), input.series);
        expect(layout).toEqual(output.layout);
      });
    });
  });
});
//# sourceMappingURL=prepareLayout.test.js.map