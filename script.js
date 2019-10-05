// momaPatterns
// by francesca rodriguez-sawaya
// additional code editing by aaron montoya-moraga
// for moma workshop 2019
// october 2019
// v1.0.0

// variables for debugging
let isConsoleOn = false;

// audio variables
//  mic input with p5.js
let mic;
// loudness value
let rms;
// audio analyzer for amplitude value
let audioAnalyzer;
// mininum volume threshold
let minVolume = 0.02;

// drawing variables
// current position for drawing
// let currentPos = 0;
let currentX = 0;
let currentY = 0;
// are we drawing or not, by default it is false
let isDrawing = false;
// width of squares being drawn
let squareWidth = 0;
// how many squares in X dimension
let numberSquaresX = 15;
// percentage of how big the square is
let percentageWidth = 0.9;
// rounded corner radius of squares\
let squareRadius = 7;

// user interface variables
let buttonStart = document.getElementById("buttonStart");
let buttonClear = document.getElementById("buttonClear");

// add event listeners to buttons
buttonStart.addEventListener("click", pressedStart);
buttonClear.addEventListener("click", pressedClear);

// setup() function happens once, at the beginning
// triggered by p5.js
function setup() {

  // canvas size
  createCanvas(400, 500);

  // update squareWidth
  // we want 15 squares wide
  squareWidth = width / numberSquaresX;

  // adapt to pixel density of screen
  pixelDensity(1);

  // draw with no stroke
  noStroke();

  // adjust framerate to 10 frames per second
  // this affects how often draw() is executed
  frameRate(10);

  // initialize mic input
  mic = new p5.AudioIn();

  // initialize audio analyzer of amplitude
  audioAnalyzer = new p5.Amplitude();
  // make analyzer measure loudness of mic
  audioAnalyzer.setInput(mic);

  // turn on mic
  mic.start();

  // start audio context
  touchStarted();
}

// draw() is executed on a loop, after setup()
// draw() is executed by p5.js
function draw() {

  // update current mic loudness value
  rms = mic.getLevel();

  if (isDrawing) {

    if (isConsoleOn) {
      console.log("rms:" + rms);
    }

    // update currentPos
    // check if volume is less than minVolume
    if (rms < minVolume) {

      if (isConsoleOn) {
        console.log("black");
      }

      // paint the pixel black
      fill(color(0));
      square(currentX, currentY, squareWidth*percentageWidth, squareRadius);
    }
    else {

      if (isConsoleOn) {
        console.log("white");
      }

      // paint the pixel white
      fill(color(255));
      square(currentX, currentY, squareWidth*percentageWidth, squareRadius);
      // set(currentPos%width,currentPos/width,color(255));

    }

    // update next drawing position in X axis
    currentX = currentX + squareWidth;
    // if we are trying to draw outside of canvas in X
    if (currentX > width) {
      // reset X
      currentX = 0;
      // go to next line in Y
      currentY = currentY + squareWidth;
    }

    // wraparound, when we reach the end, go back to beginning
    if (currentY > height) {
      currentX = 0;
      currentY = 0;
      isDrawing = false;
    }

  }

  // TODO: check if this is neccessary / and what it is for
  getAudioContext().state !== 'running'

}

// TODO: check if works on mobile
function touchStarted() {
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }
  let synth = new p5.MonoSynth();
  synth.play('A4', 0.5, 0, 0.2);
}

// keyPressed() is triggered when a key is pressed
// current key pressed is on global variable 'key'
// this is a p5.js function
function keyPressed() {
  // check if x was pressed
  if (key == "x") {
    // toggle console.log on and off, for debugging
    isConsoleOn = !isConsoleOn;
  }
}

// function trigggered when pressing button start/stop
function pressedStart(){
  // toggle drawing on/off
  isDrawing = !isDrawing;
}

// function trigggered when pressing button clear
function pressedClear(){
  // stop drawing
  isDrawing = false;
  // reset drawing position
  currentX = 0;
  currentY = 0;
  // clear canvas and make it white
  background(255);
}
