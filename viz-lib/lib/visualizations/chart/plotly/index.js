"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Plotly", {
  enumerable: true,
  get: function get() {
    return _core.default;
  }
});
Object.defineProperty(exports, "prepareData", {
  enumerable: true,
  get: function get() {
    return _prepareData.default;
  }
});
Object.defineProperty(exports, "prepareLayout", {
  enumerable: true,
  get: function get() {
    return _prepareLayout.default;
  }
});
Object.defineProperty(exports, "updateData", {
  enumerable: true,
  get: function get() {
    return _updateData.default;
  }
});
Object.defineProperty(exports, "updateAxes", {
  enumerable: true,
  get: function get() {
    return _updateAxes.default;
  }
});
Object.defineProperty(exports, "updateChartSize", {
  enumerable: true,
  get: function get() {
    return _updateChartSize.default;
  }
});
Object.defineProperty(exports, "prepareCustomChartData", {
  enumerable: true,
  get: function get() {
    return _customChartUtils.prepareCustomChartData;
  }
});
Object.defineProperty(exports, "createCustomChartRenderer", {
  enumerable: true,
  get: function get() {
    return _customChartUtils.createCustomChartRenderer;
  }
});

var _core = _interopRequireDefault(require("plotly.js/lib/core"));

var _bar = _interopRequireDefault(require("plotly.js/lib/bar"));

var _pie = _interopRequireDefault(require("plotly.js/lib/pie"));

var _histogram = _interopRequireDefault(require("plotly.js/lib/histogram"));

var _box = _interopRequireDefault(require("plotly.js/lib/box"));

var _heatmap = _interopRequireDefault(require("plotly.js/lib/heatmap"));

var _prepareData = _interopRequireDefault(require("./prepareData"));

var _prepareLayout = _interopRequireDefault(require("./prepareLayout"));

var _updateData = _interopRequireDefault(require("./updateData"));

var _updateAxes = _interopRequireDefault(require("./updateAxes"));

var _updateChartSize = _interopRequireDefault(require("./updateChartSize"));

var _customChartUtils = require("./customChartUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'plot... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'plot... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'plot... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'plot... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'plot... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'register' does not exist on type 'typeof... Remove this comment to see the full error message
_core.default.register([_bar.default, _pie.default, _histogram.default, _box.default, _heatmap.default]); // @ts-expect-error ts-migrate(2339) FIXME: Property 'setPlotConfig' does not exist on type 't... Remove this comment to see the full error message


_core.default.setPlotConfig({
  modeBarButtonsToRemove: ["sendDataToCloud"]
});
//# sourceMappingURL=index.js.map