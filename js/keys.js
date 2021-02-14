const keys = () => {
  if (p.keyIsDown(65) || p.keyIsDown(37)) { // A or left arrow
    p0.move(-p0.speed);
  }

  if (p.keyIsDown(68) || p.keyIsDown(39)) { // D or right arrow
    p0.move(p0.speed);
  }

  if (p.keyIsDown(87) || p.keyIsDown(38) || p.keyIsDown(32)) { // W or up arrow or space
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