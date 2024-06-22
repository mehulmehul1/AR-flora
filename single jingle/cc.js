let styles = [
  "sunnyFreshCoolSummer",
  "birdsOfParadise",
  "chartreuse",
  "stitching",
  "flowwy",
  "markerSketchy",
  "penSketching",
];

let listofColorArng = ["colorRandom", "colorSame", "colorCluster"];

brush.add("carpetPixell", {
  type: "custom",
  weight: 50,
  vibration: 0,
  definition: 1,
  quality: 1,
  opacity: 175,
  spacing: 5,
  blend: false,
  pressure: {
    type: "standard",
    curve: (x) => 1, // If "custom", define the curve function with a curve equation from x = 0 to x = 1, returning values from 0 to 1
    min_max: [0],
  },
  tip: (_m) => {
    // in this example, the tip is composed of two squares, rotated 45 degrees
    // Always execute drawing functions within the _m buffer!
    _m.rotate(90), _m.rect(1, 1, 4, 4);
  },
  rotate: "natural",
});

brush.add("oilBrush", {
  type: "custom",
  weight: 10, // Base size of the brush tip
  vibration: 1, // Vibration of the lines, affecting spread
  opacity: 100, // Base opacity of the brush (affected by pressure)
  spacing: 0.5, // Spacing between points in the brush stroke
  blend: true, // Enables realistic color mixing
  pressure: {
    type: "custom",
    min_max: [0.5, 1.0], // Define min and max pressure
    curve: (x) => 1 - x, // Pressure curve function, linear distribution
  },
  tip: (_m) => {
    // Define the geometry of the brush tip
    // In this example, we'll create a random jagged shape
    // for (let i = -5; i <= 5; i++) {
    //   _m.ellipse(i * 1, 3, i * 2, 5); // Vertical line segments
    // }

    _m.ellipse(1, 3, 2, 5); // Vertical line segments
  },
  rotate: "random", // Defines the tip angle rotation
});

brush.add("crossStitch", {
  type: "custom",
  weight: 50,
  vibration: 0,
  definition: 1,
  quality: 10,
  opacity: 150,
  spacing: 8,
  blend: false,
  pressure: {
    type: "custom",
    curve: (x) => 1, // If "custom", define the curve function with a curve equation from x = 0 to x = 1, returning values from 0 to 1
    min_max: [0],
  },
  tip: (_m) => {
    // _m.rect(1, 1, 2, 1);
    // _m.rect(3, 3, 4, 2);
    // _m.rect(1, 1, 2, 1);

    _m.ellipse(1, 1, 6, 3);
    _m.ellipse(4, 3, 4, 1);
  },
  rotate: "natural",
});

let brush_boxbox = [
  "pen",
  "rotring",
  "2B",
  "HB",
  "2H",
  "cpencil",
  "charcoal",
  "hatch_brush",
  "marker",
  "marker2",
  "stitch",
  "crossStitch",
  "oilBrush",
];

