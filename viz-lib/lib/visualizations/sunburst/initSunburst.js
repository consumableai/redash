"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = initSunburst;

var d3 = _interopRequireWildcard(require("d3"));

var _lodash = require("lodash");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * The following is based on @chrisrzhou's example from: http://bl.ocks.org/chrisrzhou/d5bdd8546f64ca0e4366.
 */
var exitNode = "<<<Exit>>>"; // @ts-expect-error ts-migrate(2339) FIXME: Property 'scale' does not exist on type 'typeof im... Remove this comment to see the full error message

var colors = d3.scale.category10(); // helper function colorMap - color gray if "end" is detected

function colorMap(d) {
  return colors(d.name);
} // Return array of ancestors of nodes, highest first, but excluding the root.


function getAncestors(node) {
  var path = [];
  var current = node;

  while (current.parent) {
    path.unshift(current);
    current = current.parent;
  }

  return path;
}

function buildNodesFromHierarchyData(data) {
  var grouped = (0, _lodash.groupBy)(data, "sequence");
  return (0, _lodash.map)(grouped, value => {
    var sorted = (0, _lodash.sortBy)(value, "stage");
    return {
      size: value[0].value || 0,
      sequence: value[0].sequence,
      nodes: (0, _lodash.map)(sorted, i => i.node)
    };
  });
}

function buildNodesFromTableData(data) {
  var validKey = key => key !== "value";

  var dataKeys = (0, _lodash.sortBy)((0, _lodash.filter)((0, _lodash.keys)(data[0]), validKey), _lodash.identity);
  return (0, _lodash.map)(data, (row, sequence) => ({
    size: row.value || 0,
    sequence,
    nodes: (0, _lodash.compact)((0, _lodash.map)(dataKeys, key => row[key]))
  }));
}

function isDataInHierarchyFormat(data) {
  var firstRow = (0, _lodash.first)(data);
  return (0, _lodash.every)(["sequence", "stage", "node", "value"], field => (0, _lodash.has)(firstRow, field));
}

function buildHierarchy(data) {
  data = isDataInHierarchyFormat(data) ? buildNodesFromHierarchyData(data) : buildNodesFromTableData(data); // build tree

  var root = {
    name: "root",
    children: []
  };
  data.forEach(d => {
    var nodes = d.nodes;
    var size = parseInt(d.size, 10); // build graph, nodes, and child nodes

    var currentNode = root;

    var _loop = function _loop(j) {
      var children = currentNode.children;
      var nodeName = nodes[j];
      var isLeaf = j + 1 === nodes.length;

      if (!children) {
        currentNode.children = children = [];
        children.push({
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
          name: exitNode,
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
          size: currentNode.size
        });
      } // @ts-expect-error ts-migrate(2339) FIXME: Property 'name' does not exist on type 'never'.


      var childNode = (0, _lodash.find)(children, child => child.name === nodeName);

      if (isLeaf && childNode) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'children' does not exist on type 'never'... Remove this comment to see the full error message
        childNode.children = childNode.children || []; // @ts-expect-error ts-migrate(2339) FIXME: Property 'children' does not exist on type 'never'... Remove this comment to see the full error message

        childNode.children.push({
          name: exitNode,
          size
        });
      } else if (isLeaf) {
        children.push({
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
          name: nodeName,
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'number' is not assignable to type 'never'.
          size
        });
      } else {
        if (!childNode) {
          // @ts-expect-error ts-migrate(2322) FIXME: Type '{ name: any; children: never[]; }' is not as... Remove this comment to see the full error message
          childNode = {
            name: nodeName,
            children: []
          }; // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'undefined' is not assignable to ... Remove this comment to see the full error message

          children.push(childNode);
        } // @ts-expect-error ts-migrate(2322) FIXME: Type 'undefined' is not assignable to type '{ name... Remove this comment to see the full error message


        currentNode = childNode;
      }
    };

    for (var j = 0; j < nodes.length; j += 1) {
      _loop(j);
    }
  });
  return root;
}

function isDataValid(data) {
  return data && data.rows.length > 0;
}

