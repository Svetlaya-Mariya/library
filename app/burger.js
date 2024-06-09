const SCREEN = document.querySelector('body');
const HEADER = document.querySelector('.header__wrapper');
const HAMBURGER = document.querySelector('.hamburger');
const NAVIGATION = document.querySelector('.header__navigation');
const BURGERLINE = document.querySelector('.hamburger__line');

export function burger(){
  //show menu
  const showMenu = (e) => {
    HAMBURGER.classList.add('cross');
    BURGERLINE.style.display = 'none';
    HAMBURGER.style.width = '32px';
    HAMBURGER.style.height = '32px';
    HAMBURGER.style.marginLeft = '53px';
    NAVIGATION.classList.add('navigation-show');
    NAVIGATION.classList.remove('navigation-hidd');
    NAVIGATION.style.right = '0px';
  }
 //hidd menu
  const hiddMenu = (e) => {
  HAMBURGER.classList.remove('cross');
  BURGERLINE.style.display = 'inline-block';
  HAMBURGER.style.width = '45px';
  HAMBURGER.style.height = '20px';
  HAMBURGER.style.marginLeft = '40px';
  NAVIGATION.classList.add('navigation-hidd');
  NAVIGATION.classList.remove('navigation-show');
  NAVIGATION.style.right = '-332px';
}

const clickHamburger = () =>{
  if (HAMBURGER.classList.contains('cross')){
    hiddMenu();
  }
  else showMenu();
}

const clickScreen = (event) => {
  if (event.target.tagName == 'A' && event.target.closest('.navigation__link') || NAVIGATION.classList.contains('navigation-show') && !event.target.closest('.hamburger') && !event.target.closest('nav')){
    hiddMenu();
  }
}

HAMBURGER.addEventListener('click', clickHamburger);
SCREEN.addEventListener('click', clickScreen);
}
