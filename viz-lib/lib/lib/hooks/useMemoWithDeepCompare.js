"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useMemoWithDeepCompare;

var _lodash = require("lodash");

var _react = require("react");

function useMemoWithDeepCompare(create, inputs) {
  var valueRef = (0, _react.useRef)();
  var value = (0, _react.useMemo)(create, inputs);

  if (!(0, _lodash.isEqual)(value, valueRef.current)) {
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'unknown' is not assignable to type 'undefine... Remove this comment to see the full error message
    valueRef.current = value;
  }

  return valueRef.current;
}
//# sourceMappingURL=useMemoWithDeepCompare.js.map