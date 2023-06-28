"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = prepareData;

var _d = _interopRequireDefault(require("d3"));

var _lodash = require("lodash");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function prepareData(data, options) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'scale' does not exist on type 'typeof im... Remove this comment to see the full error message
  var colorScale = _d.default.scale.category10();

  var classify = options.classify,
      latColName = options.latColName,
      lonColName = options.lonColName;
  var pointGroups = classify ? (0, _lodash.groupBy)(data.rows, classify) : {
    All: data.rows
  };
  return (0, _lodash.filter)((0, _lodash.map)(pointGroups, (rows, name) => {
    var points = (0, _lodash.filter)((0, _lodash.map)(rows, row => {
      var lat = row[latColName];
      var lon = row[lonColName];

      if ((0, _lodash.isNil)(lat) || (0, _lodash.isNil)(lon)) {
        return null;
      }

      return {
        lat,
        lon,
        row: (0, _lodash.omit)(row, [latColName, lonColName])
      };
    }));

    if (points.length === 0) {
      return null;
    }

    var result = (0, _lodash.extend)({}, options.groups[name], {
      name,
      points
    });

    if ((0, _lodash.isNil)(result.color)) {
      result.color = colorScale(name);
    }

    return result;
  }));
}
//# sourceMappingURL=prepareData.js.map