let style_info = {
  sunnyFreshCoolSummer: {
    compatible_brush: [
      // { brush: "cpencil", b_type: "stroke" },
      { brush: "2B", b_type: "hatch" },
      { brush: "HB", b_type: "hatch" },
    ],
    compatible_bg: ["dark_cyan"],
    compatiblePallete: ["FreshCoolSummer"],
    compColorArng: ["colorRandom", "colorCluster"],
    compBranch: ["spline", "line"],
    orientation: ["random"],
    density: ["normal"],
  },
  birdsOfParadise: {
    compatible_brush: [
      { brush: "cpencil", b_type: "s&h" },
      { brush: "2B", b_type: "hatch" },
      { brush: "HB", b_type: "hatch" },
    ],
    compatible_bg: ["viridian", "deep_forest_light"],
    compatiblePallete: ["amazonGreens"],
    compColorArng: ["colorRandom"],
    compBranch: ["spline"],
    orientation: ["random"],
    density: ["dense"],
  },
  chartreuse: {
    compatible_brush: [
      // { brush: "cpencil", b_type: "s&h" },
      { brush: "pen", b_type: "s&f", fill: "flat", branchColor: "#366462" },
      // { brush: "HB", b_type: "hatch" },
    ],
    compatible_bg: ["chartreuse_bg"],
    compatiblePallete: ["chartreuse"],
    compColorArng: ["colorRandom", "colorCluster"],
    compBranch: ["spline"],
    orientation: ["random"],
    density: ["normal"],
  },
  stitching: {
    compatible_brush: [
      { brush: "crossStitch", b_type: "hatch" },
      { brush: "crossStitch", b_type: "s&h" },
      { brush: "crossStitch", b_type: "stroke" },
    ],
    compatible_bg: ["chartreuse_bg", "verylight_yellow"],
    compatiblePallete: ["vbgyr", "pppinks", "chartreuse"],
    compColorArng: ["colorRandom", "colorCluster"],
    compBranch: ["spline", "line"],
    orientation: ["random"],
    density: ["sparse", "normal"],
  },
  flowwy: {
    compatible_brush: [
      { brush: "2H", b_type: "fill", fill: "med_in" },
      { brush: "pen", b_type: "fill", fill: "med_out" },
      // { brush: "2B", b_type: "h&f", fill: "med_in" },
      { brush: "charcoal", b_type: "s&f", fill: "med_in" },
      { brush: "2H", b_type: "h&f", fill: "med_in" },
      { brush: "HB", b_type: "h&f", fill: "med_out" },
    ],
    compatible_bg: ["Cold_White", "verylight_yellow"],
    compatiblePallete: ["blue_mono", "pppinks"],
    compColorArng: ["colorRandom"],
    compBranch: ["spline", "line"],
    orientation: ["random"],
    density: ["normal", "medium"],
  },

  markerSketchy: {
    compatible_brush: [
      { brush: "marker2", b_type: "hatch" },
      { brush: "marker2", b_type: "s&f", fill: "med_in" },
      { brush: "marker2", b_type: "s&f" },
      { brush: "marker2", b_type: "h&f", fill: "med_in" },
      { brush: "marker2", b_type: "stroke" },
    ],
    compatible_bg: ["verylight_yellow", "chartreuse_bg"],
    compatiblePallete: ["pppinks", "amazonGreens"],
    compColorArng: ["colorRandom", "colorCluster"],
    compBranch: ["spline", "line"],
    orientation: ["random", "horizontal"],
    density: ["normal"],
  },

  penSketching: {
    compatible_brush: [
      { brush: "rotring", b_type: "stroke" },
      { brush: "pen", b_type: "hatch" },
      { brush: "rotring", b_type: "s&h" },
    ],
    compatible_bg: ["berryblack"],
    compatiblePallete: ["vibrant_serenity"],
    compColorArng: ["colorRandom", "colorCluster"],
    compBranch: ["spline", "line"],
    orientation: ["random", "horizontal"],
    density: ["normal"],
  },
};

function createHatchBrush() {
  //TODO: hello
}

