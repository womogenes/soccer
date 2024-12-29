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

let maxRad = 40; // Maximum radius

let centerX = 100;
let centerY = 150;
let controlX = centerX;
let controlY = centerY;

const touch = () => {
  if (!window.isMobileOrTablet) return;

  p.fill('#80808020');
  p.ellipse(centerX, centerY, maxRad * 2);

  let shouldJump = false;

  for (let touch of p.touches) {
    // If touch on right side of screen, jump
    if (touch.x >= p.width / 2) {
      shouldJump = true;
      continue;
    }

    // Do calculations for joystick
    let x = touch.winX;
    let y = touch.winY;

    let dLoc = new p5.Vector(x - centerX, y - centerY);
    dLoc.limit(maxRad);
    controlX = p.lerp(controlX, centerX + dLoc.x, 0.5);
    controlY = p.lerp(controlY, centerY + dLoc.y, 0.5);

    if (controlY - centerY < 0) shouldJump = true; // Joystick above horizontal

    if (dLoc.x > 0) {
      p0.move(p0.speed);
    } else {
      p0.move(-p0.speed);
    }
  }

  // If no touches, lerp control back to center
  if (p.touches.length === 0) {
    controlX = p.lerp(controlX, centerX, 0.5);
    controlY = p.lerp(controlY, centerY, 0.5);
  }
  if (shouldJump) {
    p0.jump();
  }

  p.fill('#ffffff20');
  p.ellipse(controlX, controlY, maxRad);
};
