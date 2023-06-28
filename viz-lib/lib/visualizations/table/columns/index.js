"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _text = _interopRequireDefault(require("./text"));

var _number = _interopRequireDefault(require("./number"));

var _datetime = _interopRequireDefault(require("./datetime"));

var _boolean = _interopRequireDefault(require("./boolean"));

var _link = _interopRequireDefault(require("./link"));

var _image = _interopRequireDefault(require("./image"));

var _json = _interopRequireDefault(require("./json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// this map should contain all possible values for `column.displayAs` property
var _default = {
  string: _text.default,
  number: _number.default,
  datetime: _datetime.default,
  boolean: _boolean.default,
  link: _link.default,
  image: _image.default,
  json: _json.default
};
exports.default = _default;
//# sourceMappingURL=index.js.map