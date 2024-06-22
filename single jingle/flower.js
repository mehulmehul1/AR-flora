console.log($fx); // logging the $fx object to the console
console.log($fx.hash);

class Flower {
  constructor(x, y, size, PorC, depth) {
    this.x = x;
    this.y = y;
    //this.size = map(size, 10, 30, 0.1, 1);
    this.size = size / 10;
    this.numPetals = hl.randomInt(3, 12);
    this.angleBetweenPetals = 360 / this.numPetals;
    this.blobObj = [];
    this.PorC = PorC; //Is parent or child
    this.ring = depth; //which ring of flower,from 0 to maxdepth

    this.creationTime = millis();

    // this.color = color;
    this.getColor = baseFlowerColor(selectedColorArrange, this.PorC, this.ring);
    let passthiscolor = this.getColor.nodeColor;
    // console.log("4 - passed to flower: " + passthiscolor);
    // console.log(passthiscolor);
    this.flowerDrawn = false;

    basePetalbrush(selectedBaseBrush, passthiscolor, this.angleBetweenPetals);
    // console.log(passthiscolor);

    // debugger;
  }

  drawFlower() {
    push();
    translate(this.x, this.y);
    this.centcircle();
    this.drawPetalsAroundCircle();
    this.finalBoundingRadius();
    this.flowerDrawn = true;

    //this.calculateBoundingRadius();
    pop();
  }

  centcircle() {
    noStroke();
    //scale(1);
    brush.beginShape(); // start to draw custom shape
    for (var i = 0; i < 36; i++) {
      var rad = 1;
      var randRad = rad + random(1, 6);
      var angle = 360 / 24;
      //var distortion = sin(frameCount * 0.05 + i * 0.05) * 50; // Apply distortion here
      var x = randRad * cos(angle * i); // x-coordinate
      var y = randRad * sin(angle * i); //  y-coordinate
      this.blobObj.push({
        rad: randRad,
        x: x,
        y: y,
      });
      brush.circle(this.blobObj[i].x, this.blobObj[i].y, 0);
      brush.vertex(this.blobObj[i].x, this.blobObj[i].y); // add points to the custom shape
    }
    brush.vertex(this.blobObj[0].x, this.blobObj[0].y);
    brush.vertex(this.blobObj[1].x, this.blobObj[1].y);
    brush.vertex(this.blobObj[2].x, this.blobObj[2].y);
    brush.endShape(); // we finish adding points
  }

  drawPetalsAroundCircle() {
    //scale(0.2);

    //a loop to call drawPetal() and draw them randomly
    //brush.scale(0.5);

    var numPetals = random(3, 12); // Number of petals
    var angleBetweenPetals = 360 / random(0, numPetals); // random angle for spacing
    //var color = this.petalColor; // Pass the angle to drawPetal

    for (var i = 0; i < numPetals; i++) {
      var angle = angleBetweenPetals * i;
      this.drawPetal(angle);
    }
    return angle;
  }

  drawPetal(angle) {
    colorMode(HSB);

    //this function is only for drawing the petal shape

    push();

    brush.beginShape();

    // Calculate the rotated coordinates for each vertex
    var vertices = [
      {
        x: this.size * (10 + hl.random(-2, 2)),
        y: this.size * (10 + hl.random(-2, 2)),
      },
      { x: this.size * 10, y: this.size * 10 },
      {
        x: this.size * (20 + hl.random(-1, 1)),
        y: this.size * (12 + hl.random(-1, 1)),
      },
      {
        x: this.size * (50 + hl.random(-2, 2)),
        y: this.size * (18 + hl.random(-2, 2)),
      },
      {
        x: this.size * (60 + hl.random(-3, 3)),
        y: this.size * (50 + hl.random(-3, 3)),
      },
      {
        x: this.size * (40 + hl.random(-2, 2)),
        y: this.size * (40 + hl.random(-2, 2)),
      },
      {
        x: this.size * 20,
        y: this.size * (30 + hl.random(-1, 1)),
      },
      {
        x: this.size * 10,
        y: this.size * 10,
      },
      {
        x: this.size * (20 + hl.random(-1, 1)),
        y: this.size * (12 + hl.random(-1, 1)),
      },
    ];

    for (var i = 0; i < vertices.length; i++) {
      var v = vertices[i];
      var rotatedX = v.x * cos(angle) - v.y * sin(angle);
      var rotatedY = v.x * sin(angle) + v.y * cos(angle);

      this.updateBoundingRadius(rotatedX, rotatedY);

      brush.vertex(rotatedX, rotatedY);
    }
    brush.endShape();
    // Reset states for next cell

    pop();
  }

  updateBoundingRadius(rotatedX, rotatedY) {
    let distToVertex = sqrt(rotatedX * rotatedX + rotatedY * rotatedY);
    if (distToVertex > this.boundingRadius) {
      this.boundingRadius = distToVertex;
    }

    return this.boundingRadius;
  }

  finalBoundingRadius() {
    noFill();
    stroke("red"); // Set stroke color to red
    circle(0, 0, this.boundingRadius * 2);
    // console.log(
    //   "boundingradius of this flower = " + floor(this.boundingRadius)
    // );
    return this.boundingRadius;
  }
}
