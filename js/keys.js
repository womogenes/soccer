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

const touch = () => {
  for (let touch of p.touches) {
    let x = touch.winX;
    let y = touch.winY;

    if (y > HEIGHT - GROUND_HEIGHT) {
      p0.jump();
      
    } else {
      if (x > WIDTH / 2) {
        p0.move(PLAYER_SPEED);
      } else {
        p0.move(-PLAYER_SPEED);
      }
    }
  }
};