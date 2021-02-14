class Ball {
  constructor() {
    this.pos = p.createVector(WIDTH / 2, HEIGHT/ 2);
    this.vel = p.createVector(random(-1, 1), -5);

    this.radius = BALL_SIZE;
    this.mass = BALL_MASS;
  }

  update() {
    this.pos.add(this.vel);

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

    // COLLISIONS
    for (let e of [p0, p1]) {
      let d = dist(this.pos.x, this.pos.y, e.pos.x, e.pos.y);
      if (d < PLAYER_SIZE + BALL_SIZE) {
        this.vel.x += (this.pos.x - e.pos.x) * PLAYER_MASS / BALL_MASS * 0.01 * (Math.abs(e.vel.x) + 1);
        this.vel.y += (this.pos.y - e.pos.y) * PLAYER_MASS / BALL_MASS * 0.01 * (Math.abs(e.vel.x) + 1);

        if (e.pos.y >= this.pos.y) {
          this.vel.y -= 1.0 * Math.abs(e.vel.x);
        }
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