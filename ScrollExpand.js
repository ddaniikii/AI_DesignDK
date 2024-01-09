let rectWidth, rectHeight;  // Variables to store the rectangle's width and height

function setup() {
  createCanvas(400, 400);
  rectWidth = 150;
  rectHeight = 100;
}

function draw() {
  background(1920);

  // Draw the rectangle at the center of the canvas
  rectMode(CENTER);
  rect(width / 2, height / 2, rectWidth, rectHeight);
}

function mouseWheel(event) {
  // Update the rectangle's dimensions based on the scroll
  let scrollAmount = event.delta;

  // Adjust the size of the rectangle
  rectWidth += scrollAmount * 0.5; // You can adjust the scaling factor as needed
  rectHeight += scrollAmount * 0.5;

  // Optional: Prevent the rectangle from becoming too small or too large
  rectWidth = constrain(rectWidth, 10, width);
  rectHeight = constrain(rectHeight, 10, height);

  // Prevent default scrolling behavior
  return false;
}
