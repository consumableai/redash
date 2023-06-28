"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = _interopRequireDefault(require("enzyme"));

var _datetime = _interopRequireDefault(require("./datetime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function findByTestID(wrapper, testId) {
  return wrapper.find("[data-test=\"".concat(testId, "\"]"));
}

function mount(column, done) {
  return _enzyme.default.mount( /*#__PURE__*/_react.default.createElement(_datetime.default.Editor, {
    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ visualizationName: string; column: any; on... Remove this comment to see the full error message
    visualizationName: "Test",
    column: column,
    onChange: changedColumn => {
      expect(changedColumn).toMatchSnapshot();
      done();
    }
  }));
}

describe("Visualizations -> Table -> Columns -> Date/Time", () => {
  describe("Editor", () => {
    test("Changes format", done => {
      var el = mount({
        name: "a",
        dateTimeFormat: "YYYY-MM-DD HH:mm:ss"
      }, done);
      findByTestID(el, "Table.ColumnEditor.DateTime.Format").last().find("input").simulate("change", {
        target: {
          value: "YYYY/MM/DD HH:ss"
        }
      });
    });
  });
});
//# sourceMappingURL=datetime.test.js.map