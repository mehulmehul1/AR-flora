function chooseStyle() {
  if (styles && styles.length) {
    // Check if `styles` array is not empty
    // Select a style from the "styles" array
    // const selectedStyle = styles[Math.floor($fx.rand() * styles.length)];
    const selectedStyle = hl.randomElement(styles);

    // const selectedStyle = styles[0];

    // console.log($fx.rand());
    // console.log($fx.hash);

    // const selectedStyle = styles[5];
    let properties_of_selectedStyle = style_info[selectedStyle];
    return properties_of_selectedStyle;
  } else {
    console.error("Styles array is empty or not defined.");
  }
}

function chooseBrush(style) {
  // Get compatible brushes of given style
  const compatibleBrushes = style.compatible_brush;

  // Select a random brush from the compatible brushes
  const selectedBrush = hl.randomElement(compatibleBrushes);

  // Retrieve brush info
  //let brushInfo = brush_info[selectedBrush];

  return selectedBrush;
}

function chooseBrushType(style) {
  // Get compatible brushes of given style
  const compatibleBrusheTypes = style.compatible_brush_type;

  // Select a random brush from the compatible brushes
  const selectedBrushType = hl.randomElement(compatibleBrusheTypes);

  // Retrieve brush info
  //let brushInfo = brush_info[selectedBrush];

  return selectedBrushType;
}

function choosePallete(style) {
  // Select a random pallete from the compatible pallete of selectedStyle
  const compColors = style.compatiblePallete;

  const selectedColors = hl.randomElement(compColors);

  let colorInfo = colorpalleteinfo[selectedColors];

  return colorInfo;
}

function chooseBackground(style) {
  // Select a random Background from the compatible backgrounds of selectedStyle

  const compBG = style.compatible_bg;

  const selectedBG = hl.randomElement(compBG);

  let BGInfo = colors[selectedBG];

  return BGInfo.color;
}

function chooseDensity(style) {
  // Select a random Background from the compatible backgrounds of selectedStyle

  const densityof = style.density;

  const selectedDensity = hl.randomElement(densityof);
  let value;
  switch (selectedDensity) {
    case "sparse":
      value = $fx.rand() * 0.5 + 3; // random value between 2.5 and 3
      break;
    case "normal":
      value = 2;
      break;
    case "medium":
      value = $fx.rand() * 0.5 + 1.0; // random value between 0.5 and 1
      break;
    case "dense":
      value = $fx.rand() * 0.5 + 0.5; // random value between 0.5 and 1
      break;
  }
  return value;
}

function chooseBranchType(style) {
  // Select a random Background from the compatible backgrounds of selectedStyle

  const compBT = style.compBranch;

  const selectedBT = compBT[Math.floor($fx.rand() * compBT.length)];

  return selectedBT;
}

let selectedStyle = chooseStyle();
var selectedBaseBrush = chooseBrush(selectedStyle);
const selectedColorPalette = choosePallete(selectedStyle);
var selectedBackground = chooseBackground(selectedStyle);
// var selectedColorArrange = chooseFromColorArrangement(selectedStyle);
var selectedColorArrange = "colorRandom";

let densityMult = chooseDensity(selectedStyle);
let branchTip = chooseBranchType(selectedStyle);

console.log(selectedColorPalette);
console.log(branchTip);

// // Get the info div
// const infoDiv = document.getElementById("info");

// // Update the info div
// infoDiv.innerHTML = `
//     <p>Style: ${Object.keys(style_info).find(
//       (key) => style_info[key] === selectedStyle
//     )}</p>

//     <p>Brush: ${selectedBaseBrush.brush} ; type:${selectedBaseBrush.b_type} </p>
//     <p>Palette: ${Object.keys(colorpalleteinfo).find(
//       (key) => colorpalleteinfo[key] === selectedColorPalette
//     )}</p>
//     <p>Background: ${Object.keys(colors).find(
//       (key) => colors[key].color === selectedBackground
//     )}</p>`;

