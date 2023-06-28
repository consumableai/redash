"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = prepareLayout;

var _lodash = require("lodash");

var _preparePieData = require("./preparePieData");

function getAxisTitle(axis) {
  return (0, _lodash.isObject)(axis.title) ? axis.title.text : null;
}

function getAxisScaleType(axis) {
  switch (axis.type) {
    case "datetime":
      return "date";

    case "logarithmic":
      return "log";

    default:
      return axis.type;
  }
}

function prepareXAxis(axisOptions, additionalOptions) {
  var axis = {
    title: getAxisTitle(axisOptions),
    type: getAxisScaleType(axisOptions),
    automargin: true
  };

  if (additionalOptions.sortX && axis.type === "category") {
    if (additionalOptions.reverseX) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'categoryorder' does not exist on type '{... Remove this comment to see the full error message
      axis.categoryorder = "category descending";
    } else {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'categoryorder' does not exist on type '{... Remove this comment to see the full error message
      axis.categoryorder = "category ascending";
    }
  }

  if (!(0, _lodash.isUndefined)(axisOptions.labels)) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'showticklabels' does not exist on type '... Remove this comment to see the full error message
    axis.showticklabels = axisOptions.labels.enabled;
  }

  return axis;
}

function prepareYAxis(axisOptions) {
  return {
    title: getAxisTitle(axisOptions),
    type: getAxisScaleType(axisOptions),
    automargin: true,
    autorange: true,
    range: null
  };
}

function preparePieLayout(layout, options, data) {
  var hasName = /{{\s*@@name\s*}}/.test(options.textFormat);

  var _getPieDimensions = (0, _preparePieData.getPieDimensions)(data),
      cellsInRow = _getPieDimensions.cellsInRow,
      cellWidth = _getPieDimensions.cellWidth,
      cellHeight = _getPieDimensions.cellHeight,
      xPadding = _getPieDimensions.xPadding;

  if (hasName) {
    layout.annotations = [];
  } else {
    layout.annotations = (0, _lodash.filter)((0, _lodash.map)(data, (series, index) => {
      // @ts-expect-error ts-migrate(2362) FIXME: The left-hand side of an arithmetic operation must... Remove this comment to see the full error message
      var xPosition = index % cellsInRow * cellWidth; // @ts-expect-error ts-migrate(2362) FIXME: The left-hand side of an arithmetic operation must... Remove this comment to see the full error message

      var yPosition = Math.floor(index / cellsInRow) * cellHeight;
      return {
        x: xPosition + (cellWidth - xPadding) / 2,
        y: yPosition + cellHeight - 0.015,
        xanchor: "center",
        yanchor: "top",
        text: series.name,
        showarrow: false
      };
    }));
  }

  return layout;
}

function prepareDefaultLayout(layout, options, data) {
  var y2Series = data.filter(s => s.yaxis === "y2");
  layout.xaxis = prepareXAxis(options.xAxis, options);
  layout.yaxis = prepareYAxis(options.yAxis[0]);

  if (y2Series.length > 0) {
    layout.yaxis2 = prepareYAxis(options.yAxis[1]);
    layout.yaxis2.overlaying = "y";
    layout.yaxis2.side = "right";
  }

  if (options.series.stacking) {
    layout.barmode = "relative";
  }

  return layout;
}

function prepareBoxLayout(layout, options, data) {
  layout = prepareDefaultLayout(layout, options, data);
  layout.boxmode = "group";
  layout.boxgroupgap = 0.5;
  return layout;
}

function prepareLayout(element, options, data) {
  var layout = {
    margin: {
      l: 10,
      r: 10,
      b: 5,
      t: 20,
      pad: 4
    },
    // plot size should be at least 5x5px
    width: Math.max(5, Math.floor(element.offsetWidth)),
    height: Math.max(5, Math.floor(element.offsetHeight)),
    autosize: false,
    showlegend: options.legend.enabled,
    legend: {
      traceorder: options.legend.traceorder
    },
    hoverlabel: {
      namelength: -1
    }
  };

  switch (options.globalSeriesType) {
    case "pie":
      return preparePieLayout(layout, options, data);

    case "box":
      return prepareBoxLayout(layout, options, data);

    default:
      return prepareDefaultLayout(layout, options, data);
  }
}
//# sourceMappingURL=prepareLayout.js.map