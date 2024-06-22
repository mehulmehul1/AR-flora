let brushes = brush.box();
// We define the brushes for the hatches, and the brushes for the strokes

function colorRandom(palette) {
  let weightedPalette = [];
  let totalWeight = palette.reduce(
    (sum, colorInfo) => sum + Number(colorInfo.weight),
    0
  );

  for (let colorInfo of palette) {
    let color = colors[colorInfo.color];
    let weight = (colorInfo.weight / totalWeight) * 100;
    for (let i = 0; i < weight; i++) {
      weightedPalette.push(colorInfo.color);
    }
  }

  let randomColorName = hl.randomElement(weightedPalette);

  // weightedPalette[Math.floor(hl.random() * weightedPalette.length)];
  let randColor = colors[randomColorName].color;
  return { randColor };
}

function colorSame(pallete, isparent) {
  let sameColor;
  if (isparent !== 1) {
    let colorName = pallete[Math.floor($fx.rand() * pallete.length)].color;
    sameColor = colors[colorName].color;
  }
  return { sameColor };
}

function colorCluster(pallete, depth) {
  let index = ((depth % pallete.length) + pallete.length) % pallete.length;
  let colorName = pallete[index].color;
  let ringColor = colors[colorName].color;
  return { ringColor };
}

//-------------------------------------------------------------