function chooseFromColorArrangement(style) {
  // Funcction to choose one color arng from our listofColorArng and then making it selectedBrushInfo, passing into

  const compColorArn = style.compColorArng;

  // const selectedCurrentcolorarng =
  //   compColorArn[Math.floor($fx.rand() * compColorArn.length)];
  const selectedCurrentcolorarng = colorRandom;

  return selectedCurrentcolorarng;
}

// var selectedBaseBrush = chooseFromBrushBox();

function baseFlowerColor(selectedColorArrange, isparent, ring) {
  // Funcction to choose one color arrangement from available color arrangements, same as basePetalBrush()
  // Where to call this one, and how to get the results inside node
  // This function if its like basePetalBrush will be called inside makeNode function,
  //this doesnt return anything it just takes the information from that node- parentnode, depth and pallete

  // const selectedCurrentBrush = brush_boxbox[4];
  var nodeColor;

  switch (selectedColorArrange) {
    case "colorRandom":
      //   console.log(" 1 colorRandom functioncalled");

      const { randColor } = colorRandom(selectedColorPalette);
      nodeColor = randColor;
      // debugger;

      break;
    case "colorSame":
      console.log(" 1 colorInherit functioncalled");

      const { sameColor } = colorSame(selectedColorPalette, isparent);
      nodeColor = sameColor;

      break;
    case "colorCluster":
      //   console.log(" 1 colorCluster functioncalled");

      const { ringColor } = colorCluster(selectedColorPalette, ring);
      nodeColor = ringColor;
      break;

    default:
      console.log("Invalid color arrangement type");
  }

  return { nodeColor };
}

function branching(nodeA, nodeB, color) {
  let b_typ = selectedBaseBrush.b_type;
  let midPoint = [(nodeA[0] + nodeB[0]) / 2, (nodeA[1] + nodeB[1]) / 2];

  // Create an array of points for the spline
  let points = [nodeA, midPoint, nodeB];

  if (branchTip === "spline") {
    if (b_typ === "stroke" || b_typ === "s&h" || b_typ === "s&f") {
      brush.spline(points, 0.4);
    } else {
      brush.spline(points, 0.4);
    }
  } else {
    if (b_typ === "stroke" || b_typ === "s&h" || b_typ === "s&f") {
      brush.line(nodeA[0], nodeA[1], nodeB[0], nodeB[1]);
    } else {
      brush.line(nodeA[0], nodeA[1], nodeB[0], nodeB[1]);
    }
  }

  //   brush.line(points);
}

function childPos(posX, posY, pBound) {
  // let orry = orientation;
  let angleFromParent = random(360);
  let distFromParent = random(minBranchLength, maxBranchLength);

  let isHorizontalOrVertical = $fx.rand() < 0.4;
  let isHorizontal = $fx.rand() < 0.5;
  let childPosition;

  if (isHorizontalOrVertical) {
    // 30% of the time, make it horizontal or vertical
    if (isHorizontal) {
      // Make it horizontal
      childPosition = {
        x: posX + (0 + distFromParent) * cos(angleFromParent),
        y: posY + (pBound + distFromParent) * sin(angleFromParent),
      };
    } else {
      // Make it vertical
      childPosition = {
        x: posX + (pBound + distFromParent) * cos(angleFromParent),
        y: posY + (0 + distFromParent) * sin(angleFromParent),
      };
    }
  } else {
    // 70% of the time, use the original calculation
    // childPosition = {
    //   x: posX + (pBound + distFromParent) * cos(90),
    //   y: posY + (pBound + distFromParent) * sin(90),
    // };
    childPosition = {
      x: posX + (pBound + distFromParent) * cos(angleFromParent),
      y: posY + (pBound + distFromParent) * sin(angleFromParent),
    };
  }

  // childPosition = {
  //   x: posX + (pBound + distFromParent) * cos(angleFromParent),
  //   y: posY + (pBound + distFromParent) * sin(angleFromParent),
  // };

  return childPosition;
}
