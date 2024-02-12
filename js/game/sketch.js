import { Game } from './draw.js';

let p;
let [vw, vh] = getViewportSize();
window.WIDTH = Math.min(800, vw);
window.HEIGHT = Math.min(500, vh);
window.GROUND_HEIGHT = 50;
window.GOAL_HEIGHT = 200;
window.GOAL_WIDTH = 20;

window.BALL_SIZE = 15;
window.BALL_MASS = 1;
window.firstBot = false;
window.secondBot = false;
window.GRAVITY = 0.5;
window.physicsType = 'sketch';

let aboutToReset = false; // Used for restarting
let age = 0; // Frames since reset

// Player attributes
window.PLAYER_SIZE = 15; // Radius
window.PLAYER_SPEED = 0.3;
window.PLAYER_JUMP = 10;
window.PLAYER_MASS = 8;

window.scores = [0, 0];

const sketch = (_p) => {
  window.p = _p;

  _p.setup = () => {
    window.game = new Game();
    _p.createCanvas(WIDTH, HEIGHT);
  };

  _p.draw = draw;

  _p.windowResized = () => {
    let [vw, vh] = getViewportSize();
    WIDTH = Math.min(800, vw);
    HEIGHT = Math.min(500, vh);
    p.resizeCanvas(WIDTH, HEIGHT);
  };
};

new p5(sketch, 'sketch-container');
