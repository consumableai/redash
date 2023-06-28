"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGeoJsonFields = getGeoJsonFields;
exports.getGeoJsonBounds = getGeoJsonBounds;

var _lodash = require("lodash");

var _leaflet = _interopRequireDefault(require("leaflet"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getGeoJsonFields(geoJson) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'features' does not exist on type 'object... Remove this comment to see the full error message
  var features = (0, _lodash.isObject)(geoJson) && (0, _lodash.isArray)(geoJson.features) ? geoJson.features : [];
  return (0, _lodash.reduce)(features, // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
  (result, feature) => {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'properties' does not exist on type 'obje... Remove this comment to see the full error message
    var properties = (0, _lodash.isObject)(feature) && (0, _lodash.isObject)(feature.properties) ? feature.properties : {};
    return (0, _lodash.uniq)([...result, ...(0, _lodash.keys)(properties)]);
  }, []);
}

function getGeoJsonBounds(geoJson) {
  if ((0, _lodash.isObject)(geoJson)) {
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'object' is not assignable to par... Remove this comment to see the full error message
    var layer = _leaflet.default.geoJSON(geoJson);

    var bounds = layer.getBounds();

    if (bounds.isValid()) {
      return [// @ts-expect-error ts-migrate(2551) FIXME: Property '_southWest' does not exist on type 'LatL... Remove this comment to see the full error message
      [bounds._southWest.lat, bounds._southWest.lng], // @ts-expect-error ts-migrate(2551) FIXME: Property '_northEast' does not exist on type 'LatL... Remove this comment to see the full error message
      [bounds._northEast.lat, bounds._northEast.lng]];
    }
  }

  return null;
}
//# sourceMappingURL=utils.js.map