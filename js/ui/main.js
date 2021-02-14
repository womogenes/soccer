const openNav = (id) => {
  document.getElementById(id).style.width = '250px';
  document.getElementById(id).style['padding-left'] = '30px';
};

/* Set the width of the side navigation to 0 */
const closeNav = (id) => {
  document.getElementById(id).style.width = '0';
  document.getElementById(id).style['padding-left'] = '0';
};

const changeFirstBot = () => {
  firstBot = document.getElementById('first-bot-checkbox').checked;
  localStorage.setItem('firstBot', JSON.stringify(firstBot));
};

const changePhysicsType = () => {
  if (document.getElementById('sketchy-physics-checkbox').checked) {
    physicsType = 'sketch';
  } else {
    physicsType = 'realistic';
  }
  localStorage.setItem('physicsType', JSON.stringify(firstBot));
};