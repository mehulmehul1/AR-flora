//////////////////////////////////////////////////
// Object for creation and real-time resize of canvas
// Good function to create canvas and resize functions. I use this in all examples.
const C = {
  loaded: false,
  prop() {
    return this.height / this.width;
  },
  isLandscape() {
    return window.innerHeight <= window.innerWidth * this.prop();
  },
  resize() {
    if (this.isLandscape()) {
      console.log("yes");
      document.getElementById(this.css).style.height = "100%";
      document.getElementById(this.css).style.removeProperty("width");
    } else {
      document.getElementById(this.css).style.removeProperty("height");
      document.getElementById(this.css).style.width = "100%";
    }
  },
  setSize(w, h, p, css) {
    (this.width = w), (this.height = h), (this.pD = p), (this.css = css);
  },
  createCanvas() {
    (this.main = createCanvas(this.width, this.height, WEBGL)),
      pixelDensity(this.pD),
      this.main.id(this.css),
      this.resize();
  },
};

function windowResized() {
  C.resize();
}

let p5Seed = hl.random() * 999999;

//////////////////////////////////////////////////
// The example really starts here

// import { Poline } from "poline.min.js";

function saveImage() {
  saveCanvas("myImage", "png");
}

var rad;
let pg;
let padding = 100;

let drawCounter = 1;
const maxDrawLoops = 10;
var res;
var angle;
var blobObj = [];

let maxDepth = 35;

let sourceN = hl.random(1, 4);
// let sourceN = 3;

let sourceNodes = [];
var sourceNode;
var sourceflower;

let allflowers = []; // array of objects that holds blob attributes

let num_rows = 6;
let num_cols = 6;
let poline;
let pol_colors;

let clickPosition = { x: 0, y: 0 };

let font;

function preload() {
  font = loadFont("Switzer-Semibold.ttf");
}

let shouldDrawShape = true;

function setup() {
  frameRate(60);
  C.setSize(600, 600, 1, "mainCanvas");
  C.createCanvas();
  textFont(font);
  textSize(24);
  randomSeed(p5Seed);

  angleMode(DEGREES);
  orbitControl();
  //noLoop();
  background(selectedBackground);
  // background("#fff");

  // drawFlowerInTimeInterval();

  // let flower = new Flower(
  //   clickPosition.x,
  //   clickPosition.y,
  //   hl.randomInt(20, 30),
  //   maxDepth
  // );
  // allflowers.push(flower);

  // for (let index = 0; index < sourceN; index++) {
  //   let flower = new Flower(
  //     hl.random(padding * 1.5 - width / 2, width / 2 - padding * 1.5),
  //     hl.random(padding * 1.5 - height / 2, height / 2 - padding * 1.5),
  //     hl.randomInt(10, 30),
  //     maxDepth
  //   );
  //   allflowers.push(flower);
  // }

  let currentTime = millis();

  const pattern = floor(hl.random(1, 3)) + 3;
  let angleOffset;
  switch (pattern) {
    case 3:
      angleOffset = TWO_PI / 3;
      break;
    case 4:
      angleOffset = TWO_PI / 4;
      break;
    case 5:
      angleOffset = TWO_PI / 5;
      break;
  }

  for (let i = 0; i < sourceN; i++) {
    sourceNode = new Node(
      null,
      {
        x: random(-padding + width / 2, padding - width / 2),
        y: random(-padding + height / 2, padding - height / 2),
      },
      round(random(10, 20)),
      maxDepth
    );
    let angle = i * angleOffset;

    //sourceNode.flowerBoundingRadius = sourceNode.updateBoundingRadius();
    let placeable = true;

    for (let k = 0; k < sourceNodes.length; k++) {
      if (
        dist(
          sourceNode.position.x,
          sourceNode.position.y,
          sourceNodes[k].position.x,
          sourceNodes[k].position.y
        ) <
          sourceNode.potentialBounding / 2 +
            sourceNodes[k].potentialBounding / 2 +
            25 ||
        sourceNode.boundaryCheck()
      ) {
        placeable = false;
      }
    }

    if (placeable) {
      sourceNodes.push(sourceNode);
      allNodes.push(sourceNode);
    }
  }

  // Draw remaining flowers

  // Listen for a key press event
  document.addEventListener("keydown", function (event) {
    // Check if the pressed key is the 'e' key (you can change this to any key you want)
    if (event.key === "s") {
      // Call the function to export the canvas as a PNG image
      saveImage();
      // exportCanvasAsPNG(canvas);
    }
  });

  // document.getElementById("saveButton").addEventListener("click", saveImage);
}

function draw() {
  // Remove old flowers
  // background(selectedBackground);

  drawCounter++;

  // for (let node of sourceNodes) {
  //   node.grow();
  //   //drawFlowersFromNode(node);
  // }

  for (let n = 0; n < allNodes.length; n++) {
    allNodes[n].display();
  }

  if (drawCounter >= maxDrawLoops) {
    noLoop(); // Stop the drawing loop
  }

  // for (let i = 0; i < allflowers.length; i++) {
  //   let flower = allflowers[i];

  //   if (!flower.flowerDrawn) {
  //     flower.drawFlower();
  //     console.log("flower drawn");
  //   }
  // }

  drawCounter++;

  // if (drawCounter >= maxDrawLoops) {
  //   noLoop(); // Stop the drawing loop
  // }
  hl.token.capturePreview();
  $fx.preview();
}

function drawFlowersFromNode(node) {
  if (node == null) return;

  // Apply the same process for each child of the current node
  for (let child of node.childrenNodes) {
    drawFlowersFromNode(child);
  }
}
