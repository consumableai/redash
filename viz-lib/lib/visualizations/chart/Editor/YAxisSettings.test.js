"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = _interopRequireDefault(require("enzyme"));

var _getOptions = _interopRequireDefault(require("../getOptions"));

var _YAxisSettings = _interopRequireDefault(require("./YAxisSettings"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function findByTestID(wrapper, testId) {
  return wrapper.find("[data-test=\"".concat(testId, "\"]"));
}

function elementExists(wrapper, testId) {
  return findByTestID(wrapper, testId).length > 0;
}

function mount(options, done) {
  options = (0, _getOptions.default)(options);
  return _enzyme.default.mount( /*#__PURE__*/_react.default.createElement(_YAxisSettings.default, {
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

describe("Visualizations -> Chart -> Editor -> Y-Axis Settings", () => {
  test("Changes axis type", done => {
    var el = mount({
      globalSeriesType: "column",
      yAxis: [{
        type: "linear"
      }, {
        type: "linear",
        opposite: true
      }]
    }, done);
    findByTestID(el, "Chart.LeftYAxis.Type").last().simulate("mouseDown");
    findByTestID(el, "Chart.LeftYAxis.Type.Category").last().simulate("click");
  });
  test("Changes axis name", done => {
    var el = mount({
      globalSeriesType: "column",
      yAxis: [{
        type: "linear"
      }, {
        type: "linear",
        opposite: true
      }]
    }, done);
    findByTestID(el, "Chart.LeftYAxis.Name").last().simulate("change", {
      target: {
        value: "test"
      }
    });
  });
  test("Changes axis min value", done => {
    var el = mount({
      globalSeriesType: "column",
      yAxis: [{
        type: "linear"
      }, {
        type: "linear",
        opposite: true
      }]
    }, done);
    findByTestID(el, "Chart.LeftYAxis.RangeMin").find("input").last().simulate("change", {
      target: {
        value: "50"
      }
    });
  });
  test("Changes axis max value", done => {
    var el = mount({
      globalSeriesType: "column",
      yAxis: [{
        type: "linear"
      }, {
        type: "linear",
        opposite: true
      }]
    }, done);
    findByTestID(el, "Chart.LeftYAxis.RangeMax").find("input").last().simulate("change", {
      target: {
        value: "200"
      }
    });
  });
  describe("for non-heatmap", () => {
    test("Right Y Axis should be available", () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      var el = mount({
        globalSeriesType: "column",
        yAxis: [{
          type: "linear"
        }, {
          type: "linear",
          opposite: true
        }]
      });
      expect(elementExists(el, "Chart.RightYAxis.Type")).toBeTruthy();
    });
  });
  describe("for heatmap", () => {
    test("Right Y Axis should not be available", () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      var el = mount({
        globalSeriesType: "heatmap",
        yAxis: [{
          type: "linear"
        }, {
          type: "linear",
          opposite: true
        }]
      });
      expect(elementExists(el, "Chart.RightYAxis.Type")).toBeFalsy();
    });
    test("Sets Sort X Values option", done => {
      var el = mount({
        globalSeriesType: "heatmap",
        sortY: false
      }, done);
      findByTestID(el, "Chart.LeftYAxis.Sort").last().simulate("click");
    });
    test("Sets Reverse Y Values option", done => {
      var el = mount({
        globalSeriesType: "heatmap",
        reverseY: false
      }, done);
      findByTestID(el, "Chart.LeftYAxis.Reverse").last().simulate("click");
    });
  });
});
//# sourceMappingURL=YAxisSettings.test.js.map