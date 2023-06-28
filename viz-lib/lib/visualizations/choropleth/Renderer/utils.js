"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.darkenColor = darkenColor;
exports.createNumberFormatter = createNumberFormatter;
exports.prepareData = prepareData;
exports.prepareFeatureProperties = prepareFeatureProperties;
exports.getValueForFeature = getValueForFeature;
exports.getColorByValue = getColorByValue;
exports.createScale = createScale;

var _lodash = require("lodash");

var _chromaJs = _interopRequireDefault(require("chroma-js"));

var _valueFormat = require("../../../lib/value-format");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function darkenColor(color) {
  return (0, _chromaJs.default)(color).darken().hex();
}

function createNumberFormatter(format, placeholder) {
  var formatter = (0, _valueFormat.createNumberFormatter)(format);
  return value => {
    if ((0, _lodash.isFinite)(value)) {
      return formatter(value);
    }

    return placeholder;
  };
}

function prepareData(data, keyColumn, valueColumn) {
  if (!keyColumn || !valueColumn) {
    return {};
  }

  var result = {};
  (0, _lodash.each)(data, item => {
    if (item[keyColumn]) {
      var value = parseFloat(item[valueColumn]); // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message

      result[item[keyColumn]] = {
        code: item[keyColumn],
        value: (0, _lodash.isFinite)(value) ? value : undefined,
        item
      };
    }
  });
  return result;
}

function prepareFeatureProperties(feature, valueFormatted, data, targetField) {
  var result = {};
  (0, _lodash.each)(feature.properties, (value, key) => {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    result["@@" + key] = value;
  }); // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message

  result["@@value"] = valueFormatted;
  var datum = data[feature.properties[targetField]] || {};
  return (0, _lodash.extend)(result, datum.item);
}

function getValueForFeature(feature, data, targetField) {
  var code = feature.properties[targetField];

  if ((0, _lodash.isString)(code) && (0, _lodash.isObject)(data[code])) {
    return data[code].value;
  }

  return undefined;
}

function getColorByValue(value, limits, colors, defaultColor) {
  if ((0, _lodash.isFinite)(value)) {
    for (var i = 0; i < limits.length; i += 1) {
      if (value <= limits[i]) {
        return colors[i];
      }
    }
  }

  return defaultColor;
}

function createScale(features, data, options) {
  // Calculate limits
  var values = (0, _lodash.uniq)((0, _lodash.filter)((0, _lodash.map)(features, feature => getValueForFeature(feature, data, options.targetField)), _lodash.isFinite));

  if (values.length === 0) {
    return {
      limits: [],
      colors: [],
      legend: []
    };
  }

  var steps = Math.min(values.length, options.steps);

  if (steps === 1) {
    return {
      limits: values,
      colors: [options.colors.max],
      legend: [{
        color: options.colors.max,
        limit: (0, _lodash.first)(values)
      }]
    };
  }

  var limits = _chromaJs.default.limits(values, options.clusteringMode, steps - 1); // Create color buckets


  var colors = _chromaJs.default.scale([options.colors.min, options.colors.max]).colors(limits.length); // Group values for legend


  var legend = (0, _lodash.map)(colors, (color, index) => ({
    color,
    limit: limits[index]
  })).reverse();
  return {
    limits,
    colors,
    legend
  };
}
//# sourceMappingURL=utils.js.map