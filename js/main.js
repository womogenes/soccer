let p;
const WIDTH = 800;
const HEIGHT = 500;
const GROUND_HEIGHT = 50;
const GOAL_HEIGHT = 200;

let aboutToReset = false;      // Used for restarting

// Physics
const GRAVITY = 0.5;

// Player attributes
const PLAYER_SIZE = 15;        // Radius
const PLAYER_SPEED = 0.3;
const PLAYER_JUMP = 10;
const PLAYER_MASS = 5;

let scores = [0, 0];

// Ball o.O
const BALL_SIZE = 15;
const BALL_MASS = 1;

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
};

new p5(sketch, 'sketch-container');

let restart = () => {
  aboutToReset = false;

  for (let p of [p0, p1]) {
    p.x = 50 + (WIDTH - 50 * 2) * p.team;
    p.y = HEIGHT - GROUND_HEIGHT - PLAYER_SIZE;
    p.vx = 0;
    p.vy = 0;
  }

  ball.x = WIDTH / 2
  ball.y = HEIGHT / 2;
  ball.vx = random(-1, 1);
  ball.vy = 5;
};