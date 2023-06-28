"use strict";

var _utils = require("./utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var dummy;
describe("Visualizations -> Counter -> Utils", () => {
  beforeEach(() => {
    dummy = {
      rows: [{
        city: "New York City",
        population: 18604000
      }, {
        city: "Shangai",
        population: 24484000
      }, {
        city: "Tokyo",
        population: 38140000
      }],
      options: {},
      visualisationName: "Visualisation Name",
      result: {
        counterLabel: "Visualisation Name",
        counterValue: "",
        targetValue: null,
        counterValueTooltip: "",
        targetValueTooltip: ""
      }
    };
  });
  describe("getCounterData()", () => {
    describe('"Count rows" option is disabled', () => {
      test("No target and counter values return empty result", () => {
        var result = (0, _utils.getCounterData)(dummy.rows, dummy.options, dummy.visualisationName);
        expect(result).toEqual(_objectSpread({}, dummy.result, {
          showTrend: false
        }));
      });
      test('"Counter label" overrides vizualization name', () => {
        var result = (0, _utils.getCounterData)(dummy.rows, {
          counterLabel: "Counter Label"
        }, dummy.visualisationName);
        expect(result).toEqual(_objectSpread({}, dummy.result, {
          counterLabel: "Counter Label",
          showTrend: false
        }));
      });
      test('"Counter Value Column Name" must be set to a correct non empty value', () => {
        var result = (0, _utils.getCounterData)(dummy.rows, {
          rowNumber: 3
        }, dummy.visualisationName);
        expect(result).toEqual(_objectSpread({}, dummy.result, {
          showTrend: false
        }));
        var result2 = (0, _utils.getCounterData)(dummy.rows, {
          counterColName: "missingColumn"
        }, dummy.visualisationName);
        expect(result2).toEqual(_objectSpread({}, dummy.result, {
          showTrend: false
        }));
      });
      test('"Counter Value Column Name" uses correct column', () => {
        var result = (0, _utils.getCounterData)(dummy.rows, {
          counterColName: "population"
        }, dummy.visualisationName);
        expect(result).toEqual(_objectSpread({}, dummy.result, {
          counterValue: "18,604,000.000",
          counterValueTooltip: "18,604,000",
          showTrend: false
        }));
      });
      test("Counter and target values return correct result including trend", () => {
        var result = (0, _utils.getCounterData)(dummy.rows, {
          rowNumber: 1,
          counterColName: "population",
          targetRowNumber: 2,
          targetColName: "population"
        }, dummy.visualisationName);
        expect(result).toEqual(_objectSpread({}, dummy.result, {
          counterValue: "18,604,000.000",
          counterValueTooltip: "18,604,000",
          targetValue: "24484000",
          targetValueTooltip: "24,484,000",
          showTrend: true,
          trendPositive: false
        }));
        var result2 = (0, _utils.getCounterData)(dummy.rows, {
          rowNumber: 2,
          counterColName: "population",
          targetRowNumber: 1,
          targetColName: "population"
        }, dummy.visualisationName);
        expect(result2).toEqual(_objectSpread({}, dummy.result, {
          counterValue: "24,484,000.000",
          counterValueTooltip: "24,484,000",
          targetValue: "18604000",
          targetValueTooltip: "18,604,000",
          showTrend: true,
          trendPositive: true
        }));
      });
    });
    describe('"Count rows" option is enabled', () => {
      beforeEach(() => {
        dummy.result = _objectSpread({}, dummy.result, {
          counterValue: "3.000",
          counterValueTooltip: "3",
          showTrend: false
        });
      });
      test("Rows are counted correctly", () => {
        var result = (0, _utils.getCounterData)(dummy.rows, {
          countRow: true
        }, dummy.visualisationName);
        expect(result).toEqual(dummy.result);
      });
      test("Counter value is ignored", () => {
        var result = (0, _utils.getCounterData)(dummy.rows, {
          countRow: true,
          rowNumber: 3,
          counterColName: "population"
        }, dummy.visualisationName);
        expect(result).toEqual(dummy.result);
      });
      test("Target value and trend are computed correctly", () => {
        var result = (0, _utils.getCounterData)(dummy.rows, {
          countRow: true,
          targetRowNumber: 2,
          targetColName: "population"
        }, dummy.visualisationName);
        expect(result).toEqual(_objectSpread({}, dummy.result, {
          targetValue: "24484000",
          targetValueTooltip: "24,484,000",
          showTrend: true,
          trendPositive: false
        }));
      });
      test("Empty rows return counter value 0", () => {
        var result = (0, _utils.getCounterData)([], {
          countRow: true
        }, dummy.visualisationName);
        expect(result).toEqual(_objectSpread({}, dummy.result, {
          counterValue: "0.000",
          counterValueTooltip: "0"
        }));
      });
    });
  });
});
//# sourceMappingURL=utils.test.js.map