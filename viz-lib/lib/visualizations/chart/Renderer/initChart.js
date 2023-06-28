"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = initChart;

var _lodash = require("lodash");

var _resizeObserver = _interopRequireDefault(require("../../../services/resizeObserver"));

var _plotly = require("../plotly");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createErrorHandler(errorHandler) {
  return error => {
    // This error happens only when chart width is 20px and looks that
    // it's safe to just ignore it: 1px less or more and chart will get fixed.
    if ((0, _lodash.isString)(error) && (0, _lodash.startsWith)(error, "ax.dtick error")) {
      return;
    }

    errorHandler(error);
  };
} // This utility is intended to reduce amount of plot updates when multiple Plotly.relayout
// calls needed in order to compute/update the plot.
// `.append()` method takes an array of two element: first one is a object with updates for layout,
// and second is an optional function that will be called when plot is updated. That function may
// return an array with same structure if further updates needed.
// `.process()` merges all updates into a single object and calls `Plotly.relayout()`. After that
// it calls all callbacks, collects their return values and does another loop if needed.


function initPlotUpdater() {
  var actions = [];
  var updater = {
    append(action) {
      if ((0, _lodash.isArray)(action) && (0, _lodash.isObject)(action[0])) {
        actions.push(action);
      }

      return updater;
    },

    // @ts-expect-error ts-migrate(7023) FIXME: 'process' implicitly has return type 'any' because... Remove this comment to see the full error message
    process(plotlyElement) {
      if (actions.length > 0) {
        var updates = (0, _lodash.reduce)(actions, (updates, action) => (0, _lodash.merge)(updates, action[0]), {});
        var handlers = (0, _lodash.map)(actions, action => (0, _lodash.isFunction)(action[1]) ? action[1] : () => null);
        actions = [];
        return _plotly.Plotly.relayout(plotlyElement, updates).then(() => {
          (0, _lodash.each)(handlers, handler => updater.append(handler()));
          return updater.process(plotlyElement);
        });
      } else {
        return Promise.resolve();
      }
    }

  };
  return updater;
}

function initChart(container, options, data, additionalOptions, onError) {
  var handleError = createErrorHandler(onError);
  var plotlyOptions = {
    showLink: false,
    displaylogo: false
  };

  if (additionalOptions.hidePlotlyModeBar) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'displayModeBar' does not exist on type '... Remove this comment to see the full error message
    plotlyOptions.displayModeBar = false;
  }

  var plotlyData = (0, _plotly.prepareData)(data, options);
  var plotlyLayout = (0, _plotly.prepareLayout)(container, options, plotlyData);
  var isDestroyed = false;
  var updater = initPlotUpdater();

  function createSafeFunction(fn) {
    // @ts-expect-error ts-migrate(7019) FIXME: Rest parameter 'args' implicitly has an 'any[]' ty... Remove this comment to see the full error message
    return function () {
      if (!isDestroyed) {
        try {
          return fn(...arguments);
        } catch (error) {
          handleError(error);
        }
      }
    };
  }

  var unwatchResize = () => {};

  var promise = Promise.resolve().then(() => _plotly.Plotly.newPlot(container, plotlyData, plotlyLayout, plotlyOptions)).then(createSafeFunction(() => updater.append((0, _plotly.updateAxes)(container, plotlyData, plotlyLayout, options)).append((0, _plotly.updateChartSize)(container, plotlyLayout, options)).process(container))).then(createSafeFunction(() => {
    container.on("plotly_restyle", createSafeFunction(updates => {
      // This event is triggered if some plotly data/layout has changed.
      // We need to catch only changes of traces visibility to update stacking
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'visible' does not exist on type 'object'... Remove this comment to see the full error message
      if ((0, _lodash.isArray)(updates) && (0, _lodash.isObject)(updates[0]) && updates[0].visible) {
        (0, _plotly.updateData)(plotlyData, options);
        updater.append((0, _plotly.updateAxes)(container, plotlyData, plotlyLayout, options)).process(container);
      }
    }));
    options.onHover && container.on("plotly_hover", options.onHover);
    options.onUnHover && container.on("plotly_unhover", options.onUnHover);
    unwatchResize = (0, _resizeObserver.default)(container, createSafeFunction(() => {
      updater.append((0, _plotly.updateChartSize)(container, plotlyLayout, options)).process(container);
    }));
  })).catch(handleError); // @ts-expect-error ts-migrate(7022) FIXME: 'result' implicitly has type 'any' because it does... Remove this comment to see the full error message

  var result = {
    initialized: promise.then(() => result),
    setZoomEnabled: createSafeFunction(allowZoom => {
      var layoutUpdates = {
        dragmode: allowZoom ? "zoom" : false
      }; // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ dragmode: string | boolean; }'... Remove this comment to see the full error message

      return _plotly.Plotly.relayout(container, layoutUpdates);
    }),
    destroy: createSafeFunction(() => {
      isDestroyed = true;
      container.removeAllListeners("plotly_restyle");
      unwatchResize();
      delete container.__previousSize; // added by `updateChartSize`

      _plotly.Plotly.purge(container);
    })
  };
  return result;
}
//# sourceMappingURL=initChart.js.map