"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = updateAxes;

var _lodash = require("lodash");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function calculateAxisRange(range, min, max) {
  return [(0, _lodash.isNumber)(min) ? min : range[0], (0, _lodash.isNumber)(max) ? max : range[1]];
}

function calculateAbsoluteDiff(value, totalRange, percentageDiff) {
  return percentageDiff * totalRange / (1 - Math.abs(value) / totalRange - percentageDiff);
}

function alignYAxesAtZero(axisA, axisB) {
  // Make sure the origin is included in both axes
  axisA.range[1] = Math.max(0, axisA.range[1]);
  axisB.range[1] = Math.max(0, axisB.range[1]);
  axisA.range[0] = Math.min(0, axisA.range[0]);
  axisB.range[0] = Math.min(0, axisB.range[0]);
  var totalRangeA = axisA.range[1] - axisA.range[0];
  var proportionA = axisA.range[1] / totalRangeA;
  var totalRangeB = axisB.range[1] - axisB.range[0];
  var proportionB = axisB.range[1] / totalRangeB; // Calculate the difference between the proportions and distribute them within the two axes

  var diff = Math.abs(proportionB - proportionA) / 2; // Don't do anything if the difference is too low

  if (diff < 0.01) {
    return;
  } // Select the two that will correct the proportion by always augmenting, so the chart is not cut


  if (proportionA < proportionB) {
    // increase axisA max and axisB min
    axisA.range[1] += calculateAbsoluteDiff(axisA.range[1], totalRangeA, diff);
    axisB.range[0] -= calculateAbsoluteDiff(axisA.range[0], totalRangeB, diff);
  } else {
    // increase axisB max and axisA min
    axisB.range[1] += calculateAbsoluteDiff(axisB.range[1], totalRangeB, diff);
    axisA.range[0] -= calculateAbsoluteDiff(axisA.range[0], totalRangeA, diff);
  }
}

function updateAxes(plotlyElement, seriesList, layout, options) {
  var updates = {};

  if ((0, _lodash.isObject)(layout.yaxis)) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'yaxis' does not exist on type '{}'.
    updates.yaxis = _objectSpread({}, layout.yaxis, {
      autorange: true,
      range: null
    });
  }

  if ((0, _lodash.isObject)(layout.yaxis2)) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'yaxis2' does not exist on type '{}'.
    updates.yaxis2 = _objectSpread({}, layout.yaxis2, {
      autorange: true,
      range: null
    });
  }

  return [updates, () => {
    // Update Y Ranges
    if ((0, _lodash.isObject)(layout.yaxis)) {
      var axisOptions = options.yAxis[0];
      var defaultRange = plotlyElement.layout.yaxis.range; // @ts-expect-error ts-migrate(2339) FIXME: Property 'yaxis' does not exist on type '{}'.

      updates.yaxis.autorange = false; // @ts-expect-error ts-migrate(2339) FIXME: Property 'yaxis' does not exist on type '{}'.

      updates.yaxis.range = calculateAxisRange(defaultRange, axisOptions.rangeMin, axisOptions.rangeMax);
    }

    if ((0, _lodash.isObject)(layout.yaxis2)) {
      var _axisOptions = options.yAxis[1];
      var _defaultRange = plotlyElement.layout.yaxis2.range; // @ts-expect-error ts-migrate(2339) FIXME: Property 'yaxis2' does not exist on type '{}'.

      updates.yaxis2.autorange = false; // @ts-expect-error ts-migrate(2339) FIXME: Property 'yaxis2' does not exist on type '{}'.

      updates.yaxis2.range = calculateAxisRange(_defaultRange, _axisOptions.rangeMin, _axisOptions.rangeMax);
    } // Swap Axes


    if (options.swappedAxes) {
      (0, _lodash.each)(seriesList, series => {
        series.orientation = "h";
        var x = series.x,
            y = series.y;
        series.x = y;
        series.y = x;
      });
      var xaxis = layout.xaxis; // @ts-expect-error ts-migrate(2339) FIXME: Property 'yaxis' does not exist on type '{}'.

      var yaxis = updates.yaxis,
          yaxis2 = updates.yaxis2;

      if ((0, _lodash.isObject)(xaxis) && (0, _lodash.isObject)(yaxis)) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'xaxis' does not exist on type '{}'.
        updates.xaxis = yaxis; // @ts-expect-error ts-migrate(2339) FIXME: Property 'yaxis' does not exist on type '{}'.

        updates.yaxis = xaxis;
      }

      if ((0, _lodash.isObject)(yaxis2)) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'yaxis2' does not exist on type '{}'.
        updates.yaxis2 = null;
      }
    } // Align Y axes


    if (options.alignYAxesAtZero && (0, _lodash.isObject)(layout.yaxis) && (0, _lodash.isObject)(layout.yaxis2)) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'yaxis' does not exist on type '{}'.
      alignYAxesAtZero(updates.yaxis, updates.yaxis2);
    }

    return [updates, null]; // no further updates
  }];
}
//# sourceMappingURL=updateAxes.js.map