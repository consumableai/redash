"use strict";

// This helper converts USA map from Mercator projection to Albers (USA)
// Usage: `node convert-projection.js > usa-albers.geo.json`
var _require = require("lodash"),
    each = _require.each,
    map = _require.map,
    filter = _require.filter; // @ts-expect-error ts-migrate(2403) FIXME: Subsequent variable declarations must have the sam... Remove this comment to see the full error message


var d3 = require("d3"); // @ts-expect-error ts-migrate(2339) FIXME: Property 'geo' does not exist on type 'typeof impo... Remove this comment to see the full error message


var albersUSA = d3.geo.albersUsa(); // @ts-expect-error ts-migrate(2339) FIXME: Property 'geo' does not exist on type 'typeof impo... Remove this comment to see the full error message

var mercator = d3.geo.mercator();

var geojson = require("./usa.geo.json");

function convertPoint(coord) {
  var pt = albersUSA(coord);
  return pt ? mercator.invert(pt) : null;
}

function convertLineString(points) {
  return filter(map(points, convertPoint));
}

function convertPolygon(polygon) {
  return map(polygon, convertLineString);
}

function convertMultiPolygon(multiPolygon) {
  return map(multiPolygon, convertPolygon);
}

each(geojson.features, feature => {
  switch (feature.geometry.type) {
    case "Polygon":
      feature.geometry.coordinates = convertPolygon(feature.geometry.coordinates);
      break;

    case "MultiPolygon":
      feature.geometry.coordinates = convertMultiPolygon(feature.geometry.coordinates);
      break;
  }
});
console.log(JSON.stringify(geojson));
//# sourceMappingURL=convert-projection.js.map