function initSunburst(data) {
  if (!isDataValid(data)) {
    return element => {
      d3.select(element).selectAll("*").remove();
    };
  }

  data = buildHierarchy(data.rows);
  return element => {
    d3.select(element).selectAll("*").remove(); // svg dimensions

    var width = element.clientWidth;
    var height = element.offsetHeight; // Breadcrumb dimensions: width, height, spacing, width of tip/tail.

    var b = {
      w: width / 6,
      h: 30,
      s: 3,
      t: 10
    };
    var radius = Math.min(width - b.h, height - b.h) / 2 - 5;

    if (radius <= 0) {
      return;
    } // margins


    var margin = {
      top: radius,
      bottom: 50,
      left: radius,
      right: 0
    }; // Drawing variables: e.g. colors, totalSize, partitions, arcs
    // Total size of all nodes, to be used later when data is loaded

    var totalSize = 0; // create d3.layout.partition
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'layout' does not exist on type 'typeof i... Remove this comment to see the full error message

    var partition = d3.layout.partition().size([2 * Math.PI, radius * radius]).value(d => d.size); // create arcs for drawing D3 paths

    var arc = d3.svg // @ts-expect-error ts-migrate(2339) FIXME: Property 'arc' does not exist on type '(url: strin... Remove this comment to see the full error message
    .arc().startAngle(d => d.x).endAngle(d => d.x + d.dx).innerRadius(d => Math.sqrt(d.y)).outerRadius(d => Math.sqrt(d.y + d.dy));
    /**
     * Define and initialize D3 select references and div-containers
     *
     * e.g. vis, breadcrumbs, lastCrumb, summary, sunburst, legend
     */

    var vis = d3.select(element); // create and position breadcrumbs container and svg

    var breadcrumbs = vis.append("div").classed("breadcrumbs-container", true).append("svg").attr("width", width).attr("height", b.h).attr("fill", "white").attr("font-weight", 600); // create and position SVG

    var container = vis.append("div"); // create and position summary container

    var summary = container.append("div").classed("summary-container", true);
    var sunburst = container.append("div").classed("sunburst-container", true).append("svg").attr("width", radius * 2).attr("height", radius * 2).append("g").attr("transform", "translate(".concat(margin.left, ",").concat(margin.top, ")")); // create last breadcrumb element

    var lastCrumb = breadcrumbs.append("text").classed("lastCrumb", true); // Generate a string representation for drawing a breadcrumb polygon.

    function breadcrumbPoints(d, i) {
      var points = [];
      points.push("0,0");
      points.push("".concat(b.w, ",0"));
      points.push("".concat(b.w + b.t, ",").concat(b.h / 2));
      points.push("".concat(b.w, ",").concat(b.h));
      points.push("0,".concat(b.h));

      if (i > 0) {
        // Leftmost breadcrumb; don't include 6th vertex.
        points.push("".concat(b.t, ",").concat(b.h / 2));
      }

      return points.join(" ");
    } // Update the breadcrumb breadcrumbs to show the current sequence and percentage.


    function updateBreadcrumbs(ancestors, percentageString) {
      // Data join, where primary key = name + depth.
      // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
      var g = breadcrumbs.selectAll("g").data(ancestors, d => d.name + d.depth); // Add breadcrumb and label for entering nodes.

      var breadcrumb = g.enter().append("g");
      breadcrumb.append("polygon").classed("breadcrumbs-shape", true).attr("points", breadcrumbPoints).attr("fill", colorMap);
      breadcrumb.append("text").classed("breadcrumbs-text", true).attr("x", (b.w + b.t) / 2).attr("y", b.h / 2).attr("dy", "0.35em").attr("font-size", "10px").attr("text-anchor", "middle") // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
      .text(d => d.name); // Set position for entering and updating nodes.

      g.attr("transform", (d, i) => "translate(".concat(i * (b.w + b.s), ", 0)")); // Remove exiting nodes.

      g.exit().remove(); // Update percentage at the lastCrumb.

      lastCrumb.attr("x", (ancestors.length + 0.5) * (b.w + b.s)).attr("y", b.h / 2).attr("dy", "0.35em").attr("text-anchor", "middle").attr("fill", "black").attr("font-weight", 600).text(percentageString);
    } // helper function mouseover to handle mouseover events/animations and calculation
    // of ancestor nodes etc


    function mouseover(d) {
      // build percentage string
      var percentage = (100 * d.value / totalSize).toPrecision(3);
      var percentageString = "".concat(percentage, "%"); // @ts-expect-error ts-migrate(2365) FIXME: Operator '<' cannot be applied to types 'string' a... Remove this comment to see the full error message

      if (percentage < 1) {
        percentageString = "< 1.0%";
      } // update breadcrumbs (get all ancestors)


      var ancestors = getAncestors(d);
      updateBreadcrumbs(ancestors, percentageString); // update sunburst (Fade all the segments and highlight only ancestors of current segment)

      sunburst.selectAll("path").attr("opacity", 0.3);
      sunburst.selectAll("path").filter(node => ancestors.indexOf(node) >= 0).attr("opacity", 1); // update summary

      summary.html("\n      <span>Stage: ".concat(d.depth, "</span>\n      <span class='percentage' style='font-size: 2em;'>").concat(percentageString, "</span>\n      <span>").concat(d.value, " of ").concat(totalSize, "</span>\n    ")); // display summary and breadcrumbs if hidden

      summary.style("visibility", "");
      breadcrumbs.style("visibility", "");
    } // helper function click to handle mouseleave events/animations


    function click() {
      // Deactivate all segments then retransition each segment to full opacity.
      sunburst.selectAll("path").on("mouseover", null);
      sunburst.selectAll("path").transition().duration(1000).attr("opacity", 1) // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 2.
      .each("end", function endClick() {
        // @ts-expect-error ts-migrate(2683) FIXME: 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
        d3.select(this).on("mouseover", mouseover);
      }); // hide summary and breadcrumbs if visible

      breadcrumbs.style("visibility", "hidden");
      summary.style("visibility", "hidden");
    } // Build only nodes of a threshold "visible" sizes to improve efficiency
    // 0.005 radians = 0.29 degrees


    var nodes = partition.nodes(data).filter(d => d.dx > 0.005 && d.name !== exitNode); // this section is required to update the colors.domain() every time the data updates

    var uniqueNames = function uniqueNames(a) {
      var output = [];
      a.forEach(d => {
        if (output.indexOf(d.name) === -1) output.push(d.name);
      });
      return output;
    }(nodes);

    colors.domain(uniqueNames); // update domain colors
    // create path based on nodes

    var path = sunburst.data([data]).selectAll("path").data(nodes).enter().append("path").classed("nodePath", true) // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
    .attr("display", d => d.depth ? null : "none").attr("d", arc).attr("fill", colorMap).attr("opacity", 1).attr("stroke", "white").on("mouseover", mouseover); // // trigger mouse click over sunburst to reset visualization summary

    vis.on("click", click); // Update totalSize of the tree = value of root node from partition.
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.

    totalSize = path.node().__data__.value;
  };
}
//# sourceMappingURL=initSunburst.js.map