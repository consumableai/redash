"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = _interopRequireDefault(require("enzyme"));

var _getOptions = _interopRequireDefault(require("../getOptions"));

var _GeneralSettings = _interopRequireDefault(require("./GeneralSettings"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function findByTestID(wrapper, testId) {
  return wrapper.find("[data-test=\"".concat(testId, "\"]"));
}

function elementExists(wrapper, testId) {
  return findByTestID(wrapper, testId).length > 0;
}

function mount(options, done) {
  options = (0, _getOptions.default)(options);
  return _enzyme.default.mount( /*#__PURE__*/_react.default.createElement(_GeneralSettings.default, {
    visualizationName: "Test",
    data: {
      columns: [],
      rows: []
    },
    options: options,
    onOptionsChange: changedOptions => {
      expect(changedOptions).toMatchSnapshot();
      done();
    }
  }));
}

describe("Visualizations -> Chart -> Editor -> General Settings", () => {
  test("Changes global series type", done => {
    var el = mount({
      globalSeriesType: "column",
      showDataLabels: false,
      seriesOptions: {
        a: {
          type: "column"
        },
        b: {
          type: "line"
        }
      }
    }, done);
    findByTestID(el, "Chart.GlobalSeriesType").last().simulate("mouseDown");
    findByTestID(el, "Chart.ChartType.pie").last().simulate("click");
  });
  test("Pie: changes direction", done => {
    var el = mount({
      globalSeriesType: "pie",
      direction: {
        type: "counterclockwise"
      }
    }, done);
    findByTestID(el, "Chart.PieDirection").last().simulate("mouseDown");
    findByTestID(el, "Chart.PieDirection.Clockwise").last().simulate("click");
  });
  test("Toggles legend", done => {
    var el = mount({
      globalSeriesType: "column",
      legend: {
        enabled: true
      }
    }, done);
    findByTestID(el, "Chart.LegendPlacement").last().simulate("mouseDown");
    findByTestID(el, "Chart.LegendPlacement.HideLegend").last().simulate("click");
  });
  test("Box: toggles show points", done => {
    var el = mount({
      globalSeriesType: "box",
      showpoints: false
    }, done);
    findByTestID(el, "Chart.ShowPoints").last().find("input").simulate("change", {
      target: {
        checked: true
      }
    });
  });
  test("Enables stacking", done => {
    var el = mount({
      globalSeriesType: "column",
      series: {}
    }, done);
    findByTestID(el, "Chart.Stacking").last().simulate("mouseDown");
    findByTestID(el, "Chart.Stacking.Stack").last().simulate("click");
  });
  test("Toggles normalize values to percentage", done => {
    var el = mount({
      globalSeriesType: "column",
      series: {}
    }, done);
    findByTestID(el, "Chart.NormalizeValues").last().find("input").simulate("change", {
      target: {
        checked: true
      }
    });
  });
  test("Keep missing/null values", done => {
    var el = mount({
      globalSeriesType: "column",
      missingValuesAsZero: true
    }, done);
    findByTestID(el, "Chart.MissingValues").last().simulate("mouseDown");
    findByTestID(el, "Chart.MissingValues.Keep").last().simulate("click");
  });
  describe("Column mappings should be available", () => {
    test("for bubble", () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      var el = mount({
        globalSeriesType: "column",
        seriesOptions: {
          a: {
            type: "column"
          },
          b: {
            type: "bubble"
          },
          c: {
            type: "heatmap"
          }
        }
      });
      expect(elementExists(el, "Chart.ColumnMapping.x")).toBeTruthy();
      expect(elementExists(el, "Chart.ColumnMapping.y")).toBeTruthy();
      expect(elementExists(el, "Chart.ColumnMapping.size")).toBeTruthy();
    });
    test("for heatmap", () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      var el = mount({
        globalSeriesType: "heatmap",
        seriesOptions: {
          a: {
            type: "column"
          },
          b: {
            type: "bubble"
          },
          c: {
            type: "heatmap"
          }
        }
      });
      expect(elementExists(el, "Chart.ColumnMapping.x")).toBeTruthy();
      expect(elementExists(el, "Chart.ColumnMapping.y")).toBeTruthy();
      expect(elementExists(el, "Chart.ColumnMapping.zVal")).toBeTruthy();
    });
    test("for all types except of bubble, heatmap and custom", () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      var el = mount({
        globalSeriesType: "column",
        seriesOptions: {
          a: {
            type: "column"
          },
          b: {
            type: "bubble"
          },
          c: {
            type: "heatmap"
          }
        }
      });
      expect(elementExists(el, "Chart.ColumnMapping.x")).toBeTruthy();
      expect(elementExists(el, "Chart.ColumnMapping.y")).toBeTruthy();
      expect(elementExists(el, "Chart.ColumnMapping.series")).toBeTruthy();
      expect(elementExists(el, "Chart.ColumnMapping.yError")).toBeTruthy();
    });
  });
  test("Toggles horizontal bar chart", done => {
    var el = mount({
      globalSeriesType: "column",
      series: {}
    }, done);
    findByTestID(el, "Chart.SwappedAxes").last().find("input").simulate("change", {
      target: {
        checked: true
      }
    });
  });
});
//# sourceMappingURL=GeneralSettings.test.js.map