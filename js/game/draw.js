import { Player } from './Player.js';
import { Ball } from './Ball.js';

const dist = (x1, y1, x2, y2) => {
  return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
};

class Game {
  constructor() {
    this.p0 = new Player(0);
    this.p1 = new Player(1);
    this.ball = new Ball();
    this.winner = null;
    this.age = 0;
  }

  /*
  Notes:
    Fast games are 150+ ticks, longer games can go up to 500 ticks
  */

  update() {
    let { p0, p1, ball } = this;

    this.age++;

    p0.control([
      p0.pos.x / WIDTH,
      p1.pos.x / WIDTH,
      ball.pos.x / WIDTH,
      p0.pos.y / HEIGHT,
      p1.pos.y / HEIGHT,
      ball.pos.y / HEIGHT,
      p0.vel.x / 6,
      p0.vel.y / 10,
      p1.vel.y / 6,
      p1.vel.y / 10,
    ]);
    p1.moveAutomatic(ball, this.age);

    p0.update();
    p1.update();
    ball.update(p0, p1);

    // Update players
    for (let player of [p0, p1]) {
      let d = dist(player.pos.x, player.pos.y, ball.pos.x, ball.pos.y);

      if (d < PLAYER_SIZE + BALL_SIZE) {
        // Player collides with ball
        player.vel.x +=
          (((player.pos.x - ball.pos.x) * BALL_MASS) / PLAYER_MASS) * 0.1;
        player.vel.y +=
          (((player.pos.y - ball.pos.y) * BALL_MASS) / PLAYER_MASS) * 0.1;

        ball.vel.x +=
          (((ball.pos.x - player.pos.x) * PLAYER_MASS) / BALL_MASS) *
          0.01 *
          (Math.abs(player.vel.x) + 1);
        ball.vel.y +=
          (((ball.pos.y - player.pos.y) * PLAYER_MASS) / BALL_MASS) *
          0.01 *
          (Math.abs(player.vel.x) + 1);

        if (player.vel.y >= ball.vel.y) {
          ball.vel.y -= 1.0 * Math.abs(player.vel.x);
        }
      }
    }

    if (ball.pos.y >= HEIGHT - GROUND_HEIGHT - GOAL_HEIGHT) {
      if (ball.pos.x < BALL_SIZE + GOAL_WIDTH) {
        this.winner = 1;
      } else if (ball.pos.x > WIDTH - (BALL_SIZE + GOAL_WIDTH)) {
        this.winner = 0;
      }
    }
  }

  display(p) {
    p.background('#222');

    // Goals
    p.strokeWeight(2);
    p.stroke('#eee');
    p.noFill();
    p.rect(
      1,
      HEIGHT - GROUND_HEIGHT - GOAL_HEIGHT,
      GOAL_WIDTH,
      GOAL_HEIGHT + 10
    );

    p.fill('#eee');
    p.rect(
      WIDTH - 21,
      HEIGHT - GROUND_HEIGHT - GOAL_HEIGHT,
      GOAL_WIDTH,
      GOAL_HEIGHT + 10
    );

    // Ground
    p.noStroke();
    p.fill('#444');
    p.rect(0, HEIGHT - GROUND_HEIGHT, WIDTH, GROUND_HEIGHT);

    // Draw score
    p.fill('#fff6');
    p.textSize(128);
    p.textStyle('bold');
    p.textAlign('center', 'top');
    p.textFont('Inter');
    p.text(scores[0], 200, 100);
    p.text(scores[1], WIDTH - 200, 100);

    // Draw players & ball
    [this.p0, this.p1, this.ball].forEach((x) => x.display(p));
  }
}

let score = (network) => {
  let rounds = 20;
  let fitness = 0;
  for (let i = 0; i < rounds; i++) {
    let game = new Game();
    game.p0.network = network;
    while (game.age < 1000 && game.winner === null) {
      game.update();
    }
    if (game.winner === 0) fitness += 1;
    if (game.winner === null) fitness += 0;
  }
  return fitness / rounds;
};

let neat = new neataptic.Neat(10, 2, score, {
  // https://wagenaartje.github.io/neataptic/docs/methods/mutation/
  /* mutation: [
    neataptic.methods.mutation.ADD_NODE,
    neataptic.methods.mutation.ADD_CONN,
    neataptic.methods.mutation.MOD_WEIGHT,
    neataptic.methods.mutation.MOD_BIAS,
    neataptic.methods.mutation.MOD_ACTIVATION,
  ], */
  mutation: neataptic.methods.mutation.ALL,
  popsize: 50,
  mutationRate: 0.5,
  mutationAmount: 1,
  elitism: 5,
});
window.neat = neat;

let pauseEvolution;
window.pauseEvolution = pauseEvolution;

let neatIteration = async () => {
  if (window.pauseEvolution) return;

  await neat.evolve();
  await neat.evaluate();
  console.log(
    `Generation: ${neat.generation}, avg. score: ${neat
      .getAverage()
      .toFixed(4)}, best score: ${neat.getFittest().score.toFixed(4)}`
  );
  /* neat.sort();
  var newPopulation = [];

  // Elitism
  let elite = [];
  for (var i = 0; i < neat.elitism; i++) {
    newPopulation.push(neat.population[i]);
    elite.push(neat.population[i]);
  }

  // Breed the next individuals
  for (var i = 0; i < neat.popsize - neat.elitism; i++) {
    newPopulation.push(neat.getOffspring());
  }

  // Replace the old population with the new population
  neat.population = newPopulation;
  neat.mutate();
  for (let i = 0; i < neat.elitism; i++) {
    neat.population[i] = elite[i];
  } */

  neat.generation++;

  let fittest = neat.getFittest();
  if (window?.game) window.game.p0.network = fittest;

  requestAnimationFrame(neatIteration);
};
window.neatIteration = neatIteration;

neatIteration();

window.draw = () => {
  if (!window?.game) return;

  game.update();
  document.querySelector('#game-age').innerText = game.age;
  game.display(window.p);
  if (game.winner !== null) {
    scores[game.winner]++;
    game = new Game();

    game.p0.network = neat.getFittest();
  }
};

export default Game;
window.Game = Game;
