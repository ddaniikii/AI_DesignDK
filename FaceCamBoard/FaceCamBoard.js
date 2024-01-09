let faceapi;
let detections = [];

let video;
let canvas;
let currentColor;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '-1');
  background(0);

  // Initialize the webcam
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  // Initialize face-api.js
  const options = new faceapi.TinyFaceDetectorOptions({ inputSize: 128, scoreThreshold: 0.5 });
  faceapi.loadTinyFaceDetectorModel('/models');
  faceapi.loadFaceExpressionModel('/models');

  // Start detecting faces
  detectFace();

  currentColor = color(255, 255, 255); // Default color
}

function draw() {
  background(0);

  // Draw video on canvas
  image(video, 0, 0, width, height);

  // Check if any face is detected
  if (detections.length > 0) {
    let emotions = detections[0].expressions;
    let maxEmotion = getMaxEmotion(emotions);

    // Change drawing color based on the dominant emotion
    switch(maxEmotion) {
      case 'angry':
        currentColor = color(255, 69, 0); // Neon Orange-Red
        break;
      case 'sad':
        currentColor = color(0, 255, 255); // Cyan Blue
        break;
      case 'happy':
        currentColor = color(255, 255, 0); // Yellow
        break;
      case 'disgusted':
        currentColor = color(0, 128, 0); // Green
        break;
      case 'neutral':
        currentColor = color(128, 128, 128); // Grey
        break;
      default:
        currentColor = color(255, 255, 255); // Default color
    }
  }

  stroke(currentColor);
  strokeWeight(4);
  if (mouseIsPressed) {
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}

function detectFace() {
  faceapi.detectAllFaces(video.elt, new faceapi.TinyFaceDetectorOptions())
    .then(results => {
      detections = results;
      setTimeout(() => detectFace(), 100);
    });
}

function getMaxEmotion(emotions) {
  let maxEmotion = '';
  let maxValue = 0;
  Object.keys(emotions).forEach(emotion => {
    if (emotions[emotion] > maxValue) {
      maxEmotion = emotion;
      maxValue = emotions[emotion];
    }
  });
  return maxEmotion;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
