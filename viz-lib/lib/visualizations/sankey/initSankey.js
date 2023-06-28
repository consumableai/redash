"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = initSankey;

var _lodash = require("lodash");

var _d = _interopRequireDefault(require("d3"));

var _d3sankey = _interopRequireDefault(require("./d3sankey"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getConnectedNodes(node) {
  console.log(node); // source link = this node is the source, I need the targets

  var nodes = [];
  node.sourceLinks.forEach(link => {
    nodes.push(link.target);
  });
  node.targetLinks.forEach(link => {
    nodes.push(link.source);
  });
  return nodes;
}

function graph(data) {
  var nodesDict = {};
  var links = {};
  var nodes = [];

  var validKey = key => key !== "value"; // @ts-expect-error


  var dataKeys = (0, _lodash.sortBy)((0, _lodash.filter)((0, _lodash.keys)(data[0]), validKey), _lodash.identity);

  function normalizeName(name) {
    if (!(0, _lodash.isNil)(name)) {
      return "" + name;
    }

    return "Exit";
  }

  function getNode(name, level) {
    name = normalizeName(name);
    var key = "".concat(name, ":").concat(String(level)); // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message

    var node = nodesDict[key];

    if (!node) {
      node = {
        name
      };
      node.id = nodes.push(node) - 1; // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message

      nodesDict[key] = node;
    }

    return node;
  }

  function getLink(source, target) {
    // @ts-expect-error ts-migrate(2538) FIXME: Type 'any[]' cannot be used as an index type.
    var link = links[[source, target]];

    if (!link) {
      link = {
        target,
        source,
        value: 0
      }; // @ts-expect-error ts-migrate(2538) FIXME: Type 'any[]' cannot be used as an index type.

      links[[source, target]] = link;
    }

    return link;
  }

  function addLink(sourceName, targetName, value, depth) {
    if ((sourceName === "" || !sourceName) && depth > 1) {
      return;
    }

    var source = getNode(sourceName, depth);
    var target = getNode(targetName, depth + 1);
    var link = getLink(source.id, target.id);
    link.value += parseInt(value, 10);
  } // @ts-expect-error


  data.forEach(row => {
    addLink(row[dataKeys[0]], row[dataKeys[1]], row.value || 0, 1);
    addLink(row[dataKeys[1]], row[dataKeys[2]], row.value || 0, 2);
    addLink(row[dataKeys[2]], row[dataKeys[3]], row.value || 0, 3);
    addLink(row[dataKeys[3]], row[dataKeys[4]], row.value || 0, 4);
    addLink(row[dataKeys[4]], null, row.value || 0, 5); // this line ensures that the last stage has a corresponding exit node
  }); // @ts-expect-error ts-migrate(2339) FIXME: Property 'scale' does not exist on type 'typeof im... Remove this comment to see the full error message

  var color = _d.default.scale.category20();

  return {
    nodes: (0, _lodash.map)(nodes, d => (0, _lodash.extend)(d, {
      color: color(d.name.replace(/ .*/, ""))
    })),
    links: (0, _lodash.values)(links)
  };
}

function spreadNodes(height, data) {
  var nodesByBreadth = _d.default // @ts-expect-error ts-migrate(2339) FIXME: Property 'nest' does not exist on type 'typeof imp... Remove this comment to see the full error message
  .nest().key(d => d.x).entries(data.nodes) // @ts-expect-error
  .map(d => d.values);

  nodesByBreadth.forEach(nodes => {
    nodes = (0, _lodash.filter)((0, _lodash.sortBy)(nodes, node => -node.value), node => node.name !== "Exit"); // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.

    var sum = _d.default.sum(nodes, o => o.dy);

    var padding = (height - sum) / nodes.length;
    (0, _lodash.reduce)(nodes, (y0, node) => {
      node.y = y0;
      return y0 + node.dy + padding;
    }, 0);
  });
}

function isDataValid(data) {
  // data should contain column named 'value', otherwise no reason to render anything at all
  if (!data || !(0, _lodash.find)(data.columns, c => c.name === "value")) {
    return false;
  } // prepareData will have coerced any invalid data rows into NaN, which is verified below


  return (0, _lodash.every)(data.rows, row => (0, _lodash.every)(row, v => {
    if (!v || (0, _lodash.isString)(v)) {
      return true;
    }

    return isFinite(v);
  }));
} // will coerce number strings into valid numbers


function prepareDataRows(rows) {
  return (0, _lodash.map)(rows, row => (0, _lodash.mapValues)(row, v => {
    if (!v || (0, _lodash.isNumber)(v)) {
      return v;
    }

    return (0, _lodash.isNaN)(parseFloat(v)) ? v : parseFloat(v);
  }));
}

function initSankey(data) {
  data.rows = prepareDataRows(data.rows);

  if (!isDataValid(data)) {
    return element => {
      _d.default.select(element).selectAll("*").remove();
    };
  }

  data = graph(data.rows); // @ts-expect-error

  var format = d => _d.default.format(",.0f")(d); // TODO: editor option ?


  return element => {
    _d.default.select(element).selectAll("*").remove();

    var margin = {
      top: 10,
      right: 10,
      bottom: 10,
      left: 10
    };
    var width = element.offsetWidth - margin.left - margin.right;
    var height = element.offsetHeight - margin.top - margin.bottom;

    if (width <= 0 || height <= 0) {
      return;
    } // append the svg canvas to the page


    var svg = _d.default.select(element).append("svg").attr("class", "sankey").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(".concat(margin.left, ",").concat(margin.top, ")")); // Set the sankey diagram properties


    var sankey = (0, _d3sankey.default)().nodeWidth(15).nodePadding(10).size([width, height]);
    var path = sankey.link();
    sankey.nodes(data.nodes).links(data.links).layout(0);
    spreadNodes(height, data);
    sankey.relayout(); // add in the links

    var link = svg.append("g").selectAll(".link").data(data.links).enter().append("path").filter(l => l.target.name !== "Exit").attr("class", "link").attr("d", path).style("stroke-width", d => Math.max(1, d.dy)).sort((a, b) => b.dy - a.dy); // add the link titles

    link.append("title").text(d => "".concat(d.source.name, " \u2192 ").concat(d.target.name, "\n").concat(format(d.value)));
    var node = svg.append("g").selectAll(".node").data(data.nodes).enter().append("g").filter(n => n.name !== "Exit").attr("class", "node").attr("transform", d => "translate(".concat(d.x, ",").concat(d.y, ")"));

    function nodeMouseOver(currentNode) {
      var nodes = getConnectedNodes(currentNode);
      nodes = (0, _lodash.map)(nodes, i => i.id);
      node.filter(d => {
        if (d === currentNode) {
          return false;
        }

        return !(0, _lodash.includes)(nodes, d.id);
      }).style("opacity", 0.2);
      link.filter(l => !((0, _lodash.includes)(currentNode.sourceLinks, l) || (0, _lodash.includes)(currentNode.targetLinks, l))).style("opacity", 0.2);
    }

    function nodeMouseOut() {
      node.style("opacity", 1);
      link.style("opacity", 1);
    } // add in the nodes


    node.on("mouseover", nodeMouseOver).on("mouseout", nodeMouseOut); // add the rectangles for the nodes
    // FIXME: d is DType, but d3 will not accept a nonstandard function

    node.append("rect").attr("height", d => d.dy).attr("width", sankey.nodeWidth()).style("fill", d => d.color) // @ts-expect-error
    .style("stroke", d => _d.default.rgb(d.color).darker(2)).append("title").text(d => "".concat(d.name, "\n").concat(format(d.value))); // add in the title for the nodes

    node.append("text").attr("x", -6).attr("y", d => d.dy / 2).attr("dy", ".35em").attr("text-anchor", "end").attr("transform", null).text(d => d.name).filter(d => d.x < width / 2).attr("x", 6 + sankey.nodeWidth()).attr("text-anchor", "start");
  };
}
//# sourceMappingURL=initSankey.js.map