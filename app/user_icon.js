const SCREEN = document.querySelector('body');
const userIcon = document.querySelector('#user-icon');
const modalRegistr = document.querySelector('.modal-registr');
const modalLogin = document.querySelector('.modal-login');
const modalProfile = document.querySelector('.modal-profile');
const madalLogout = document.querySelector('.logout');

let dropMenu = document.querySelector('.drop-menu_no-auth');

const showDropMenu = () => {
  dropMenu.classList.remove('drop-menu_hidd');
  dropMenu.classList.add('drop-menu_show');
}

const hiddDropMenu = () => {
  dropMenu.classList.remove('drop-menu_show');
  dropMenu.classList.add('drop-menu_hidd');
}

const clickUserIcon = () => {
  if (document.querySelector('.svg').style.display === 'none'){
    dropMenu = document.querySelector('.drop-menu_auth');
  }
  else dropMenu = document.querySelector('.drop-menu_no-auth');

  if (dropMenu.classList.contains('drop-menu_show')){
    hiddDropMenu();
  }
  else {
    showDropMenu();
  }
}

const clickBody = (event) => {
  if (!event.target.closest('#user-icon') && dropMenu.classList.contains('drop-menu_show') && !event.target.closest('.drop-menu')){
    hiddDropMenu();
  }
  if (event.target.classList.contains('logout')){
    hiddDropMenu();
  }
  if (modalRegistr.classList.contains('open-window') || modalLogin.classList.contains('open-window') || modalProfile.classList.contains('open-window')){
    hiddDropMenu();
  }
}

export function clickProfile(){
  userIcon.addEventListener('click', clickUserIcon);
  SCREEN.addEventListener('click', clickBody);
}