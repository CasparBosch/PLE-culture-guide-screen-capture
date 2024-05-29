let video;
let detector;
let detections = [];

function setup() {
  createCanvas(640, 480); // Create a canvas of 640x480 pixels
  video = createCapture(VIDEO, videoReady); // Capture video from the webcam
  video.size(640, 480); // Set the video size
  video.hide(); // Hide the default video element
}

function videoReady() {
  // Load the Teachable Machine model from the specified path
  const modelPath = './model/model.json';
  detector = ml5.objectDetector(modelPath, modelReady); // Initialize the object detector with the custom model
}

function gotDetections(error, results) {
  if (error) {
    console.error(error); // Log any errors
  }
  detections = results; // Update the detections array with the results
  detector.detect(video, gotDetections); // Continue detecting objects in the video
}

function modelReady() {
  detector.detect(video, gotDetections); // Start detecting objects once the model is ready
}

function draw() {
  image(video, 0, 0); // Draw the video on the canvas

  // Iterate over the detections and draw bounding boxes and labels
  for (let i = 0; i < detections.length; i += 1) {
    const object = detections[i];
    stroke(0, 255, 0); // Set the stroke color to green
    strokeWeight(4); // Set the stroke weight to 4
    noFill(); // No fill for the rectangles
    rect(object.x, object.y, object.width, object.height); // Draw the bounding box
    noStroke(); // Disable stroke for the text
    fill(255); // Set the text color to white
    textSize(24); // Set the text size to 24
    text(object.label, object.x + 10, object.y + 24); // Draw the label of the detected object
  }
}
