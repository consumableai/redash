"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = updateChartSize;

var _lodash = require("lodash");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function fixLegendContainer(plotlyElement) {
  var legend = plotlyElement.querySelector(".legend");

  if (legend) {
    var node = legend.parentNode;

    while (node) {
      if (node.tagName.toLowerCase() === "svg") {
        node.style.overflow = "visible";
        break;
      }

      node = node.parentNode;
    }
  }
}

function placeLegendNextToPlot(plotlyElement, layout) {
  var transformName = (0, _lodash.find)(["transform", "WebkitTransform", "MozTransform", "MsTransform", "OTransform"], prop => prop in plotlyElement.style);
  layout.legend = (0, _lodash.extend)({}, layout.legend, {
    orientation: "v",
    // vertical legend will be rendered properly, so just place it to the right
    // side of plot
    y: 1,
    x: 1,
    xanchor: "left",
    yanchor: "top"
  });
  var legend = plotlyElement.querySelector(".legend");

  if (legend) {
    // @ts-expect-error ts-migrate(2538) FIXME: Type 'undefined' cannot be used as an index type.
    legend.style[transformName] = null;
  }

  return [(0, _lodash.pick)(layout, ["width", "height", "legend"]), null]; // no further updates
}

function placeLegendBelowPlot(plotlyElement, layout) {
  var transformName = (0, _lodash.find)(["transform", "WebkitTransform", "MozTransform", "MsTransform", "OTransform"], prop => prop in plotlyElement.style); // Save current `layout.height` value because `Plotly.relayout().then(...)` handler may be called multiple
  // times within single update, and since the handler mutates `layout` object - it may lead to bugs

  var layoutHeight = layout.height; // change legend orientation to horizontal; plotly has a bug with this
  // legend alignment - it does not preserve enough space under the plot;
  // so we'll hack this: update plot (it will re-render legend), compute
  // legend height, reduce plot size by legend height (but not less than
  // half of plot container's height - legend will have max height equal to
  // plot height), re-render plot again and offset legend to the space under
  // the plot.
  // Related issue: https://github.com/plotly/plotly.js/issues/1199

  layout.legend = (0, _lodash.extend)({}, layout.legend, {
    orientation: "h",
    // locate legend inside of plot area - otherwise plotly will preserve
    // some amount of space under the plot; also this will limit legend height
    // to plot's height
    y: 0,
    x: 0,
    xanchor: "left",
    yanchor: "bottom"
  }); // set `overflow: visible` to svg containing legend because later we will
  // position legend outside of it

  fixLegendContainer(plotlyElement);
  return [(0, _lodash.pick)(layout, ["width", "height", "legend"]), () => {
    var legend = plotlyElement.querySelector(".legend"); // eslint-disable-line no-shadow

    if (legend) {
      // compute real height of legend - items may be split into few columnns,
      // also scrollbar may be shown
      var bounds = legend.getBoundingClientRect(); // here we have two values:
      // 1. height of plot container excluding height of legend items;
      //    it may be any value between 0 and plot container's height;
      // 2. half of plot containers height. Legend cannot be larger than
      //    plot; if legend is too large, plotly will reduce it's height and
      //    show a scrollbar; in this case, height of plot === height of legend,
      //    so we can split container's height half by half between them.

      layout.height = Math.floor(Math.max(layoutHeight / 2, layoutHeight - (bounds.bottom - bounds.top))); // offset the legend
      // @ts-expect-error ts-migrate(2538) FIXME: Type 'undefined' cannot be used as an index type.

      legend.style[transformName] = "translate(0, " + layout.height + "px)";
      return [(0, _lodash.pick)(layout, ["height"]), null]; // no further updates
    }
  }];
}

function placeLegendAuto(plotlyElement, layout) {
  if (layout.width <= 600) {
    return placeLegendBelowPlot(plotlyElement, layout);
  } else {
    return placeLegendNextToPlot(plotlyElement, layout);
  }
}

function updateChartSize(plotlyElement, layout, options) {
  // update layout size to plot container
  // plot size should be at least 5x5px
  layout.width = Math.max(5, Math.floor(plotlyElement.offsetWidth));
  layout.height = Math.max(5, Math.floor(plotlyElement.offsetHeight));

  var _ref = plotlyElement.__previousSize || [],
      _ref2 = _slicedToArray(_ref, 2),
      previousWidth = _ref2[0],
      previousHeight = _ref2[1];

  if (layout.width === previousWidth && layout.height === previousHeight) {
    return;
  }

  plotlyElement.__previousSize = [layout.width, layout.height];

  if (options.legend.enabled) {
    switch (options.legend.placement) {
      case "auto":
        return placeLegendAuto(plotlyElement, layout);
        break;

      case "below":
        return placeLegendBelowPlot(plotlyElement, layout);
        break;
      // no default
    }
  } else {
    return [(0, _lodash.pick)(layout, ["width", "height"]), null]; // no further updates
  }
}
//# sourceMappingURL=updateChartSize.js.map