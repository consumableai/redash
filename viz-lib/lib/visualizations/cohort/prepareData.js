"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = prepareData;

var _lodash = _interopRequireDefault(require("lodash"));

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var momentInterval = {
  weekly: "weeks",
  daily: "days",
  monthly: "months"
};

function groupData(sortedData) {
  var result = {};

  _lodash.default.each(sortedData, item => {
    var date = (0, _moment.default)(item.date);
    var groupKey = date.valueOf(); // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message

    result[groupKey] = result[groupKey] || {
      date,
      total: parseInt(item.total, 10) || 0,
      values: {}
    }; // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message

    result[groupKey].values[item.stage] = parseInt(item.value, 10) || null;
  });

  return _lodash.default.values(result);
}

function prepareDiagonalData(sortedData, options) {
  var timeInterval = options.timeInterval;
  var grouped = groupData(sortedData);

  var firstStage = _lodash.default.min(_lodash.default.map(sortedData, i => i.stage)); // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.


  var stageCount = (0, _moment.default)(_lodash.default.last(grouped).date).diff(_lodash.default.first(grouped).date, momentInterval[timeInterval]);
  var lastStage = firstStage + stageCount;
  var previousDate = null;
  var data = [];

  _lodash.default.each(grouped, group => {
    if (previousDate !== null) {
      // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
      var diff = Math.abs(previousDate.diff(group.date, momentInterval[timeInterval]));

      while (diff > 1) {
        var _row = [0];

        for (var stage = firstStage; stage <= lastStage; stage += 1) {
          // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
          _row.push(group.values[stage] || 0);
        }

        data.push(_row); // It should be diagonal, so decrease count of stages for each next row

        lastStage -= 1;
        diff -= 1;
      }
    } // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.


    previousDate = group.date; // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.

    var row = [group.total];

    for (var _stage = firstStage; _stage <= lastStage; _stage += 1) {
      // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
      row.push(group.values[_stage] || 0);
    } // It should be diagonal, so decrease count of stages for each next row


    lastStage -= 1;
    data.push(row);
  });

  return data;
}

function prepareSimpleData(sortedData, options) {
  var timeInterval = options.timeInterval;
  var grouped = groupData(sortedData);

  var stages = _lodash.default.map(sortedData, i => i.stage);

  var firstStage = _lodash.default.min(stages);

  var lastStage = _lodash.default.max(stages);

  var previousDate = null;
  var data = [];

  _lodash.default.each(grouped, group => {
    if (previousDate !== null) {
      // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
      var diff = Math.abs(previousDate.diff(group.date, momentInterval[timeInterval]));

      while (diff > 1) {
        data.push([0]);
        diff -= 1;
      }
    } // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.


    previousDate = group.date; // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.

    var row = [group.total];

    for (var stage = firstStage; stage <= lastStage; stage += 1) {
      // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
      row.push(group.values[stage]);
    }

    data.push(row);
  });

  return data;
}

function isDataValid(rawData, options) {
  var columnNames = _lodash.default.map(rawData.columns, c => c.name);

  return rawData.rows.length > 0 && _lodash.default.includes(columnNames, options.dateColumn) && _lodash.default.includes(columnNames, options.stageColumn) && _lodash.default.includes(columnNames, options.totalColumn) && _lodash.default.includes(columnNames, options.valueColumn);
}

function prepareData(rawData, options) {
  if (!isDataValid(rawData, options)) {
    return {
      data: [],
      initialDate: null
    };
  }

  rawData = _lodash.default.map(rawData.rows, item => ({
    date: item[options.dateColumn],
    stage: parseInt(item[options.stageColumn], 10),
    total: parseFloat(item[options.totalColumn]),
    value: parseFloat(item[options.valueColumn])
  }));

  var sortedData = _lodash.default.sortBy(rawData, r => r.date + r.stage);

  var initialDate = (0, _moment.default)(sortedData[0].date).toDate();
  var data;

  switch (options.mode) {
    case "simple":
      data = prepareSimpleData(sortedData, options);
      break;

    default:
      data = prepareDiagonalData(sortedData, options);
      break;
  }

  return {
    data,
    initialDate
  };
}
//# sourceMappingURL=prepareData.js.map