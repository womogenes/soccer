export class Game {
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

    p0.control([p0.pos.x / WIDTH, ball.pos.x / WIDTH]);
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

window.draw = () => {
  if (!window?.game) return;

  game.update();
  game.display(window.p);
  if (game.winner !== null) {
    scores[game.winner]++;
    game = new Game();
  }
};
