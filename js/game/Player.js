class Player {
  constructor(team, network) {
    this.team = team;

    this.pos = new p5.Vector(
      50 + (WIDTH - 50 * 2) * team,
      HEIGHT - GROUND_HEIGHT - PLAYER_SIZE
    );
    this.vel = new p5.Vector(0, 0);

    this.radius = PLAYER_SIZE;
    this.mass = PLAYER_MASS;
    this.speed = PLAYER_SPEED;

    this.network = network;

    if (!network) {
      let { Node } = neataptic;
      let A = new Node();
      A.bias = 0;
      let B = new Node();
      B.bias = 0;
      let C = new Node();
      C.bias = 0.1;
      C.squash = neataptic.methods.activation.IDENTITY;
      A.connect(C, 1);
      B.connect(C, -1);
      this.network = neataptic.architect.Construct([A, B, C]);
    }
  }

  control(inputs) {
    // Have network control actions
    let outputs = this.network.noTraceActivate(inputs);
    this.move(outputs[0]);
  }

  update() {
    this.pos.add(this.vel);

    this.vel.x *= 0.95;

    if (this.pos.y > HEIGHT - GROUND_HEIGHT - PLAYER_SIZE) {
      this.vel.y *= -0.4;
      this.pos.y = HEIGHT - GROUND_HEIGHT - PLAYER_SIZE;
    } else {
      this.vel.y += GRAVITY;
    }

    if (this.pos.x < PLAYER_SIZE || this.pos.x > WIDTH - PLAYER_SIZE) {
      this.vel.x *= -1;
      if (this.pos.x < PLAYER_SIZE) {
        this.pos.x = PLAYER_SIZE;
      } else {
        this.pos.x = WIDTH - PLAYER_SIZE;
      }
    }
  }

  move(acc) {
    if (Math.abs(acc) < 0) return;
    this.vel.x += Math.min(
      Math.max((this.team * 0.5 + 0.5) * acc, -this.speed),
      this.speed
    );
  }

  jump() {
    if (this.pos.y >= HEIGHT - GROUND_HEIGHT - PLAYER_SIZE) {
      this.vel.y = -PLAYER_JUMP;
    }
  }

  moveAutomatic(ball, age) {
    if (age < 60) return;

    let closeness = (ball.pos.x - this.pos.x) * ((this.team - 0.5) * 2);
    if (this.pos.y - ball.pos.y > 40 || (0 < closeness && closeness < 100)) {
      this.jump();
    }

    let boundary =
      ball.pos.x + (this.team - 0.5) * 2 * (PLAYER_SIZE + BALL_SIZE) * 0.9;
    if (this.pos.x > boundary) {
      this.move(-this.speed);
    } else {
      this.move(this.speed);
    }
  }

  display(p) {
    p.stroke('#fff');
    p.strokeWeight(2);
    if (this.team) {
      p.fill('#fff');
    } else {
      p.noFill();
    }
    p.ellipseMode('center');
    p.ellipse(this.pos.x, this.pos.y, PLAYER_SIZE * 2);
  }
}
