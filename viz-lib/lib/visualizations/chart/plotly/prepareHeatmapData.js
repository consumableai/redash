"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = prepareHeatmapData;

var _lodash = require("lodash");

var _valueFormat = require("../../../lib/value-format");

var defaultColorScheme = [[0, "#356aff"], [0.14, "#4a7aff"], [0.28, "#5d87ff"], [0.42, "#7398ff"], [0.56, "#fb8c8c"], [0.71, "#ec6463"], [0.86, "#ec4949"], [1, "#e92827"]];

function prepareSeries(series, options, additionalOptions) {
  var colorScheme = additionalOptions.colorScheme,
      formatNumber = additionalOptions.formatNumber;
  var plotlySeries = {
    x: [],
    y: [],
    z: [],
    type: "heatmap",
    name: "",
    colorscale: colorScheme
  }; // @ts-expect-error ts-migrate(2322) FIXME: Type 'any[]' is not assignable to type 'never[]'.

  plotlySeries.x = (0, _lodash.uniq)((0, _lodash.map)(series.data, v => v.x)); // @ts-expect-error ts-migrate(2322) FIXME: Type 'any[]' is not assignable to type 'never[]'.

  plotlySeries.y = (0, _lodash.uniq)((0, _lodash.map)(series.data, v => v.y));

  if (options.sortX) {
    plotlySeries.x = (0, _lodash.sortBy)(plotlySeries.x);
  }

  if (options.sortY) {
    plotlySeries.y = (0, _lodash.sortBy)(plotlySeries.y);
  }

  if (options.reverseX) {
    plotlySeries.x.reverse();
  }

  if (options.reverseY) {
    plotlySeries.y.reverse();
  }

  var zMax = (0, _lodash.max)((0, _lodash.map)(series.data, d => d.zVal)); // Use text trace instead of default annotation for better performance

  var dataLabels = {
    x: [],
    y: [],
    mode: "text",
    hoverinfo: "skip",
    showlegend: false,
    text: [],
    textfont: {
      color: []
    }
  };

  for (var i = 0; i < plotlySeries.y.length; i += 1) {
    var item = [];

    for (var j = 0; j < plotlySeries.x.length; j += 1) {
      var datum = (0, _lodash.find)(series.data, {
        x: plotlySeries.x[j],
        y: plotlySeries.y[i]
      });
      var zValue = datum && datum.zVal || 0;
      item.push(zValue);

      if (isFinite(zMax) && options.showDataLabels) {
        dataLabels.x.push(plotlySeries.x[j]);
        dataLabels.y.push(plotlySeries.y[i]); // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'any' is not assignable to parame... Remove this comment to see the full error message

        dataLabels.text.push(formatNumber(zValue));

        if (options.colorScheme && options.colorScheme === "Custom...") {
          // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
          dataLabels.textfont.color.push("white");
        } else {
          // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
          dataLabels.textfont.color.push(zValue / zMax < 0.25 ? "white" : "black");
        }
      }
    } // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'any[]' is not assignable to para... Remove this comment to see the full error message


    plotlySeries.z.push(item);
  }

  if (isFinite(zMax) && options.showDataLabels) {
    return [plotlySeries, dataLabels];
  }

  return [plotlySeries];
}

function prepareHeatmapData(seriesList, options) {
  var colorScheme = [];

  if (!options.colorScheme) {
    colorScheme = defaultColorScheme;
  } else if (options.colorScheme === "Custom...") {
    colorScheme = [[0, options.heatMinColor], [1, options.heatMaxColor]];
  } else {
    colorScheme = options.colorScheme;
  }

  var additionalOptions = {
    colorScheme,
    formatNumber: (0, _valueFormat.createNumberFormatter)(options.numberFormat)
  };
  return (0, _lodash.flatten)((0, _lodash.map)(seriesList, series => prepareSeries(series, options, additionalOptions)));
}
//# sourceMappingURL=prepareHeatmapData.js.map