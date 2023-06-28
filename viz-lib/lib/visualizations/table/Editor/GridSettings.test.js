"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = _interopRequireDefault(require("enzyme"));

var _getOptions = _interopRequireDefault(require("../getOptions"));

var _GridSettings = _interopRequireDefault(require("./GridSettings"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function findByTestID(wrapper, testId) {
  return wrapper.find("[data-test=\"".concat(testId, "\"]"));
}

function mount(options, done) {
  var data = {
    columns: [],
    rows: []
  };
  options = (0, _getOptions.default)(options, data);
  return _enzyme.default.mount( /*#__PURE__*/_react.default.createElement(_GridSettings.default, {
    visualizationName: "Test",
    data: data,
    options: options,
    onOptionsChange: changedOptions => {
      expect(changedOptions).toMatchSnapshot();
      done();
    }
  }));
}

describe("Visualizations -> Table -> Editor -> Grid Settings", () => {
  test("Changes items per page", done => {
    var el = mount({
      itemsPerPage: 25
    }, done);
    findByTestID(el, "Table.ItemsPerPage").last().simulate("mouseDown");
    findByTestID(el, "Table.ItemsPerPage.100").last().simulate("click");
  });
});
//# sourceMappingURL=GridSettings.test.js.map