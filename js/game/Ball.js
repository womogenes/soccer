class Ball {
  constructor() {
    this.pos = p.createVector(WIDTH / 2, HEIGHT / 2);
    this.vel = p.createVector(random(-1, 1), -5);

    this.radius = BALL_SIZE;
    this.mass = BALL_MASS;
  }

  update() {
    this.pos.add(this.vel);
    this.radius = BALL_SIZE;

    this.vel.x *= 0.99;

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
        this.vel.y -= 1 * (Math.abs(player.vel.x) + 1);
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
