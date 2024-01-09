let colors;
let currentColor;
let previousMouseX, previousMouseY;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  // Define neon colors
  colors = [
    color(255, 0, 0),      // Neon Red
    color(0, 255, 0),      // Neon Green
    color(0, 0, 255),      // Neon Blue
    color(255, 255, 0),    // Neon Yellow
    color(255, 0, 255)     // Neon Pink
  ];

  currentColor = colors[0]; // Set initial drawing color

  // Store initial mouse position
  previousMouseX = mouseX;
  previousMouseY = mouseY;
}

function draw() {
  // Draw a line if the mouse is pressed
  if (mouseIsPressed) {
    stroke(currentColor);
    strokeWeight(3);
    line(previousMouseX, previousMouseY, mouseX, mouseY);
  }

  // Update previous mouse position
  previousMouseX = mouseX;
  previousMouseY = mouseY;

  // Draw the color palette
  drawColorPalette();
}

function drawColorPalette() {
  let paletteHeight = 50;
  let colorWidth = width / colors.length;
  noStroke();

  for (let i = 0; i < colors.length; i++) {
    fill(colors[i]);
    rect(i * colorWidth, height - paletteHeight, colorWidth, paletteHeight);
  }
}

function mousePressed() {
  // Change the color if the palette is clicked
  if (mouseY > height - 50) {
    let index = floor(mouseX / (width / colors.length));
    currentColor = colors[index];
  }
}

function windowResized() {
  // Resize the canvas when the window is resized
  resizeCanvas(windowWidth, windowHeight);
  background(0);
}
