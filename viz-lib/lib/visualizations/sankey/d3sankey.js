"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _d = _interopRequireDefault(require("d3"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable */
function center(node) {
  return node.y + node.dy / 2;
}

function value(link) {
  return link.value;
}

function Sankey() {
  var sankey = {};
  var nodeWidth = 24;
  var nodePadding = 8;
  var size = [1, 1];
  var nodes = [];
  var links = []; // Populate the sourceLinks and targetLinks for each node.
  // Also, if the source and target are not objects, assume they are indices.

  function computeNodeLinks() {
    nodes.forEach(node => {
      node.sourceLinks = [];
      node.targetLinks = [];
    });
    links.forEach(link => {
      var source = link.source;
      var target = link.target;
      if (typeof source === "number") source = link.source = nodes[link.source];
      if (typeof target === "number") target = link.target = nodes[link.target];
      source.sourceLinks.push(link);
      target.targetLinks.push(link);
    });
  } // Compute the value (size) of each node by summing the associated links.


  function computeNodeValues() {
    nodes.forEach(node => {
      node.value = Math.max(_d.default.sum(node.sourceLinks, value), _d.default.sum(node.targetLinks, value));
    });
  }

  function moveSinksRight(x) {
    nodes.forEach(node => {
      if (!node.sourceLinks.length) {
        node.x = x - 1;
      }
    });
  }

  function scaleNodeBreadths(kx) {
    nodes.forEach(node => {
      node.x *= kx;
    });
  } // Iteratively assign the breadth (x-position) for each node.
  // Nodes are assigned the maximum breadth of incoming neighbors plus one;
  // nodes with no incoming links are assigned breadth zero, while
  // nodes with no outgoing links are assigned the maximum breadth.


  function computeNodeBreadths() {
    var remainingNodes = nodes;
    var nextNodes;
    var x = 0;

    function assignBreadth(node) {
      node.x = x;
      node.dx = nodeWidth;
      node.sourceLinks.forEach(link => {
        if (nextNodes.indexOf(link.target) < 0) {
          nextNodes.push(link.target);
        }
      });
    }

    while (remainingNodes.length) {
      nextNodes = [];
      remainingNodes.forEach(assignBreadth);
      remainingNodes = nextNodes;
      x += 1;
    }

    moveSinksRight(x);
    x = Math.max(_d.default.max(nodes, n => n.x), 2); // get new maximum x value (min 2)

    scaleNodeBreadths((size[0] - nodeWidth) / (x - 1));
  }

  function computeNodeDepths(iterations) {
    var nodesByBreadth = _d.default // @ts-expect-error
    .nest().key(d => d.x).sortKeys(_d.default.ascending).entries(nodes).map(d => d.values);

    function initializeNodeDepth() {
      // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
      var ky = _d.default.min(nodesByBreadth, n => (size[1] - (n.length - 1) * nodePadding) / _d.default.sum(n, value));

      nodesByBreadth.forEach(n => {
        n.forEach((node, i) => {
          node.y = i; // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.

          node.dy = node.value * ky;
        });
      });
      links.forEach(link => {
        // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
        link.dy = link.value * ky;
      });
    }

    function relaxLeftToRight(alpha) {
      function weightedSource(link) {
        return center(link.source) * link.value;
      }

      nodesByBreadth.forEach(n => {
        n.forEach(node => {
          if (node.targetLinks.length) {
            var y = _d.default.sum(node.targetLinks, weightedSource) / _d.default.sum(node.targetLinks, value);

            node.y += (y - center(node)) * alpha;
          }
        });
      });
    }

    function resolveCollisions() {
      nodesByBreadth.forEach(nodes => {
        var n = nodes.length;
        var node;
        var dy;
        var y0 = 0;
        var i; // Push any overlapping nodes down.

        nodes.sort(ascendingDepth);

        for (i = 0; i < n; ++i) {
          node = nodes[i];
          dy = y0 - node.y;
          if (dy > 0) node.y += dy;
          y0 = node.y + node.dy + nodePadding;
        } // If the bottommost node goes outside the bounds, push it back up.


        dy = y0 - nodePadding - size[1];

        if (dy > 0) {
          y0 = node.y -= dy; // Push any overlapping nodes back up.

          for (i = n - 2; i >= 0; --i) {
            node = nodes[i];
            dy = node.y + node.dy + nodePadding - y0;
            if (dy > 0) node.y -= dy;
            y0 = node.y;
          }
        }
      });
    }

    initializeNodeDepth();
    resolveCollisions();

    for (var alpha = 1; iterations > 0; iterations -= 1) {
      relaxRightToLeft(alpha *= 0.99);
      resolveCollisions();
      relaxLeftToRight(alpha);
      resolveCollisions();
    }

    function relaxRightToLeft(alpha) {
      nodesByBreadth.slice().reverse().forEach(nodes => {
        nodes.forEach(node => {
          if (node.sourceLinks.length) {
            var y = _d.default.sum(node.sourceLinks, weightedTarget) / _d.default.sum(node.sourceLinks, value);

            node.y += (y - center(node)) * alpha;
          }
        });
      });

      function weightedTarget(link) {
        return center(link.target) * link.value;
      }
    }

    function ascendingDepth(a, b) {
      return a.y - b.y;
    }
  }

  function computeLinkDepths() {
    nodes.forEach(node => {
      node.sourceLinks.sort(ascendingTargetDepth);
      node.targetLinks.sort(ascendingSourceDepth);
    });
    nodes.forEach(node => {
      var sy = 0,
          ty = 0;
      node.sourceLinks.forEach(link => {
        link.sy = sy;
        sy += link.dy;
      });
      node.targetLinks.forEach(link => {
        link.ty = ty;
        ty += link.dy;
      });
    });

    function ascendingSourceDepth(a, b) {
      return a.source.y - b.source.y;
    }

    function ascendingTargetDepth(a, b) {
      return a.target.y - b.target.y;
    }
  } // @ts-expect-error ts-migrate(2339) FIXME: Property 'nodeWidth' does not exist on type '{}'.


  sankey.nodeWidth = function (_) {
    if (!arguments.length) return nodeWidth;
    nodeWidth = +_;
    return sankey;
  }; // @ts-expect-error ts-migrate(2339) FIXME: Property 'nodePadding' does not exist on type '{}'... Remove this comment to see the full error message


  sankey.nodePadding = function (_) {
    if (!arguments.length) return nodePadding;
    nodePadding = +_;
    return sankey;
  }; // @ts-expect-error ts-migrate(2339) FIXME: Property 'nodes' does not exist on type '{}'.


  sankey.nodes = function (_) {
    if (!arguments.length) return nodes;
    nodes = _;
    return sankey;
  }; // @ts-expect-error ts-migrate(2339) FIXME: Property 'links' does not exist on type '{}'.


  sankey.links = function (_) {
    if (!arguments.length) return links;
    links = _;
    return sankey;
  }; // @ts-expect-error ts-migrate(2339) FIXME: Property 'size' does not exist on type '{}'.


  sankey.size = function (_) {
    if (!arguments.length) return size;
    size = _;
    return sankey;
  }; // @ts-expect-error ts-migrate(2339) FIXME: Property 'layout' does not exist on type '{}'.


  sankey.layout = function (iterations) {
    computeNodeLinks();
    computeNodeValues();
    computeNodeBreadths();
    computeNodeDepths(iterations);
    computeLinkDepths();
    return sankey;
  }; // @ts-expect-error ts-migrate(2339) FIXME: Property 'relayout' does not exist on type '{}'.


  sankey.relayout = function () {
    computeLinkDepths();
    return sankey;
  }; // @ts-expect-error ts-migrate(2339) FIXME: Property 'link' does not exist on type '{}'.


  sankey.link = function () {
    var curvature = 0.5;

    function link(d) {
      var x0 = d.source.x + d.source.dx;
      var x1 = d.target.x;

      var xi = _d.default.interpolateNumber(x0, x1);

      var x2 = xi(curvature);
      var x3 = xi(1 - curvature);
      var y0 = d.source.y + d.sy + d.dy / 2;
      var y1 = d.target.y + d.ty + d.dy / 2;
      return "M".concat(x0, ",").concat(y0, "C").concat(x2, ",").concat(y0, " ").concat(x3, ",").concat(y1, " ").concat(x1, ",").concat(y1);
    }

    link.curvature = _ => {
      if (!arguments.length) return curvature;
      curvature = +_;
      return link;
    };

    return link;
  };

  return sankey;
}

var _default = Sankey;
exports.default = _default;
//# sourceMappingURL=d3sankey.js.map