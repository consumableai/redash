"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Renderer;

var _d2 = _interopRequireDefault(require("d3"));

var _d3Cloud = _interopRequireDefault(require("d3-cloud"));

var _lodash = require("lodash");

var _react = _interopRequireWildcard(require("react"));

var _resizeObserver = _interopRequireDefault(require("../../services/resizeObserver"));

var _propTypes = require("../prop-types");

require("./renderer.less");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function computeWordFrequencies(rows, column) {
  var result = {};
  (0, _lodash.each)(rows, row => {
    var wordsList = (0, _lodash.toString)(row[column]).split(/\s/g);
    (0, _lodash.each)(wordsList, d => {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      result[d] = (result[d] || 0) + 1;
    });
  });
  return result;
}

function getWordsWithFrequencies(rows, wordColumn, frequencyColumn) {
  var result = {};
  (0, _lodash.each)(rows, row => {
    var count = parseFloat(row[frequencyColumn]);

    if (Number.isFinite(count) && count > 0) {
      var word = (0, _lodash.toString)(row[wordColumn]); // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message

      result[word] = count;
    }
  });
  return result;
}

function applyLimitsToWords(words, _ref) {
  var wordLength = _ref.wordLength,
      wordCount = _ref.wordCount;
  wordLength.min = Number.isFinite(wordLength.min) ? wordLength.min : null;
  wordLength.max = Number.isFinite(wordLength.max) ? wordLength.max : null;
  wordCount.min = Number.isFinite(wordCount.min) ? wordCount.min : null;
  wordCount.max = Number.isFinite(wordCount.max) ? wordCount.max : null;
  return (0, _lodash.filter)(words, (_ref2) => {
    var text = _ref2.text,
        count = _ref2.count;
    var wordLengthFits = (!wordLength.min || text.length >= wordLength.min) && (!wordLength.max || text.length <= wordLength.max);
    var wordCountFits = (!wordCount.min || count >= wordCount.min) && (!wordCount.max || count <= wordCount.max);
    return wordLengthFits && wordCountFits;
  });
}

function prepareWords(rows, options) {
  var result = [];

  if (options.column) {
    if (options.frequenciesColumn) {
      result = getWordsWithFrequencies(rows, options.column, options.frequenciesColumn);
    } else {
      result = computeWordFrequencies(rows, options.column);
    }

    result = (0, _lodash.sortBy)((0, _lodash.map)(result, (count, text) => ({
      text,
      count
    })), [(_ref3) => {
      var count = _ref3.count;
      return -count;
    }, (_ref4) => {
      var text = _ref4.text;
      return -text.length;
    }] // "count" desc, length("text") desc
    );
  } // Add additional attributes


  var counts = (0, _lodash.map)(result, item => item.count); // @ts-expect-error ts-migrate(2339) FIXME: Property 'scale' does not exist on type 'typeof im... Remove this comment to see the full error message

  var wordSize = _d2.default.scale.linear().domain([(0, _lodash.min)(counts), (0, _lodash.max)(counts)]).range([10, 100]); // min/max word size
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'scale' does not exist on type 'typeof im... Remove this comment to see the full error message


  var color = _d2.default.scale.category20();

  (0, _lodash.each)(result, (item, index) => {
    item.size = wordSize(item.count);
    item.color = color(index); // @ts-expect-error ts-migrate(2362) FIXME: The left-hand side of an arithmetic operation must... Remove this comment to see the full error message

    item.angle = index % 2 * 90; // make it stable between renderings
  });
  return applyLimitsToWords(result, {
    wordLength: options.wordLengthLimit,
    wordCount: options.wordCountLimit
  });
}

function scaleElement(node, container) {
  node.style.transform = null;

  var _node$getBoundingClie = node.getBoundingClientRect(),
      nodeWidth = _node$getBoundingClie.width,
      nodeHeight = _node$getBoundingClie.height;

  var _container$getBoundin = container.getBoundingClientRect(),
      containerWidth = _container$getBoundin.width,
      containerHeight = _container$getBoundin.height;

  var scaleX = containerWidth / nodeWidth;
  var scaleY = containerHeight / nodeHeight;
  node.style.transform = "scale(".concat(Math.min(scaleX, scaleY), ")");
}

function createLayout() {
  var fontFamily = window.getComputedStyle(document.body).fontFamily;
  return (// @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
    (0, _d3Cloud.default)() // make the area large enough to contain even very long words; word cloud will be placed in the center of the area
    // TODO: dimensions probably should be larger, but `d3-cloud` has some performance issues related to these values
    .size([5000, 5000]).padding(3).font(fontFamily) // @ts-expect-error ts-migrate(2339) FIXME: Property 'angle' does not exist on type 'Word'.
    .rotate(d => d.angle).fontSize(d => d.size).random(() => 0.5)
  ); // do not place words randomly - use compact layout
}

function render(container, words) {
  container = _d2.default.select(container);
  container.selectAll("*").remove();
  var svg = container.append("svg");
  var g = svg.append("g");
  g.selectAll("text").data(words).enter().append("text").style("font-size", d => "".concat(d.size, "px")).style("font-family", d => d.font).style("fill", d => d.color).attr("text-anchor", "middle").attr("transform", d => "translate(".concat([d.x, d.y], ") rotate(").concat(d.rotate, ")")).text(d => d.text);
  var svgBounds = svg.node().getBoundingClientRect();
  var gBounds = g.node().getBoundingClientRect();
  svg.attr("width", Math.ceil(gBounds.width)).attr("height", Math.ceil(gBounds.height));
  g.attr("transform", "translate(".concat(svgBounds.left - gBounds.left, ",").concat(svgBounds.top - gBounds.top, ")"));
  scaleElement(svg.node(), container.node());
}

function Renderer(_ref5) {
  var data = _ref5.data,
      options = _ref5.options;

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      container = _useState2[0],
      setContainer = _useState2[1];

  var _useState3 = (0, _react.useState)([]),
      _useState4 = _slicedToArray(_useState3, 2),
      words = _useState4[0],
      setWords = _useState4[1];

  var layout = (0, _react.useMemo)(createLayout, []); // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '() => () => layout.Cloud<cloud.W... Remove this comment to see the full error message

  (0, _react.useEffect)(() => {
    layout.words(prepareWords(data.rows, options)) // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'Word[]' is not assignable to par... Remove this comment to see the full error message
    .on("end", w => setWords(w)).start(); // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.

    return () => layout.on("end", null).stop();
  }, [layout, data, options, setWords]);
  (0, _react.useEffect)(() => {
    if (container) {
      render(container, words);
    }
  }, [container, words]);
  (0, _react.useEffect)(() => {
    if (container) {
      var unwatch = (0, _resizeObserver.default)(container, () => {
        // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
        var svg = container.querySelector("svg");

        if (svg) {
          scaleElement(svg, container);
        }
      });
      return unwatch;
    }
  }, [container]); // @ts-expect-error ts-migrate(2322) FIXME: Type 'Dispatch<SetStateAction<null>>' is not assig... Remove this comment to see the full error message

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "word-cloud-visualization-container",
    ref: setContainer
  });
}

Renderer.propTypes = _propTypes.RendererPropTypes;
//# sourceMappingURL=Renderer.js.map