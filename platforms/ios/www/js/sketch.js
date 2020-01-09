// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js
=== */

let video;
let poseNet;
let poses = [];
let small = [];
let large = [];
let min;
let max;
let mean;
let diff;
function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function (results) {
    poses = results;
    if (results.length > 0 && results[0].pose) {
      //console.log(results[0])
      large = results[0].pose.keypoints;
      small = results[0].pose.keypoints;

      small.sort(function (a, b) { return a.position.x - b.position.x });
      // console.log("Small: " + small[0].position.x)
      min = small[0].position.x;
      large.sort(function (a, b) { return b.position.x - a.position.x });
      // console.log("large: " + large[0].position.x)
      max = large[0].position.x
      let mean = (min + max) / 2
      // console.log(min + "  " + max)
      // console.log("mean: " + mean)
      if (min < 10 && max > 630) {
        document.getElementById("grid").innerHTML = "Too Zoom out";
      }
      else if (mean < 214) {
        document.getElementById("grid").innerHTML = `<p style="color:red">Turn Left</p>`;
      }
      else if (mean > 428) {
        document.getElementById("grid").innerHTML = `<p style="color:red">Turn Right</p>`;
      }
      else if (mean >= 214 && mean <= 428) {
        document.getElementById("grid").innerHTML = "Be stable";
      }

      diff = results[0].pose.leftWrist.x - results[0].pose.rightWrist.x;

      if (diff < 0 || diff > 500) {
        document.getElementById("pos").innerHTML = `<p style="color:red">Too close,Cnt see, Go back</p>`;
      }
      else if (diff < 500 && diff > 200) {
        document.getElementById("pos").innerHTML = "Good Zone";
      }
      else if (diff < 200 && diff > 10) {
        document.getElementById("pos").innerHTML = `<p style="color:green">Go forward</p>`;
      }
      console.log("Accuracy_left: " + results[0].pose.leftWrist.confidence + " Accuracy_right: " + results[0].pose.rightWrist.confidence + " Total diff:" + diff)


    }
    //console.log(width)
  });
  // Hide the video element, and just show the canvas
  video.hide();
}

function modelReady() {
  select('#status').html('Model Loaded');
}

function draw() {
  image(video, 0, 0, width, height);

  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();
  drawSkeleton();
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        fill(255, 0, 0);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    }
  }
}

// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(255, 0, 0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}
