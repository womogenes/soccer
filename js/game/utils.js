const dist = (x0, y0, x1, y1) => {
  return Math.sqrt((x0 - x1) ** 2 + (y0 - y1) ** 2);
}

const random = (min, max) => {
  return Math.random() * (max - min) + min;
}

function getViewportSize(){
  var e = window;
  var a = 'inner';
  if (!('innerWidth' in window)) {
      a = 'client';
      e = document.documentElement || document.body;
  }
  return [e[a + 'Width'], e[a + 'Height']];
}