let colors = {
  cerulean_blue: {
    name: "cerulean_blue",
    color: "#169BD3",
    oklch: { l: 84.79, c: 0.17, h: 86.06 },
  },
  dark_cyan: {
    name: "dark_cyan",
    color: "#003049",
    oklch: { l: 84.79, c: 0.17, h: 86.06 },
  },
  cad_yellow: {
    name: "cad yellow",
    color: "#FFC300",
    oklch: { l: 84.79, c: 0.17, h: 86.06 },
  },
  cad_orange: {
    name: "cad orange",
    color: "#FFA500",
    oklch: { l: 79.27, c: 0.17, h: 70.67 },
  },
  phthalo_green: {
    name: "phthalo green",
    color: "#7AA70C",
    oklch: { l: 67.09, c: 0.169, h: 126.66 },
  },
  Cold_White: {
    name: "Cold White",
    color: "#F8F8F8",
    oklch: { l: 97.92, c: 0, h: 0 },
  },
  dark_pink_red: {
    name: "dark pink-red",
    color: "#A62037",
    oklch: { l: 47.61, c: 0.17, h: 17.8 },
  },
  viridian: {
    name: "Viridian",
    color: "#40826D",
    oklch: { l: 55.7, c: 0.076, h: 170.4 },
  },
  burnt_umber: {
    name: "Burnt Umber",
    color: "#8A3324",
    oklch: { l: 44.29, c: 0.122, h: 31.98 },
  },
  jungle_green: {
    name: "Jungle Green",
    color: "#29AB87",
    oklch: { l: 66.41, c: 0.122, h: 169.38 },
  },
  moss_green: {
    name: "Moss Green",
    color: "#8A9A5B",
    oklch: { l: 65.83, c: 0.088, h: 120.51 },
  },
  deep_forest: {
    name: "Deep Forest",
    color: "#004B49",
    oklch: { l: 37.3, c: 0.064, h: 191.7 },
  },
  deep_forest_light: {
    name: "Deep Forest light",
    color: "#095452",
    oklch: { l: 40.44, c: 0.066, h: 191.96 },
  },
  fiery_red: {
    name: "Fiery Red",
    color: "#FF4500",
    oklch: { l: 66.02, c: 0.229, h: 35.4 },
  },
  sunset_orange: {
    name: "Sunset Orange",
    color: "#FF6347",
    oklch: { l: 69.62, c: 0.2, h: 33.32 },
  },
  vivid_magenta: {
    name: "Vivid Magenta",
    color: "#ff33cc",
    oklch: { l: 69.03, c: 0.27, h: 340.8 },
  },
  cyan_blue: {
    name: "cyan_blue",
    color: "#1b294b",
    oklch: { l: 28.76, c: 0.065, h: 265.61 },
  },
  chartreuse_bg: {
    name: "chartreuse_bg",
    color: "#F7FBEC",
    oklch: { l: 28.76, c: 0.065, h: 265.61 },
  },
  yellow_green: {
    name: "yellow_green",
    color: "#A8C26C",
    oklch: { l: 28.76, c: 0.065, h: 265.61 },
  },
  gin_yg: {
    name: "gin_yg",
    color: "#D1E0C8",
    oklch: { l: 28.76, c: 0.065, h: 265.61 },
  },
  laurel_green: {
    name: "laurel_green",
    color: "#A7BFA2",
    oklch: { l: 28.76, c: 0.065, h: 265.61 },
  },
  medium_dcyan: {
    name: "medium_dcyan",
    color: "#366462",
    oklch: { l: 56.98, c: 0.078, h: 352.09 },
  },
  rose_dust: {
    name: "rose_dust",
    color: "#9B647C",
    oklch: { l: 56.98, c: 0.078, h: 352.09 },
  },
  usu_iro: {
    name: "usu_iro",
    color: "#A46E96",
    oklch: { l: 60.77, c: 0.087, h: 336.54 },
  },
  newyork_pink: {
    name: "newyork_pink",
    color: "#DA7C7F",
    oklch: { l: 68.98, c: 0.117, h: 18.52 },
  },
  melon_pink: {
    name: "melon_pink",
    color: "#FEC2B8",
    oklch: { l: 86.54, c: 0.071, h: 29.37 },
  },
  light_carmine: {
    name: "light_carmine",
    color: "#F05B6E",
    oklch: { l: 67.02, c: 0.183, h: 15.99 },
  },
  papaya_whip: {
    name: "papaya_whip",
    color: "#F8EBCC",
    oklch: { l: 94.24, c: 0.043, h: 87.96 },
  },
  independence: {
    name: "independence",
    color: "#534d69",
    oklch: { l: 43.73, c: 0.046, h: 294.24 },
  },
  dark_cyanblue: {
    name: "dark_cyanblue",
    color: "#0D3A58",
    oklch: { l: 33.49, c: 0.071, h: 242.95 },
  },
  middark_cyanblue: {
    name: "middark_cyanblue",
    color: "#1E6091",
    oklch: { l: 47.27, c: 0.102, h: 245.27 },
  },
  cyanblue: {
    name: "cyanblue",
    color: "#3B86B4",
    oklch: { l: 59.3, c: 0.102, h: 238.79 },
  },
  midlight_cyanblue: {
    name: "midlight_cyanblue",
    color: "#73A8D3",
    oklch: { l: 71.1, c: 0.084, h: 243.84 },
  },
  light_cyanblue: {
    name: "light_cyanblue",
    color: "#A3C8E8",
    oklch: { l: 81.68, c: 0.06, h: 244.72 },
  },
  coral_red: {
    name: "coral_red",
    color: "#ff6b6b",
    oklch: { l: 71.16, c: 0.181, h: 22.84 },
  },
  whisper_white: {
    name: "whisper_white",
    color: "#f7fff7 ",
    oklch: { l: 99.18, c: 0.013, h: 145.47 },
  },
  deep_teal: {
    name: "deep_teal",
    color: "#1a535c",
    oklch: { l: 40.98, c: 0.059, h: 209.84 },
  },
  mint_green: {
    name: "mint_green",
    color: "#4ecdc4",
    oklch: { l: 77.62, c: 0.112, h: 188.54 },
  },
  sunflower_yellow: {
    name: "sunflower_yellow",
    color: "#ffe66d",
    oklch: { l: 92.24, c: 0.143, h: 97.78 },
  },
  black: {
    name: "black",
    color: "#000",
    oklch: { l: 0, c: 0, h: 0 },
  },
  berryblack: {
    name: "berryblack",
    color: "#0d1b2a",
    oklch: { l: 0, c: 0, h: 0 },
  },
  verylight_yellow: {
    name: "verylight_yellow",
    color: "#FDF0D5",
    oklch: { l: 95.84, c: 0.038, h: 85.35 },
  },
};

