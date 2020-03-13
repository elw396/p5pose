// setup initializes this to a p5.js Video instance.
let video;
var startB, easyB, moderateB, hardB;
var timerValue = 5;
let poses = [];

export function preload(){
  for(let i = 1;i <= 10; i++) {
    poses[i] = loadImage('poses/pose'+ i +'.png');
    console.log(poses);
  }
}

// p5js calls this code once when the page is loaded (and, during development,
// when the code is modified.)
export function setup() {
  createCanvas(1000, 800);
  
  startB = createButton("START");
  startB.position(width / 2 - 30, height + 40);
  startB.mousePressed(timerCountdown);

  easyB = createButton("READY");
  easyB.position(width / 4, height + 10);
  easyB.mousePressed(easyTimer);

  moderateB = createButton("MODERATE");
  moderateB.position(width / 2 - 43, height + 10);
  moderateB.mousePressed(moderateTimer);

  hardB = createButton("HARD");
  hardB.position(width * (3 / 4) - 55, height + 10);
  hardB.mousePressed(hardTimer);
  video = select("video") || createCapture(VIDEO);
  video.size(width, height);

  // Create a new poseNet method with single-pose detection. The second argument
  // is a function that is called when the model is loaded. It hides the HTML
  // element that displays the "Loading model…" text.
  const poseNet = ml5.poseNet(video, () => select("#status").hide());

  // Every time we get a new pose, apply the function `drawPoses` to it (call
  // `drawPoses(poses)`) to draw it.
  poseNet.on("pose", drawPoses);

  // Hide the video element, and just show the canvas
  video.hide();
  
}

// p5js calls this function once per animation frame. In this program, it does
// nothing---instead, the call to `poseNet.on` in `setup` (above) specifies a
// function that is applied to the list of poses whenever PoseNet processes a
// video frame.
export function draw() {
  
}

export function easyTimer() {
  timerValue = 45;
}

export function moderateTimer() {
  timerValue = 30;
}

export function hardTimer() {
  timerValue = 15;
}

export function timerCountdown() {
  setInterval(function() {
    if (timerValue > 0) {
      timerValue--;
    }
  }, 1000);
}
export function show() {
  if (mousePressed('START')) {
    image(poses[i], random(poses));
  }
}

function drawPoses(poses) {
  console.log(poses);

  // Modify the graphics context to flip all remaining drawing horizontally.
  // This makes the image act like a mirror (reversing left and right); this is
  // easier to work with.
  translate(width, 0); // move the left side of the image to the right
  scale(-1.0, 1.0);
  background("rgb(100,0,225)");
  image(video, 0, 0, video.width, video.height);
  
  drawKeypoints(poses);
  drawSkeleton(poses);
  // image(poses[1], 600, 200);
}

// Draw ellipses over the detected keypoints
function drawKeypoints(poses) {
  poses.forEach(pose =>
    pose.pose.keypoints.forEach(keypoint => {
      if (keypoint.score > 0.2) {
        fill(255, 0, 255);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 100, 100);
      }
    })
  );
}

// Draw connections between the skeleton joints.
function drawSkeleton(poses) {
  poses.forEach(pose => {
    pose.skeleton.forEach(skeleton => {
      // skeleton is an array of two keypoints. Extract the keypoints.
      const [p1, p2] = skeleton;
      console.log("p1 score =", p1.score);
      stroke(255, 0, 255);
      line(p1.position.x, p1.position.y, p2.position.x, p2.position.y);
    });
  });
}