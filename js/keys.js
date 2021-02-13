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

const mouse = () => {
  if (p.mouseIsPressed) {
    if (p.mouseX > WIDTH / 2) {
      p0.move(PLAYER_SPEED);
    } else {
      p0.move(-PLAYER_SPEED);
    }
  }
  
  if (p.mouseY > HEIGHT - GROUND_HEIGHT) {
    p0.jump();
  }
};