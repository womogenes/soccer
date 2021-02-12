class Player {
  constructor(team) {
    this.team = team;
    
    this.x = 50 + (WIDTH - 50 * 2) * team;
    this.y = HEIGHT - GROUND_HEIGHT - PLAYER_SIZE;
    this.vx = 0;
    this.vy = 0;

    this.radius = PLAYER_SIZE;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    this.vx *= 0.95;

    if (this.y > HEIGHT - GROUND_HEIGHT - PLAYER_SIZE) {
      this.vy *= -0.4;
      this.y = HEIGHT - GROUND_HEIGHT - PLAYER_SIZE;
    } else {
      this.vy += GRAVITY;
    }

    if (this.x < PLAYER_SIZE || this.x > WIDTH - PLAYER_SIZE) {
      this.vx *= -1;
      if (this.x < PLAYER_SIZE) {
        this.x = PLAYER_SIZE;
      } else {
        this.x = WIDTH - PLAYER_SIZE;
      }
    }

    // COLLISIONS
    let d = dist(this.x, this.y, ball.x, ball.y);
    if (d < PLAYER_SIZE + BALL_SIZE) {
      this.vx += (this.x - ball.x) * BALL_MASS / PLAYER_MASS * 0.1;
      this.vy += (this.y - ball.y) * BALL_MASS / PLAYER_MASS * 0.1;
    }
  }

  move(acc) {
    this.vx += acc;
  }

  jump() {
    if (this.y >= HEIGHT - GROUND_HEIGHT - PLAYER_SIZE) {
      this.vy = -PLAYER_JUMP;
    }
  }

  moveAutomatic() {
    if (this.y - ball.y > 40) {
      this.jump();
    }

    let boundary = ball.x + ((this.team - 0.5) * 2) * (PLAYER_SIZE + BALL_SIZE) * 0.9;
    if (this.x > boundary) {
      this.move(-PLAYER_SPEED);
    } else {
      this.move(PLAYER_SPEED);
    }
  }

  display() {
    p.stroke(255);
    p.strokeWeight(2);
    if (this.team) {
      p.fill(255);
    } else {
      p.noFill();
    }
    p.ellipseMode('center');
    p.ellipse(this.x, this.y, PLAYER_SIZE * 2);
  }
}