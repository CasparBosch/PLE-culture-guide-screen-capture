// const featureExtractor = ml5.featureExtractor('MobileNet',{numLabels : 3}, modelLoaded)
let video;
let detector;
let detections = [];
// const label = document.getElementById("label");

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO, videoReady);
  video.size(640, 480);
  video.hide();
}

// //loading model and custom model
// function modelLoaded() {
//   console.log('Model Loaded!')
//   classifier = featureExtractor.classification(image, videoReady)
//   classifier.load('./model\tm-my-image-model\model.json', customModelReady)
// }

// //custom model
// function customModelReady(){
//   console.log("Custom Model Is Ready")
//   label.innerText = "Model is Ready"
// }

function videoReady() {
  // Models available are 'cocossd', 'yolo'
  detector = ml5.objectDetector('cocossd', modelReady);
}

function gotDetections(error, results) {
  if (error) {
    console.error(error);
  }
  detections = results;
  detector.detect(video, gotDetections);
}

function modelReady() {
  detector.detect(video, gotDetections);
}

function draw() {
  image(video, 0, 0);

  for (let i = 0; i < detections.length; i += 1) {
    const object = detections[i];
    stroke(0, 255, 0);
    strokeWeight(4);
    noFill();
    rect(object.x, object.y, object.width, object.height);
    noStroke();
    fill(255);
    textSize(24);
    text(object.label, object.x + 10, object.y + 24);
  }
}