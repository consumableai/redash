"use strict";

var _lodash = require("lodash");

var _react = _interopRequireDefault(require("react"));

var _enzyme = _interopRequireDefault(require("enzyme"));

var _getOptions = _interopRequireDefault(require("../getOptions"));

var _ColorsSettings = _interopRequireDefault(require("./ColorsSettings"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function findByTestID(wrapper, testId) {
  return wrapper.find("[data-test=\"".concat(testId, "\"]"));
}

function mount(options, done) {
  options = (0, _getOptions.default)(options);
  return _enzyme.default.mount( /*#__PURE__*/_react.default.createElement(_ColorsSettings.default, {
    visualizationName: "Test",
    data: {
      columns: [{
        name: "a",
        type: "string"
      }, {
        name: "b",
        type: "number"
      }],
      rows: [{
        a: "v",
        b: 3.14
      }]
    },
    options: options,
    onOptionsChange: changedOptions => {
      expect(changedOptions).toMatchSnapshot();
      done();
    }
  }));
}

describe("Visualizations -> Chart -> Editor -> Colors Settings", () => {
  describe("for pie", () => {
    test("Changes series color", done => {
      var el = mount({
        globalSeriesType: "pie",
        columnMapping: {
          a: "x",
          b: "y"
        }
      }, done);
      findByTestID(el, "Chart.Series.v.Color").find(".color-picker-trigger").last().simulate("click");
      findByTestID(el, "ColorPicker").last().find("input").simulate("change", {
        target: {
          value: "red"
        }
      });
    });
  });
  describe("for heatmap", () => {
    test("Changes color scheme", done => {
      var el = mount({
        globalSeriesType: "heatmap",
        columnMapping: {
          a: "x",
          b: "y"
        }
      }, done);
      findByTestID(el, "Chart.Colors.Heatmap.ColorScheme").last().simulate("mouseDown");
      findByTestID(el, "Chart.Colors.Heatmap.ColorScheme.Blues").last().simulate("click");
    });
    test("Sets custom color scheme", done => {
      var el = mount({
        globalSeriesType: "heatmap",
        columnMapping: {
          a: "x",
          b: "y"
        },
        colorScheme: "Custom..."
      }, (0, _lodash.after)(2, done)); // we will perform 2 actions, so call `done` after all of them completed

      findByTestID(el, "Chart.Colors.Heatmap.MinColor").find(".color-picker-trigger").last().simulate("click");
      findByTestID(el, "ColorPicker").last().find("input").simulate("change", {
        target: {
          value: "yellow"
        }
      });
      findByTestID(el, "Chart.Colors.Heatmap.MaxColor").find(".color-picker-trigger").last().simulate("click");
      findByTestID(el, "ColorPicker").last().find("input").simulate("change", {
        target: {
          value: "red"
        }
      });
    });
  });
  describe("for all except of pie and heatmap", () => {
    test("Changes series color", done => {
      var el = mount({
        globalSeriesType: "column",
        columnMapping: {
          a: "x",
          b: "y"
        }
      }, done);
      findByTestID(el, "Chart.Series.b.Color").find(".color-picker-trigger").last().simulate("click");
      findByTestID(el, "ColorPicker").last().find("input").simulate("change", {
        target: {
          value: "red"
        }
      });
    });
  });
});
//# sourceMappingURL=ColorsSettings.test.js.map