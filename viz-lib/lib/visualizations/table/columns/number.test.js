"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = _interopRequireDefault(require("enzyme"));

var _number = _interopRequireDefault(require("./number"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function findByTestID(wrapper, testId) {
  return wrapper.find("[data-test=\"".concat(testId, "\"]"));
}

function mount(column, done) {
  return _enzyme.default.mount( /*#__PURE__*/_react.default.createElement(_number.default.Editor, {
    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ visualizationName: string; column: any; on... Remove this comment to see the full error message
    visualizationName: "Test",
    column: column,
    onChange: changedColumn => {
      expect(changedColumn).toMatchSnapshot();
      done();
    }
  }));
}

describe("Visualizations -> Table -> Columns -> Number", () => {
  describe("Editor", () => {
    test("Changes format", done => {
      var el = mount({
        name: "a",
        numberFormat: "0[.]0000"
      }, done);
      findByTestID(el, "Table.ColumnEditor.Number.Format").last().find("input").simulate("change", {
        target: {
          value: "0.00%"
        }
      });
    });
  });
});
//# sourceMappingURL=number.test.js.map