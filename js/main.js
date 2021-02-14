let restart = () => {
  aboutToReset = false;
  age = 0;

  for (let player of [p0, p1]) {
    player.pos = p.createVector(50 + (WIDTH - 50 * 2) * player.team, HEIGHT - GROUND_HEIGHT - PLAYER_SIZE);
    player.vel = p.createVector(0, 0);
  }

  ball.pos = p.createVector(WIDTH / 2, HEIGHT/ 2);
  ball.vel = p.createVector(random(-1, 1), -5);
};