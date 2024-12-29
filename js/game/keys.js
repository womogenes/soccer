const keys = () => {
  if (p.keyIsDown(65)) {
    // A
    p0.move(-p0.speed);
  }

  if (p.keyIsDown(68)) {
    // D
    p0.move(p0.speed);
  }

  if (p.keyIsDown(87)) {
    // W or up arrow
    p0.jump();
  }

  if (p.keyIsDown(37)) {
    // Left arrow
    if (!secondBot) {
      p1.move(-p1.speed);
    } else {
      p0.move(-p0.speed);
    }
  }

  if (p.keyIsDown(39)) {
    // Right arrow
    if (!secondBot) {
      p1.move(p1.speed);
    } else {
      p0.move(p0.speed);
    }
  }

  if (p.keyIsDown(38)) {
    // Up arrow
    if (!secondBot) {
      p1.jump();
    } else {
      p0.jump();
    }
  }

  if (p.keyIsDown(32) && !secondBot) {
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
        p0.move(p0.speed);
      } else {
        p0.move(-p0.speed);
      }
    }
  }
};
