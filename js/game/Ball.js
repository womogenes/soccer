export class Ball {
  constructor() {
    this.pos = new p5.Vector(WIDTH / 2, HEIGHT / 2);
    // this.vel = new p5.Vector(Math.random() * 2 - 1, -5);
    this.vel = new p5.Vector(Math.random() * 0.2 - 0.1, -5);
    // this.vel = new p5.Vector(0, -5);

    this.radius = BALL_SIZE;
    this.mass = BALL_MASS;
  }

  update(p0, p1) {
    this.pos.add(this.vel);
    this.radius = BALL_SIZE;

    this.vel.x *= 0.99;
    this.vel.y = Math.max(this.vel.y, -10);

    if (this.pos.y > HEIGHT - GROUND_HEIGHT - BALL_SIZE) {
      this.vel.y *= -0.4;
      this.pos.y = HEIGHT - GROUND_HEIGHT - BALL_SIZE;
    } else {
      this.vel.y += GRAVITY;
    }

    if (this.pos.x < BALL_SIZE || this.pos.x > WIDTH - BALL_SIZE) {
      this.vel.x *= -1;
      if (this.pos.x < BALL_SIZE) {
        this.pos.x = BALL_SIZE;
      } else {
        this.pos.x = WIDTH - BALL_SIZE;
      }
    }

    for (let player of [p0, p1]) {
      if (
        this.pos.dist(player.pos) < this.radius + player.radius &&
        Math.abs(player.vel.x) > 1
      ) {
        this.vel.y -= 0.8 * (Math.abs(player.vel.x) + 1);
      }
    }
  }

  display() {
    p.stroke('#777');
    p.strokeWeight(2);
    p.fill('#777');
    p.ellipseMode('center');
    p.ellipse(this.pos.x, this.pos.y, BALL_SIZE * 2);
  }
}
