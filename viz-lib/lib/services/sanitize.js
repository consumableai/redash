"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "DOMPurify", {
  enumerable: true,
  get: function get() {
    return _dompurify.default;
  }
});
exports.default = void 0;

var _lodash = require("lodash");

var _dompurify = _interopRequireDefault(require("dompurify"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dompurify.default.setConfig({
  ADD_ATTR: ["target"]
});

_dompurify.default.addHook("afterSanitizeAttributes", function (node) {
  // Fix elements with `target` attribute:
  // - allow only `target="_blank"
  // - add `rel="noopener noreferrer"` to prevent https://www.owasp.org/index.php/Reverse_Tabnabbing
  var target = node.getAttribute("target");

  if ((0, _lodash.isString)(target) && target.toLowerCase() === "_blank") {
    node.setAttribute("rel", "noopener noreferrer");
  } else {
    node.removeAttribute("target");
  }
});

var _default = _dompurify.default.sanitize;
exports.default = _default;
//# sourceMappingURL=sanitize.js.map