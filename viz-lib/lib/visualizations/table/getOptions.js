"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getOptions;

var _lodash = _interopRequireDefault(require("lodash"));

var _visualizationsSettings = require("../visualizationsSettings");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DEFAULT_OPTIONS = {
  itemsPerPage: 25,
  paginationSize: "default" // not editable through Editor

};
var filterTypes = ["filter", "multi-filter", "multiFilter"];

function getColumnNameWithoutType(column) {
  var typeSplit;

  if (column.indexOf("::") !== -1) {
    typeSplit = "::";
  } else if (column.indexOf("__") !== -1) {
    typeSplit = "__";
  } else {
    return column;
  }

  var parts = column.split(typeSplit);

  if (parts[0] === "" && parts.length === 2) {
    return parts[1];
  }

  if (!_lodash.default.includes(filterTypes, parts[1])) {
    return column;
  }

  return parts[0];
}

function getColumnContentAlignment(type) {
  return ["integer", "float", "boolean", "date", "datetime"].indexOf(type) >= 0 ? "right" : "left";
}

function getDefaultColumnsOptions(columns) {
  var displayAs = {
    integer: "number",
    float: "number",
    boolean: "boolean",
    date: "datetime",
    datetime: "datetime"
  };
  return _lodash.default.map(columns, (col, index) => ({
    name: col.name,
    type: col.type,
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    displayAs: displayAs[col.type] || "string",
    visible: true,
    order: 100000 + index,
    title: getColumnNameWithoutType(col.name),
    allowSearch: false,
    alignContent: getColumnContentAlignment(col.type),
    // `string` cell options
    allowHTML: true,
    highlightLinks: false
  }));
}

function getDefaultFormatOptions(column) {
  var dateTimeFormat = {
    date: _visualizationsSettings.visualizationsSettings.dateFormat || "DD/MM/YYYY",
    datetime: _visualizationsSettings.visualizationsSettings.dateTimeFormat || "DD/MM/YYYY HH:mm"
  };
  var numberFormat = {
    integer: _visualizationsSettings.visualizationsSettings.integerFormat || "0,0",
    float: _visualizationsSettings.visualizationsSettings.floatFormat || "0,0.00"
  };
  return {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    dateTimeFormat: dateTimeFormat[column.type],
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    numberFormat: numberFormat[column.type],
    booleanValues: _visualizationsSettings.visualizationsSettings.booleanValues || ["false", "true"],
    // `image` cell options
    imageUrlTemplate: "{{ @ }}",
    imageTitleTemplate: "{{ @ }}",
    imageWidth: "",
    imageHeight: "",
    // `link` cell options
    linkUrlTemplate: "{{ @ }}",
    linkTextTemplate: "{{ @ }}",
    linkTitleTemplate: "{{ @ }}",
    linkOpenInNewTab: true
  };
}

function wereColumnsReordered(queryColumns, visualizationColumns) {
  queryColumns = _lodash.default.map(queryColumns, col => col.name);
  visualizationColumns = _lodash.default.map(visualizationColumns, col => col.name); // Some columns may be removed - so skip them (but keep original order)

  visualizationColumns = _lodash.default.filter(visualizationColumns, col => _lodash.default.includes(queryColumns, col)); // Pick query columns that were previously saved with viz (but keep order too)

  queryColumns = _lodash.default.filter(queryColumns, col => _lodash.default.includes(visualizationColumns, col)); // Both array now have the same size as they both contains only common columns
  // (in fact, it was an intersection, that kept order of items on both arrays).
  // Now check for equality item-by-item; if common columns are in the same order -
  // they were not reordered in editor

  for (var i = 0; i < queryColumns.length; i += 1) {
    if (visualizationColumns[i] !== queryColumns[i]) {
      return true;
    }
  }

  return false;
}

function getColumnsOptions(columns, visualizationColumns) {
  var options = getDefaultColumnsOptions(columns);

  if (wereColumnsReordered(columns, visualizationColumns)) {
    visualizationColumns = _lodash.default.fromPairs(_lodash.default.map(visualizationColumns, (col, index) => [col.name, _lodash.default.extend({}, col, {
      order: index
    })]));
  } else {
    visualizationColumns = _lodash.default.fromPairs(_lodash.default.map(visualizationColumns, col => [col.name, _lodash.default.omit(col, "order")]));
  }

  _lodash.default.each(options, col => _lodash.default.extend(col, visualizationColumns[col.name]));

  return _lodash.default.sortBy(options, "order");
}

function getOptions(options, _ref) {
  var columns = _ref.columns;
  options = _objectSpread({}, DEFAULT_OPTIONS, {}, options);
  options.columns = _lodash.default.map(getColumnsOptions(columns, options.columns), col => _objectSpread({}, getDefaultFormatOptions(col), {}, col));
  return options;
}
//# sourceMappingURL=getOptions.js.map