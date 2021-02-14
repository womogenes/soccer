let p;
let [vw, vh] = getViewportSize();
let WIDTH = Math.min(800, vw);
let HEIGHT = Math.min(500, vh);
const GROUND_HEIGHT = 50;
const GOAL_HEIGHT = 200;

let aboutToReset = false;                                                                              // Used for restarting
let age = 0;                                                                                           // Frames since reset

// Player attributes
const PLAYER_SIZE = 15;                                                                                // Radius
const PLAYER_SPEED = 0.3;
const PLAYER_JUMP = 10;
const PLAYER_MASS = 8;

let scores = [0, 0];

let p0;
let p1;
let ball;
let entities;

const sketch = _p => {
  p = _p;

  _p.setup = () => {
    p0 = new Player(0);
    p1 = new Player(1);
    ball = new Ball();
    entities = [p0, p1, ball];

    p.createCanvas(WIDTH, HEIGHT);
  };

  _p.draw = draw;

  _p.windowResized = () => {
    let [vw, vh] = getViewportSize();
    WIDTH = Math.min(800, vw);
    HEIGHT = Math.min(500, vh);
    p.resizeCanvas(WIDTH, HEIGHT);
  }
};

new p5(sketch, 'sketch-container');