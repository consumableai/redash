"use strict";

var _prepareData = _interopRequireDefault(require("./prepareData"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function cleanSeries(series) {
  return series.map((_ref) => {
    var sourceData = _ref.sourceData,
        rest = _objectWithoutProperties(_ref, ["sourceData"]);

    return rest;
  });
}

describe("Visualizations", () => {
  describe("Chart", () => {
    describe("prepareData", () => {
      describe("heatmap", () => {
        test("default", () => {
          var _require = require("./fixtures/prepareData/heatmap/default"),
              input = _require.input,
              output = _require.output;

          var series = (0, _prepareData.default)(input.data, input.options);
          expect(series).toEqual(output.series);
        });
        test("sorted", () => {
          var _require2 = require("./fixtures/prepareData/heatmap/sorted"),
              input = _require2.input,
              output = _require2.output;

          var series = (0, _prepareData.default)(input.data, input.options);
          expect(series).toEqual(output.series);
        });
        test("reversed", () => {
          var _require3 = require("./fixtures/prepareData/heatmap/reversed"),
              input = _require3.input,
              output = _require3.output;

          var series = (0, _prepareData.default)(input.data, input.options);
          expect(series).toEqual(output.series);
        });
        test("sorted & reversed", () => {
          var _require4 = require("./fixtures/prepareData/heatmap/sorted"),
              input = _require4.input,
              output = _require4.output;

          var series = (0, _prepareData.default)(input.data, input.options);
          expect(series).toEqual(output.series);
        });
        test("with labels", () => {
          var _require5 = require("./fixtures/prepareData/heatmap/with-labels"),
              input = _require5.input,
              output = _require5.output;

          var series = (0, _prepareData.default)(input.data, input.options);
          expect(series).toEqual(output.series);
        });
      });
      describe("pie", () => {
        test("default", () => {
          var _require6 = require("./fixtures/prepareData/pie/default"),
              input = _require6.input,
              output = _require6.output;

          var series = cleanSeries((0, _prepareData.default)(input.data, input.options));
          expect(series).toEqual(output.series);
        });
        test("without X mapped", () => {
          var _require7 = require("./fixtures/prepareData/pie/without-x"),
              input = _require7.input,
              output = _require7.output;

          var series = cleanSeries((0, _prepareData.default)(input.data, input.options));
          expect(series).toEqual(output.series);
        });
        test("without labels", () => {
          var _require8 = require("./fixtures/prepareData/pie/without-labels"),
              input = _require8.input,
              output = _require8.output;

          var series = cleanSeries((0, _prepareData.default)(input.data, input.options));
          expect(series).toEqual(output.series);
        });
        test("custom tooltip", () => {
          var _require9 = require("./fixtures/prepareData/pie/custom-tooltip"),
              input = _require9.input,
              output = _require9.output;

          var series = cleanSeries((0, _prepareData.default)(input.data, input.options));
          expect(series).toEqual(output.series);
        });
      });
      describe("bar (column)", () => {
        test("default", () => {
          var _require10 = require("./fixtures/prepareData/bar/default"),
              input = _require10.input,
              output = _require10.output;

          var series = cleanSeries((0, _prepareData.default)(input.data, input.options));
          expect(series).toEqual(output.series);
        });
        test("stacked", () => {
          var _require11 = require("./fixtures/prepareData/bar/stacked"),
              input = _require11.input,
              output = _require11.output;

          var series = cleanSeries((0, _prepareData.default)(input.data, input.options));
          expect(series).toEqual(output.series);
        });
        test("normalized values", () => {
          var _require12 = require("./fixtures/prepareData/bar/normalized"),
              input = _require12.input,
              output = _require12.output;

          var series = cleanSeries((0, _prepareData.default)(input.data, input.options));
          expect(series).toEqual(output.series);
        });
      });
      describe("lines & area", () => {
        test("default", () => {
          var _require13 = require("./fixtures/prepareData/line-area/default"),
              input = _require13.input,
              output = _require13.output;

          var series = cleanSeries((0, _prepareData.default)(input.data, input.options));
          expect(series).toEqual(output.series);
        });
        test("stacked", () => {
          var _require14 = require("./fixtures/prepareData/line-area/stacked"),
              input = _require14.input,
              output = _require14.output;

          var series = cleanSeries((0, _prepareData.default)(input.data, input.options));
          expect(series).toEqual(output.series);
        });
        test("normalized values", () => {
          var _require15 = require("./fixtures/prepareData/line-area/normalized"),
              input = _require15.input,
              output = _require15.output;

          var series = cleanSeries((0, _prepareData.default)(input.data, input.options));
          expect(series).toEqual(output.series);
        });
        test("stacked & normalized values", () => {
          var _require16 = require("./fixtures/prepareData/line-area/normalized-stacked"),
              input = _require16.input,
              output = _require16.output;

          var series = cleanSeries((0, _prepareData.default)(input.data, input.options));
          expect(series).toEqual(output.series);
        });
        test("keep missing values", () => {
          var _require17 = require("./fixtures/prepareData/line-area/keep-missing-values"),
              input = _require17.input,
              output = _require17.output;

          var series = cleanSeries((0, _prepareData.default)(input.data, input.options));
          expect(series).toEqual(output.series);
        });
        test("convert missing values to 0", () => {
          var _require18 = require("./fixtures/prepareData/line-area/missing-values-0"),
              input = _require18.input,
              output = _require18.output;

          var series = cleanSeries((0, _prepareData.default)(input.data, input.options));
          expect(series).toEqual(output.series);
        });
      });
      describe("scatter", () => {
        test("default", () => {
          var _require19 = require("./fixtures/prepareData/scatter/default"),
              input = _require19.input,
              output = _require19.output;

          var series = cleanSeries((0, _prepareData.default)(input.data, input.options));
          expect(series).toEqual(output.series);
        });
        test("without labels", () => {
          var _require20 = require("./fixtures/prepareData/scatter/without-labels"),
              input = _require20.input,
              output = _require20.output;

          var series = cleanSeries((0, _prepareData.default)(input.data, input.options));
          expect(series).toEqual(output.series);
        });
      });
      describe("bubble", () => {
        test("default", () => {
          var _require21 = require("./fixtures/prepareData/bubble/default"),
              input = _require21.input,
              output = _require21.output;

          var series = cleanSeries((0, _prepareData.default)(input.data, input.options));
          expect(series).toEqual(output.series);
        });
      });
      describe("box", () => {
        test("default", () => {
          var _require22 = require("./fixtures/prepareData/box/default"),
              input = _require22.input,
              output = _require22.output;

          var series = cleanSeries((0, _prepareData.default)(input.data, input.options));
          expect(series).toEqual(output.series);
        });
        test("with points", () => {
          var _require23 = require("./fixtures/prepareData/box/with-points"),
              input = _require23.input,
              output = _require23.output;

          var series = cleanSeries((0, _prepareData.default)(input.data, input.options));
          expect(series).toEqual(output.series);
        });
      });
    });
  });
});
//# sourceMappingURL=prepareData.test.js.map