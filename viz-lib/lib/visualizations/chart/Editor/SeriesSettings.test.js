"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = _interopRequireDefault(require("enzyme"));

var _getOptions = _interopRequireDefault(require("../getOptions"));

var _SeriesSettings = _interopRequireDefault(require("./SeriesSettings"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function findByTestID(wrapper, testId) {
  return wrapper.find("[data-test=\"".concat(testId, "\"]"));
}

function mount(options, done) {
  options = (0, _getOptions.default)(options);
  return _enzyme.default.mount( /*#__PURE__*/_react.default.createElement(_SeriesSettings.default, {
    visualizationName: "Test",
    data: {
      columns: [{
        name: "a",
        type: "string"
      }],
      rows: [{
        a: "test"
      }]
    },
    options: options,
    onOptionsChange: changedOptions => {
      expect(changedOptions).toMatchSnapshot();
      done();
    }
  }));
}

describe("Visualizations -> Chart -> Editor -> Series Settings", () => {
  test("Changes series type", done => {
    var el = mount({
      globalSeriesType: "column",
      columnMapping: {
        a: "y"
      },
      seriesOptions: {
        a: {
          type: "column",
          label: "a",
          yAxis: 0
        }
      }
    }, done);
    findByTestID(el, "Chart.Series.a.Type").last().simulate("mouseDown");
    findByTestID(el, "Chart.ChartType.area").last().simulate("click");
  });
  test("Changes series label", done => {
    var el = mount({
      globalSeriesType: "column",
      columnMapping: {
        a: "y"
      },
      seriesOptions: {
        a: {
          type: "column",
          label: "a",
          yAxis: 0
        }
      }
    }, done);
    findByTestID(el, "Chart.Series.a.Label").last().simulate("change", {
      target: {
        value: "test"
      }
    });
  });
  test("Changes series axis", done => {
    var el = mount({
      globalSeriesType: "column",
      columnMapping: {
        a: "y"
      },
      seriesOptions: {
        a: {
          type: "column",
          name: "a",
          yAxis: 0
        }
      }
    }, done);
    findByTestID(el, "Chart.Series.a.UseRightAxis").last().find("input").simulate("change", {
      target: {
        checked: true
      }
    });
  });
});
//# sourceMappingURL=SeriesSettings.test.js.map