let colorpalleteinfo = {
  vibrant_serenity: [
    { color: "coral_red", weight: "0.1" },
    { color: "whisper_white", weight: "0.3" },
    { color: "deep_teal", weight: "0.2" },
    { color: "mint_green", weight: "0.1" },
    { color: "sunflower_yellow", weight: "0.3" },
  ],
  blue_mono: [
    { color: "dark_cyanblue", weight: "0.5" },
    { color: "middark_cyanblue", weight: "0.3" },
    { color: "cyanblue", weight: "0.3" },
    { color: "midlight_cyanblue", weight: "0.2" },
    { color: "light_cyanblue", weight: "0.5" },
  ],
  pppinks: [
    { color: "rose_dust", weight: "0.5" },
    { color: "usu_iro", weight: "0.3" },
    { color: "newyork_pink", weight: "0.5" },
    { color: "melon_pink", weight: "0.4" },
    { color: "cerulean_blue", weight: "0.5" },
    { color: "papaya_whip", weight: "0.5" },
  ],

  FreshCoolSummer: [
    { color: "cad_yellow", weight: "0.5" },
    { color: "cad_orange", weight: "0.5" },
    { color: "phthalo_green", weight: "0.4" },
    { color: "Cold_White", weight: "0.2" },
    { color: "dark_pink_red", weight: "0.1" },
  ],
  amazonGreens: [
    // { color: "viridian", weight: "tonic" },
    { color: "jungle_green", weight: "0.6" },
    { color: "moss_green", weight: "0.4" },
    { color: "deep_forest", weight: "0.6" },
    { color: "fiery_red", weight: "0.2" },
    { color: "vivid_magenta", weight: "0.1" },
    { color: "cyan_blue", weight: "0.1" },
  ],
  chartreuse: [
    { color: "jungle_green", weight: "0.6" },
    { color: "yellow_green", weight: "0.4" },
    { color: "gin_yg", weight: "0.6" },
    { color: "laurel_green", weight: "0.2" },
    { color: "medium_dcyan", weight: "0.1" },
  ],
  vbgyr: [
    { color: "jungle_green", weight: "0.5" },
    { color: "cad_yellow", weight: "0.4" },
    { color: "vivid_magenta", weight: "0.3" },
    { color: "cerulean_blue", weight: "0.5" },
    { color: "fiery_red", weight: "0.1" },
  ],

  // FreshCoolSummer: [colors[0], colors[1], colors[2], colors[3], colors[4]],
};

let background_info = {
  bg1: {
    color: "#fafafa",
  },
  bg2: {
    color: "#2a2a2a",
  },
  bg3: {
    color: "#fdf0d5",
  },
  cerulean_blue: {
    color: "#169BD3",
  },
};
