// setup initializes this to a p5.js Video instance.
let video;
var startB, easyB, moderateB, hardB; // the buttons
var timerValue = 45;
let images = [];
let whatever;
let thang;
let array;
let timerCountdown;
let easyTimer;
let moderateTimer;
let hardTimer;


export function preload(){
  for(let i = 1;i <= 10; i++) {
    let q = loadImage("images/pose1.png");
    let w = loadImage("images/pose2.png");
    let e = loadImage("images/pose3.png");
    let r = loadImage("images/pose4.png");
    let t = loadImage("images/pose5.png");
    let y = loadImage("images/pose6.png");
    let u = loadImage("images/pose7.png");
    let k = loadImage("images/pose8.png");
    let o = loadImage("images/pose9.png");
    let p = loadImage("images/pose10.png");
    array = [q, w, e, r, t, y, u, k, o, p];
    console.log(images);
    
  }
  
}

// p5js calls this code once when the page is loaded (and, during development,
// when the code is modified.)
export function setup() {
  createCanvas(windowWidth, 800);
  background(0);
  whatever = 9;
  

  // setInterval(timeIt, 1000);

  startB = createButton("START");
  startB.position(width / 2 - 30, height + 40);
  startB.mousePressed(timerCountdown);

  easyB = createButton("EASY");
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
// video frame




export function draw() {
  // var startTime = new Date();
  // if (new Date() - startTime > 60 * 1000)
  // setTimeout(() => { … }, 60 * 1000)


 }





function drawPoses(poses) {
  
  console.log(poses);
  
  
    
    
    background(220);
    textAlign(CENTER);
  
    if (timerValue < 10) {
      text("0:0" + timerValue, width / 2, height / 2);
    } else {
      text("0:" + timerValue, width / 2, height / 2);
    }
  
  
   // Modify the graphics context to flip all remaining drawing horizontally.
  // This makes the image act like a mirror (reversing left and right); this is
  // easier to work with.
  translate(width, 0); // move the left side of the image to the right
  scale(-1.0, 1.0);
  background("rgb(20,50,50)");
  // image(video, 300, 0, video.width, video.height);
  
 drawKeypoints(poses);
  drawSkeleton(poses);
  
    
  if (frameCount % 60 == 0) {
    thang = random([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  image(array[thang], 0, 0, 300, 300);
  
    

}
function easyTimer() {
  timerValue = 45;
}

function moderateTimer() {
  timerValue = 30;
}

 function hardTimer() {
  timerValue = 15;
}

 function timerCountdown() {
  setInterval(function() {
    if (timerValue > 0) {
      timerValue--;
    }
  }, 1000);
}
// Draw ellipses over the detected keypoints
function drawKeypoints(poses) {
  poses.forEach(pose =>
    pose.pose.keypoints.forEach(keypoint => {
      if (keypoint.score > 0.2) {
        fill(255, 0, 255);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 50, 50);
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
      strokeWeight(10);
    });
  });
}}