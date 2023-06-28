"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = _interopRequireDefault(require("enzyme"));

var _image = _interopRequireDefault(require("./image"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function findByTestID(wrapper, testId) {
  return wrapper.find("[data-test=\"".concat(testId, "\"]"));
}

function mount(column, done) {
  return _enzyme.default.mount( /*#__PURE__*/_react.default.createElement(_image.default.Editor, {
    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ visualizationName: string; column: any; on... Remove this comment to see the full error message
    visualizationName: "Test",
    column: column,
    onChange: changedColumn => {
      expect(changedColumn).toMatchSnapshot();
      done();
    }
  }));
}

describe("Visualizations -> Table -> Columns -> Image", () => {
  describe("Editor", () => {
    test("Changes URL template", done => {
      var el = mount({
        name: "a",
        imageUrlTemplate: "{{ @ }}"
      }, done);
      findByTestID(el, "Table.ColumnEditor.Image.UrlTemplate").last().find("input").simulate("change", {
        target: {
          value: "http://{{ @ }}.jpeg"
        }
      });
    });
    test("Changes width", done => {
      var el = mount({
        name: "a",
        imageWidth: null
      }, done);
      findByTestID(el, "Table.ColumnEditor.Image.Width").last().find("input").simulate("change", {
        target: {
          value: "400"
        }
      });
    });
    test("Changes height", done => {
      var el = mount({
        name: "a",
        imageHeight: null
      }, done);
      findByTestID(el, "Table.ColumnEditor.Image.Height").last().find("input").simulate("change", {
        target: {
          value: "300"
        }
      });
    });
    test("Changes title template", done => {
      var el = mount({
        name: "a",
        imageUrlTemplate: "{{ @ }}"
      }, done);
      findByTestID(el, "Table.ColumnEditor.Image.TitleTemplate").last().find("input").simulate("change", {
        target: {
          value: "Image {{ @ }}"
        }
      });
    });
  });
});
//# sourceMappingURL=image.test.js.map