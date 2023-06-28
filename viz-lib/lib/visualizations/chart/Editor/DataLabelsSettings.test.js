"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = _interopRequireDefault(require("enzyme"));

var _getOptions = _interopRequireDefault(require("../getOptions"));

var _DataLabelsSettings = _interopRequireDefault(require("./DataLabelsSettings"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function findByTestID(wrapper, testId) {
  return wrapper.find("[data-test=\"".concat(testId, "\"]"));
}

function mount(options, done) {
  options = (0, _getOptions.default)(options);
  return _enzyme.default.mount( /*#__PURE__*/_react.default.createElement(_DataLabelsSettings.default, {
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

describe("Visualizations -> Chart -> Editor -> Data Labels Settings", () => {
  test("Sets Show Data Labels option", done => {
    var el = mount({
      globalSeriesType: "column",
      showDataLabels: false
    }, done);
    findByTestID(el, "Chart.DataLabels.ShowDataLabels").last().find("input").simulate("change", {
      target: {
        checked: true
      }
    });
  });
  test("Changes number format", done => {
    var el = mount({
      globalSeriesType: "column",
      numberFormat: "0[.]0000"
    }, done);
    findByTestID(el, "Chart.DataLabels.NumberFormat").last().simulate("change", {
      target: {
        value: "0.00"
      }
    });
  });
  test("Changes percent values format", done => {
    var el = mount({
      globalSeriesType: "column",
      percentFormat: "0[.]00%"
    }, done);
    findByTestID(el, "Chart.DataLabels.PercentFormat").last().simulate("change", {
      target: {
        value: "0.0%"
      }
    });
  });
  test("Changes date/time format", done => {
    var el = mount({
      globalSeriesType: "column",
      dateTimeFormat: "YYYY-MM-DD HH:mm:ss"
    }, done);
    findByTestID(el, "Chart.DataLabels.DateTimeFormat").last().simulate("change", {
      target: {
        value: "YYYY MMM DD"
      }
    });
  });
  test("Changes data labels format", done => {
    var el = mount({
      globalSeriesType: "column",
      textFormat: null
    }, done);
    findByTestID(el, "Chart.DataLabels.TextFormat").last().simulate("change", {
      target: {
        value: "{{ @@x }} :: {{ @@y }} / {{ @@yPercent }}"
      }
    });
  });
});
//# sourceMappingURL=DataLabelsSettings.test.js.map