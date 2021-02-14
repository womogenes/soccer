let draw = () => {
  age++;

  p.background('#222');

  // Goals
  p.strokeWeight(2);
  p.stroke('#eee');
  p.noFill();
  p.rect(0, HEIGHT - GROUND_HEIGHT - GOAL_HEIGHT, 20, GOAL_HEIGHT + 10);

  p.fill('#eee');
  p.rect(WIDTH - 20, HEIGHT - GROUND_HEIGHT - GOAL_HEIGHT, 20, GOAL_HEIGHT + 10);
  
  // Ground
  p.noStroke();
  p.fill('#444');
  p.rect(0, HEIGHT - GROUND_HEIGHT, WIDTH, GROUND_HEIGHT);

  // Draw score
  p.fill('#fff9');
  p.textSize(128);
  p.textStyle('bold');
  p.textAlign('center', 'top');
  p.textFont('Open Sans');
  p.text(scores[0], 200, 100);
  p.text(scores[1], WIDTH - 200, 100);

  // Get user input
  keys();
  touch();
  if (!aboutToReset && age > p.frameRate() * 0.25) {
    p1.moveAutomatic();
  }
  if (firstBot && !aboutToReset && age > p.frameRate() * 0.25) {
    p0.moveAutomatic();
  }

  p0.update();
  p1.update();
  ball.update();

  // Collisions
  if (physicsType === 'realistic') {
    for (let a of entities) {
      for (let b of entities) {
        if (a === b || (a instanceof Player && b instanceof Player)) continue;

        if (a.pos.dist(b.pos) < a.radius + b.radius) {
          collide(a, b);
        }
      }
    }

  } else {
    for (let player of [p0, p1]) {
      let d = dist(player.pos.x, player.pos.y, ball.pos.x, ball.pos.y);

      if (d < PLAYER_SIZE + BALL_SIZE) {
        
        // Player collides with ball
        player.vel.x += (player.pos.x - ball.pos.x) * BALL_MASS / PLAYER_MASS * 0.1;
        player.vel.y += (player.pos.y - ball.pos.y) * BALL_MASS / PLAYER_MASS * 0.1;

        ball.vel.x += (ball.pos.x - player.pos.x) * PLAYER_MASS / BALL_MASS * 0.01 * (Math.abs(player.vel.x) + 1);
        ball.vel.y += (ball.pos.y - player.pos.y) * PLAYER_MASS / BALL_MASS * 0.01 * (Math.abs(player.vel.x) + 1);

        if (player.vel.y >= ball.vel.y) {
          ball.vel.y -= 1.0 * Math.abs(player.vel.x);
        }
      }
    }
  }

  // Scoring
  if (!aboutToReset && ball.pos.y > HEIGHT - GROUND_HEIGHT - GOAL_HEIGHT) {
    if (ball.pos.x < 20) {
      scores[1]++;
      window.setTimeout(restart, 500);
      aboutToReset = true;

    } else if (ball.pos.x > WIDTH - 20) {
      scores[0]++;
      window.setTimeout(restart, 500);
      aboutToReset = true;
    }
  }

  p0.display();
  p1.display();
  ball.display();
};