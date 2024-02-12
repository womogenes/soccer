import Game from './draw.js';

window.scores = [0, 0];

const sketch = (_p) => {
  window.p = _p;

  _p.setup = () => {
    window.game = new Game();
    _p.createCanvas(WIDTH, HEIGHT);
    _p.frameRate(30);
  };

  _p.draw = draw;
};

new p5(sketch, 'sketch-container');
