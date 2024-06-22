let minBranchLength = 30;
let maxBranchLength = 40;
let allNodes = [];
let edges = [];
let counter = 0;
var PAD = 80;

class Node {
  constructor(parentNode, position, s, depth) {
    this.parentNode = parentNode;

    this.isparent = 0;

    if (this.parentNode) {
      this.isparent = 1;
    }

    this.childrenNodes = [];

    this.position = position;
    this.scal = s;

    this.depth = depth;
    this.active = true;

    // console.log("P - node: " + this.isparent);

    this.flower = new Flower(
      this.position.x,
      this.position.y,
      this.scal,
      this.isparent,
      this.depth
    );

    // debugger;
    let drawthisflower = this.flower;
    this.id = counter++;

    //this.flowerBoundingRadius = drawthisflower.boundingRadius;
    this.potentialBounding = potentialBoundingRadius(this.scal) * densityMult;
    // this.potentialBoundingY = potentialBoundingRadius(this.scal) * 2;

    this.flowerDrawn = false;

    this.attemptGrowth = function () {
      if (this.depth > 0) {
        let childScale = max(this.scal * 0.85, 2);

        let childPosition = childPos(
          this.position.x,
          this.position.y,
          this.potentialBounding
        );

        let child = new Node(this, childPosition, childScale, this.depth - 1);

        let edge = {
          p1: { x: childPosition.x, y: childPosition.y },
          p2: { x: this.position.x, y: this.position.y },
        };
        let placeable = true;

        for (let n = 0; n < allNodes.length; n++) {
          if (child.intersects(allNodes[n]) || this.boundaryCheck()) {
            placeable = false;
            return false;
          }
        }

        for (let n = 0; n < edges.length; n++) {
          if (
            nodeEdgeCollision(child, edges[n]) <
            child.potentialBounding / 2 + 20
          ) {
            //console.log(nodeEdgeCollision(child, edges[n]));
            placeable = false;
            return false;
          }

          if (edgeIntersect(edge, edges[n])) {
            placeable = false;
            return false;
          }
        }

        if (placeable) {
          allNodes.push(child);
          this.childrenNodes.push(child);
          //this.childrenFlowers.push(childFlower); // This should probably be childFlower, not childflower
          edges.push(edge);
          return true;
        }
      }
    };

    this.grow = function () {
      let hasGrown = this.attemptGrowth();
      if (!hasGrown) {
        for (let child of this.childrenNodes) {
          child.grow();
        }
      }
    };

    this.intersects = function (otherNode) {
      let inter = false;
      if (
        this.id != otherNode.id &&
        dist(
          this.position.x,
          this.position.y,
          otherNode.position.x,
          otherNode.position.y
        ) <
          this.potentialBounding / 2 + otherNode.potentialBounding / 2 + 10
      ) {
        inter = true;
      }
      return inter;
    };

    this.boundaryCheck = function () {
      if (
        this.position.x - this.potentialBounding < padding - width / 2 ||
        this.position.x + this.potentialBounding > width / 2 - padding ||
        this.position.y - this.potentialBounding < padding - height / 2 ||
        this.position.y + this.potentialBounding > height / 2 - padding
      ) {
        return true;
      }
      return false;
    };

    this.display = function () {
      stroke("#9be3d6");
      // text(maxdepth - this.depth, this.position.x, this.position.y); // Display "C" at the node's coordinates

      // if (parentNode === null) {
      //   fill("#d62828"); // Set fill color to white for visibility
      //   text("P", this.position.x, this.position.y); // Display "P" at the node's coordinates
      // } else {
      //   fill("#6a994e"); // Set fill color to white for visibility
      //   text("C", this.position.x, this.position.y); // Display "C" at the node's coordinates
      // }
      // text(this.id, this.position.x, this.position.y + 20); // Display "C" at the node's coordinates

      // text((maxDepth - this.depth) % 5, this.position.x + 20, this.position.y); // Display "C" at the node's coordinates

      // If the flower is already drawn, skip drawing
      if (this.flowerDrawn) {
        return;
      }

      // Draw a line to the parent node if it exists
      if (parentNode != null) {
        branching(
          [this.position.x, this.position.y],
          [this.parentNode.position.x, this.parentNode.position.y]
        );
      }
      // Draw the flower
      drawthisflower.drawFlower();
      this.nodeRadius = this.flowerBoundingRadius;
      // console.log(
      //   "boundingradius of this flower = " + floor(this.flowerBoundingRadius)
      // );
      // console.log(
      //   "potentialBounding of this flower = " + floor(this.potentialBounding)
      // );
      // console.log("scale of this flower = " + floor(this.scal));
      //console.log("node size = " + this.flowerBoundingRadius);

      // Set the flag to true to indicate the flower has been drawn
      this.flowerDrawn = true;
    };

    this.returnPositionAndSize = function () {
      return {
        positionX: this.position.x,
        positionY: this.position.y,
        radius: this.scal,
      };
    };
  }
}

//Collision prevention
function dist2(v, w) {
  return sq(v.x - w.x) + sq(v.y - w.y);
}
//
function distToSegmentSquared(node, edge) {
  p = node.position;
  v = edge.p1;
  w = edge.p2;

  var l2 = dist2(v, w);
  if (l2 == 0) return dist2(p, v);
  var t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
  t = Math.max(0, Math.min(1, t));
  return dist2(p, { x: v.x + t * (w.x - v.x), y: v.y + t * (w.y - v.y) });
}

function nodeEdgeCollision(p, v, w) {
  return sqrt(distToSegmentSquared(p, v, w));
}

// returns true if the line from (a,b)->(c,d) intersects with (p,q)->(r,s)
function edgeIntersect(edge1, edge2) {
  let [a, b] = [edge1.p1.x, edge1.p1.y];
  let [c, d] = [edge1.p2.x, edge1.p2.y];
  let [p, q] = [edge2.p1.x, edge2.p1.y];
  let [r, s] = [edge2.p2.x, edge2.p2.y];

  var det, gamma, lambda;
  det = (c - a) * (s - q) - (r - p) * (d - b);
  if (det === 0) {
    return false;
  } else {
    lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
    gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
    return 0 < lambda && lambda < 1 && 0 < gamma && gamma < 1;
  }
}

function potentialBoundingRadius(scale) {
  //this calculates the potential bounding radius of a flower, based on the scale input it gets from its node
  scale = scale / 20;

  const vertices = [
    { x: scale * (10 + 2), y: scale * (10 + 2) },
    { x: scale * 10, y: scale * 10 },
    { x: scale * (20 + 1), y: scale * (12 + 1) },
    { x: scale * (50 + 2), y: scale * (18 + 2) },
    { x: scale * (60 + 3), y: scale * (50 + 3) },
    { x: scale * (40 + 2), y: scale * (40 + 2) },
    { x: scale * 20, y: scale * (30 + 1) },
    { x: scale * 1, y: scale * 10 },
    { x: scale * (20 + 1), y: scale * (12 + 1) },
  ];
  let maxDistFromOrigin = 0;

  for (let v of vertices) {
    let distFromOrigin = sqrt(v.x * v.x + v.y * v.y);
    if (distFromOrigin > maxDistFromOrigin) {
      maxDistFromOrigin = distFromOrigin;
    }
  }

  // maxDistFromOrigin = maxDistFromOrigin/2;
  return maxDistFromOrigin;
}
