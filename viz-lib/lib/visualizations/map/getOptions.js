"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getOptions;

var _lodash = require("lodash");

var DEFAULT_OPTIONS = {
  latColName: "lat",
  lonColName: "lon",
  classify: null,
  groups: {},
  mapTileUrl: "//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  clusterMarkers: true,
  customizeMarkers: false,
  iconShape: "marker",
  iconFont: "circle",
  foregroundColor: "#ffffff",
  backgroundColor: "#356AFF",
  borderColor: "#356AFF",
  bounds: null,
  tooltip: {
    enabled: false,
    template: ""
  },
  popup: {
    enabled: true,
    template: ""
  }
};

function getOptions(options) {
  options = (0, _lodash.merge)({}, DEFAULT_OPTIONS, options);
  options.mapTileUrl = options.mapTileUrl || DEFAULT_OPTIONS.mapTileUrl; // Backward compatibility

  if (options.classify === "none") {
    options.classify = null;
  }

  return options;
}
//# sourceMappingURL=getOptions.js.map