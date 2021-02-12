const keys = () => {
  if (p.keyIsDown(65)) { // A
    p0.move(-PLAYER_SPEED);
  }

  if (p.keyIsDown(68)) { // D
    p0.move(PLAYER_SPEED)
  }

  if (p.keyIsDown(87)) { // W
    p0.jump();
  }
};