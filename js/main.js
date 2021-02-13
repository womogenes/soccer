let restart = () => {
  aboutToReset = false;

  for (let p of [p0, p1]) {
    p.x = 50 + (WIDTH - 50 * 2) * p.team;
    p.y = HEIGHT - GROUND_HEIGHT - PLAYER_SIZE;
    p.vx = 0;
    p.vy = 0;
  }

  ball.x = WIDTH / 2
  ball.y = HEIGHT / 2;
  ball.vx = random(-1, 1);
  ball.vy = 5;
};

var el = document.getElementById('defaultCanvas0');
el.addEventListener('touchstart', pdefault, false);
el.addEventListener('touchend', pdefault, false);
el.addEventListener('touchcancel', pdefault, false);
el.addEventListener('touchleave', pdefault, false);
el.addEventListener('touchmove', pdefault, false);