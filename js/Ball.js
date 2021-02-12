class Ball {
  constructor() {
    this.x = WIDTH / 2
    this.y = HEIGHT / 2;
    this.vx = random(-1, 1);
    this.vy = 5;

    this.radius = BALL_SIZE;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    this.vx *= 0.99;

    if (this.y > HEIGHT - GROUND_HEIGHT - BALL_SIZE) {
      this.vy *= -0.4;
      this.y = HEIGHT - GROUND_HEIGHT - BALL_SIZE;
    } else {
      this.vy += GRAVITY;
    }
    
    if (this.x < BALL_SIZE || this.x > WIDTH - BALL_SIZE) {
      this.vx *= -1;
      if (this.x < BALL_SIZE) {
        this.x = BALL_SIZE;
      } else {
        this.x = WIDTH - BALL_SIZE;
      }
    }

    // COLLISIONS
    for (let e of [p0, p1]) {
      let d = dist(this.x, this.y, e.x, e.y);
      if (d < PLAYER_SIZE + BALL_SIZE) {
        this.vx += (this.x - e.x) * PLAYER_MASS / BALL_MASS * 0.01 * Math.abs(e.vx);
        this.vy += (this.y - e.y) * PLAYER_MASS / BALL_MASS * 0.01 * Math.abs(e.vx);

        if (e.y >= this.y) {
          this.vy -= 1.0 * Math.abs(e.vx);
        }
      }
    }
  }

  display() {
    p.stroke('#777');
    p.strokeWeight(2);
    p.fill('#777');
    p.ellipseMode('center');
    p.ellipse(this.x, this.y, BALL_SIZE * 2);
  }
}