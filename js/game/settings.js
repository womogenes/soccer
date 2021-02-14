let firstBot;
let physicsType;

// Physics
let GRAVITY;
let RESTITUTION;

// Ball o.O
let BALL_SIZE = 15;
let BALL_MASS = 1;

// First player also bot?
if (JSON.parse(localStorage.getItem('firstBot'))) {
  firstBot = true;
  document.getElementById('first-bot-checkbox').checked = true;
} else {
  firstBot = false;
}

// Sketchy physics
if (JSON.parse(localStorage.getItem('physicsType')) === 'sketch') {
  physicsType = 'sketch';
  document.getElementById('sketchy-physics-checkbox').checked = true;
} else {
  physicsType = 'realistic';
}

// Gravity
let storedGravity = JSON.parse(localStorage.getItem('gravity'));
if (storedGravity) {
  GRAVITY = storedGravity;
  document.getElementById('gravity-slider').value = storedGravity;
} else {
  GRAIVTY = 0.5;
}
document.querySelector('[for="gravity-slider"]').innerText = `Gravity: ${GRAVITY}`;

// Restitution
let storedRestitution = JSON.parse(localStorage.getItem('restitution'));
if (storedRestitution) {
  RESTITUTION = storedRestitution;
  document.getElementById('restitution-slider').value = storedRestitution;
} else {
  RESTITUTION = 0.9;
}
document.querySelector('[for="restitution-slider"]').innerText = `Restitution: ${RESTITUTION}`;