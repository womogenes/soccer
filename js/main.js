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

let collide = (a, b) => {
  // From: https://stackoverflow.com/questions/345838/ball-to-ball-collision-detection-and-handling

  // get the mtd
  let delta = p5.Vector.sub(a.pos, b.pos);
  let d = delta.mag();
  // minimum translation distance to push balls apart after intersecting
  let mtd = p5.Vector.mult(delta, ((a.radius + b.radius) - d) / d);


  // resolve intersection --
  // inverse mass quantities
  let im1 = 1 / a.mass; 
  let im2 = 1 / b.mass;

  // push-pull them apart based off their mass
  a.pos.add(p5.Vector.mult(mtd, im1 / (im1 + im2)));
  b.pos.sub(p5.Vector.mult(mtd, im2 / (im1 + im2)));

  // FROM HERE ON, WE USE mtd NORMALIZED
  mtd.normalize();

  // impact speed
  let v = p5.Vector.sub(a.vel, b.vel);
  let vn = v.dot(mtd);

  // sphere intersecting but moving away from each other already
  if (vn > 0) return;

  // collision impulse
  let i = (-(1 + RESTITUTION) * vn) / (im1 + im2);
  let impulse = p5.Vector.mult(mtd, i);

  // change in momentum
  a.vel.add(p5.Vector.mult(impulse, im1));
  b.vel.sub(p5.Vector.mult(impulse, im2));
}