function basePetalbrush(brushInfo, color, angle) {
  // Test Different Flowfields here: "zigzag", "seabed", "curved", "truncated"
  brush.field("seabed");
  // let SorForH = ["stroke", "hatch", "fill", "s&h", "h&f", "s&f"];
  // var brush_type = SorForH[1];
  var brush_type = brushInfo.b_type;

  brush.reDraw();
  // brush.reBlend();

  switch (brush_type) {
    case "hatch":
      // brush.noStroke();
      brush.stroke(color);
      brush.setHatch(brushInfo.brush, color);
      // brush.fillAnimatedMode(true);

      switch (brushInfo.brush) {
        case ("2B", "HB", "2H"):
          //for 2B
          brush.hatch(random(2, 4), angle, {
            rand: false,
            continuous: true,
            gradient: 0.3,
          });
          break;
        case "rotring":
          //for rotring
          // brush.strokeWeight(random(3, 5));

          brush.hatch(random(2, 5), angle, {
            rand: false,
            continuous: false,
            gradient: random(0.2, 1),
          });
          break;
        case "pen":
          //for rotring
          // brush.strokeWeight(random(3, 5));
          brush.noStroke();
          brush.hatch(random(2, 5), angle, {
            rand: 0,
            continuous: false,
            gradient: random(0.2, 1),
          });
          break;
        case "marker2":
          //for rotring
          brush.hatch(random(2, 5), angle, {
            rand: 0,
            continuous: false,
            gradient: 1,
          });
          break;
        case "crossStitch":
          //for rotring
          // brush.field("curved");
          brush.hatch(random(1, 2), angle, {
            rand: 0,
            continuous: false,
            gradient: false,
          });
          break;
        case "oilBrush":
          //for rotring
          // brush.field("curved");
          brush.hatch(random(1, 6), angle, {
            rand: 0,
            continuous: false,
            gradient: false,
          });
          break;
        default:
          //for other cases
          brush.hatch(random(2, 4), angle, {
            rand: 0.1,
            continuous: random(0.1, 0.3),
            gradient: random(0, 0.3),
          });
          break;
      }

      break;
    case "fill":
      // Enable animated mode for consistent bleed effects in animations
      brush.set(brushInfo.brush, color);
      brush.fillAnimatedMode(true);

      switch (brushInfo.fill) {
        case "flat":
          // brush.stroke("#000");
          // brush.field("waves");
          brush.strokeWeight(1);
          brush.fill(color, 100);
          // brush.bleed(0.3, "out");
          brush.fillTexture(0, 0);
          break;
        case "med_in":
          // brush.stroke("#000");
          brush.strokeWeight(1);
          brush.fill(color, 100);
          brush.bleed(random(0.1, 0.4), "in");
          brush.fillTexture(0.1, 0);
          break;
        case "med_Out":
          // brush.stroke("#000");
          brush.strokeWeight(1);
          brush.fill(color, 100);
          brush.bleed(random(0.1, 0.4), "out");
          brush.fillTexture(0.1, 0);
          break;
        case "fullbleed":
          brush.fill(color, 100);
          brush.bleed(0.3, "in");
          brush.fillTexture(0.6, 0.5);
          break;
        default:
          brush.strokeWeight(2);
          brush.fill(color, 100);
          brush.bleed(0.3, "out");
          brush.fillTexture(random(0.1, 0.6), random(0.1, 0.6));
          break;
      }

      // console.log(brush_type + " " + selectedBrushInfo);

      break;
    case "stroke":
      brush.set(brushInfo.brush, color);
      brush.fillAnimatedMode(true);

      switch (brushInfo.brush) {
        case "rotring":
          //for rotring
          brush.strokeWeight(random(0.5, 5));
          break;
        case "cpencil":
          //for cpencil
          brush.strokeWeight(random(0.2, 0.8));
          break;
        case "charcoal":
          //for charcoal
          brush.strokeWeight(random(0.4, 1));
          break;
        case "crossStich":
          //for crossStich, field is important
          brush.field("curved");
          brush.strokeWeight(5);
          break;
        default:
          //for other cases
          brush.strokeWeight(random(0.2, 0.8));
          break;
      }

      // console.log(brush_type + " " + selectedBrushInfo);

      break;
    case "s&h":
      // console.log("color passed into brush" + " " + color);
      brush.stroke(color);
      brush.fillAnimatedMode(true);

      brush.set(brushInfo.brush, color);

      switch (brushInfo.brush) {
        case "cpencil":
          brush.strokeWeight(1);

          brush.setHatch(brushInfo.brush, color);
          brush.hatch(random(1, 3), angle, {
            rand: random(0.1, 0.3),
            continuous: false,
            gradient: 0.2,
          });
          break;
        case "crossStitch":
          brush.strokeWeight(1);

          brush.field("curved");
          //brush.set(brushInfo.brush, brushInfo.branchColor);
          // brush.set(brushInfo.brush, "#fff");

          brush.setHatch(brushInfo.brush, color);
          brush.hatch(1, 0, {
            rand: 0,
            continuous: 1,
            gradient: 0.1,
          });
          break;
        default:
          brush.strokeWeight(1);

          brush.setHatch(brushInfo.brush, color);
          brush.hatch(random(0.5, 3), angle, {
            rand: random(0.1, 0.3),
            continuous: false,
            gradient: random(0.3, 0.4),
          });
          break;
      }

      // console.log(brush_type + " " + selectedBrushInfo);
      break;

    case "s&f":
      // Enable animated mode for consistent bleed effects in animations
      brush.fillAnimatedMode(true);
      brush.set(brushInfo.brush, color);

      switch (brushInfo.brush) {
        case "rotring":
          //for rotring
          brush.strokeWeight(random(0.5, 5));
          break;
        case "cpencil":
          //for cpencil
          brush.strokeWeight(random(0.2, 0.8));
          break;
        case "charcoal":
          //for charcoal
          brush.strokeWeight(random(0.1, 0.4));
          break;
        case "crossStich":
          //for crossStich, field is important
          brush.field("curved");
          brush.strokeWeight(5);
          break;
        default:
          //for other cases
          brush.strokeWeight(random(0.2, 0.8));
          break;
      }

      switch (brushInfo.fill) {
        case "flat":
          // brush.stroke("#000");
          // brush.field("waves");
          // brush.strokeWeight(1);
          brush.fill(color, 100);
          // brush.bleed(0.3, "out");
          brush.fillTexture(0, 0);
          break;
        case "med_in":
          // brush.stroke("#000");
          // brush.strokeWeight(1);
          brush.fill(color, 100);
          brush.bleed(random(0.1, 0.4), "in");
          brush.fillTexture(0.1, 0);
          break;
        case "med_Out":
          // brush.stroke("#000");
          // brush.strokeWeight(1);
          brush.fill(color, 100);
          brush.bleed(random(0.1, 0.4), "out");
          brush.fillTexture(0.1, 0);
          break;
        case "fullbleed":
          brush.fill(color, 100);
          brush.bleed(0.3, "in");
          brush.fillTexture(0.6, 0.5);
          break;
        default:
          // brush.strokeWeight(2);
          brush.fill(color, 100);
          brush.bleed(0.3, "out");
          brush.fillTexture(random(0.1, 0.6), random(0.1, 0.6));
          break;
      }

      // console.log(brush_type + " " + selectedBrushInfo);
      break;

    case "h&f":
      // Enable animated mode for consistent bleed effects in animations
      brush.fillAnimatedMode(true);
      brush.set(brushInfo.brush, color);

      // brush.noStroke();
      switch (brushInfo.brush) {
        case "rotring":
          //for rotring
          brush.strokeWeight(random(0.5, 5));
          break;
        case "cpencil":
          //for cpencil
          brush.strokeWeight(random(0.2, 0.8));
          break;
        case "charcoal":
          //for charcoal
          brush.strokeWeight(random(0.1, 0.4));
          break;
        case "marker":
          //for crossStich, field is important
          brush.set(brushInfo.brush, color);

          brush.setHatch(brushInfo.brush, color);
          brush.hatch(random(4, 7), angle, {
            rand: 0,
            continuous: true,
            gradient: 1,
          });
          break;
        case "marker2":
          //for crossStich, field is important
          brush.set("HB", color);

          brush.setHatch(brushInfo.brush, color);
          brush.hatch(random(4, 7), angle, {
            rand: 0,
            continuous: true,
            gradient: 1,
          });
          break;
        default:
          //for other cases
          brush.setHatch(brushInfo.brush, color);
          brush.hatch(random(1, 6), angle, {
            rand: 0.1,
            continuous: false,
            gradient: 0.1,
          });
          break;
      }

      brush.setHatch(brushInfo.brush, color);
      brush.hatch(random(1, 6), angle, {
        rand: 0.1,
        continuous: false,
        gradient: 0.1,
      });
      switch (brushInfo.fill) {
        case "flat":
          // brush.stroke("#000");
          // brush.field("waves");
          brush.strokeWeight(1);
          brush.fill(color, 100);
          // brush.bleed(0.3, "out");
          brush.fillTexture(0, 0);
          break;
        case "med_in":
          // brush.stroke("#000");
          brush.strokeWeight(1);
          brush.fill(color, 100);
          brush.bleed(random(0.1, 0.4), "in");
          brush.fillTexture(0.1, 0);
          break;
        case "med_Out":
          // brush.stroke("#000");
          brush.strokeWeight(1);
          brush.fill(color, 100);
          brush.bleed(random(0.1, 0.4), "out");
          brush.fillTexture(0.1, 0);
          break;
        case "fullbleed":
          brush.fill(color, 100);
          brush.bleed(0.3, "in");
          brush.fillTexture(0.6, 0.5);
          break;
        default:
          brush.strokeWeight(2);
          brush.fill(color, 100);
          brush.bleed(0.3, "out");
          brush.fillTexture(random(0.1, 0.6), random(0.1, 0.6));
          break;
      }

      break;

    default:
      console.log("Invalid brush type");
  }

  // // Get the info div
  // const infoDiv = document.getElementById("info");

  // // Update the info div
  // infoDiv.innerHTML = `
  //   <p>Hello</p>
  //   <p>Brush type: ${brush_type}</p>
  //   <p>Brush: ${brushInfo}</p>
  //  `;
}
