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
  p.textAlign('center', 'top');
  p.textFont('Open Sans');
  p.text(scores[0], 200, 100);
  p.text(scores[1], WIDTH - 200, 100);

  // Get user input
  keys();
  touch();
  if (!aboutToReset && age > p.frameRate() * 0.1) {
    p1.moveAutomatic();
  }
  //p0.moveAutomatic();

  p0.update();
  p1.update();
  ball.update();

  // Scoring
  if (!aboutToReset && ball.y > HEIGHT - GROUND_HEIGHT - GOAL_HEIGHT) {
    if (ball.x < 20) {
      scores[1]++;
      window.setTimeout(restart, 500);
      aboutToReset = true;

    } else if (ball.x > WIDTH - 20) {
      scores[0]++;
      window.setTimeout(restart, 500);
      aboutToReset = true;
    }
  }

  p0.display();
  p1.display();
  ball.display();
};