"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prepareCustomChartData = prepareCustomChartData;
exports.createCustomChartRenderer = createCustomChartRenderer;

var _lodash = require("lodash");

var _utils = require("./utils");

function prepareCustomChartData(series) {
  var x = [];
  var ys = {};
  (0, _lodash.each)(series, (_ref) => {
    var name = _ref.name,
        data = _ref.data;
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    ys[name] = [];
    (0, _lodash.each)(data, point => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2-3 arguments, but got 1.
      x.push((0, _utils.normalizeValue)(point.x)); // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message

      ys[name].push((0, _utils.normalizeValue)(point.y));
    });
  });
  return {
    x,
    ys
  };
}

function createCustomChartRenderer(code) {
  var logErrorsToConsole = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  // Create a function from custom code; catch syntax errors
  var render = () => {};

  try {
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'Function' is not assignable to type '() => v... Remove this comment to see the full error message
    render = new Function("x, ys, element, Plotly", code); // eslint-disable-line no-new-func
  } catch (err) {
    if (logErrorsToConsole) {
      console.log("Error while executing custom graph: ".concat(err)); // eslint-disable-line no-console
    }
  } // Return function that will invoke custom code; catch runtime errors


  return (x, ys, element, Plotly) => {
    try {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 4.
      render(x, ys, element, Plotly);
    } catch (err) {
      if (logErrorsToConsole) {
        console.log("Error while executing custom graph: ".concat(err)); // eslint-disable-line no-console
      }
    }
  };
}
//# sourceMappingURL=customChartUtils.js.map