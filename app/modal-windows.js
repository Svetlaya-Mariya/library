import { buyCard } from "./buyCard.js";

const DROPMENU = document.querySelectorAll('.drop-menu');
const MODAL = document.querySelector('.modal');
const BOOKS = document.querySelectorAll('.book');

// модальные окна
const modalRegistr = document.querySelector('.modal-registr');
const modalLogin = document.querySelector('.modal-login');
const modalProfile = document.querySelector('.modal-profile');
const modalBuyCard = document.querySelector('.modal-buy-card');

// кнопки
const singUpBtn = document.querySelector('.button_singup');
const logInBtn = document.querySelector('.button_login');
const buyButtons = document.querySelectorAll('#book_btn');
const registrBtn = document.querySelector('.button__registration');
const authorBtn =  document.querySelector('#enter-button');
const checkTheCardBtn = document.querySelector('.card__button');
const profileBtn = document.querySelector('#button_profile');
const iconCopy = document.querySelector('#icon-copy');

const linkToReg = document.querySelector('#link-to-reg');
const linkToLog = document.querySelector('#link-to-log');


//поля ввода информации при регистрации
const firstName = document.querySelector('#reg-first-name');
const lastName = document.querySelector('#reg-last-name');
const email = document.querySelector('#reg-email');
const password = document.querySelector('#reg-password');
const loginName = document.querySelector('#login-name');
const loginPassword = document.querySelector('#login-password');

// изменение иконки в header
const SVG = document.querySelector('.svg');
const titleName = document.querySelector('.title-name');
const dropMenuHeaderAuth = document.querySelector('.drop-menu__header_auth');

// отслеживание инпутов
const inputCardName = document.querySelector('#input__card_name');
const inputCardNumber = document.querySelector('#input__card_number');

const libCardTitle =  document.querySelectorAll('.find-card__title');
const libCardProfileBtn =  document.querySelectorAll('#card_bth_profile');
const libCardText =  document.querySelectorAll('.get-card-info');
const linkBooks = document.querySelector('#own-books');

const userLogIn = {
  firstName : '',
  lastName : '',
  email : '',
  password : '',
  cardNumber : '',
  countVisit: '',
  countBooks: 0,
  buyCard: 'false',
  ownBooks: []
}

const capitalizeWords = str => str.replace(/\b\w/g, c => c.toUpperCase());
//открытие и закрытие окон регистрации и log in
const openRegistrationWindow = () => {
  MODAL.classList.add('open');
  modalRegistr.classList.add('open-window');
}

const openLoginWindow = () => {
  MODAL.classList.add('open');
  modalLogin.classList.add('open-window');
}

const openProfileWindow = () => {
  MODAL.classList.add('open');
  modalProfile.classList.add('open-window');
}

const openBuycadrWindow = () => {
  MODAL.classList.add('open');
  modalBuyCard.classList.add('open-window');
}
const closeWindow = (event) => {
  if (event.target.classList.contains('modal')){
    MODAL.classList.remove('open');
    modalRegistr.classList.remove('open-window');
    modalLogin.classList.remove('open-window');
    modalProfile.classList.remove('open-window');
    modalBuyCard.classList.remove('open-window');
  }
  if (event.target.closest('.close-btn')){
    event.preventDefault();
    MODAL.classList.remove('open');
    modalRegistr.classList.remove('open-window');
    modalLogin.classList.remove('open-window');
    modalProfile.classList.remove('open-window');
    modalBuyCard.classList.remove('open-window');
  }
}

// создание номера карты
const createCardNumber = () => {
  const arr = [];
  for (let i=0; i<9; i++) {
    arr.push(Math.floor(Math.random() * 16).toString(16).toUpperCase())
  }
  return arr.join('');
}

const changeProfileAvatar = (title) => {
  SVG.style.display = 'none';
  titleName.classList.remove('hidd-title-name');
  titleName.title = title;
}

const changeLibraryCard = (elem) => {
  elem.forEach(item => {
    if (item.classList.contains('card__info_hidden')){
      item.classList.remove('card__info_hidden')
    }
    else item.classList.add('card__info_hidden')
  })
}

const changeBuyBooksBth = (btn) => {
  btn.classList.remove('button_active');
  btn.classList.add('button_disabled');
  btn.setAttribute('disabled', '');
  btn.innerText = 'Own';
}

const authUser = () => {
  if (localStorage.getItem('user')){
    const person = JSON.parse(localStorage.user);
    let firstName = person.firstName;
    let lastName = person.lastName;
    let firstLetters = firstName[0] + lastName[0];
    titleName.innerText = firstLetters.toUpperCase();
    changeProfileAvatar(firstName + ' ' + lastName);
    dropMenuHeaderAuth.innerText = person.cardNumber;

    //изменяем блок Digital Library Card
    changeLibraryCard(libCardTitle);
    changeLibraryCard(libCardProfileBtn);
    changeLibraryCard(libCardText);
    inputCardName.value = firstName + ' ' + lastName;
    inputCardNumber.value = person.cardNumber;

    //изменение в модальном окне Profile
    document.querySelector('#modal-profile__letters').innerText = firstLetters.toUpperCase();
    document.querySelector('.modal-profile__name').innerText = firstName[0].toUpperCase()+ firstName.slice(1) + ' ' + lastName[0].toUpperCase() + lastName.slice(1);
    document.querySelectorAll('#count-visit').forEach(item => item.innerText = person.countVisit);
    document.querySelectorAll('#count-books').forEach(item => item.innerText = person.countBooks);
    person.ownBooks.forEach(book => {
      const liBook = document.createElement('li');
      liBook.innerText = book.name + ', ' + book.author.slice(3);
      linkBooks.appendChild(liBook);
    })
  }
}

const exitProfile = () => {
  SVG.style.display = 'inline';
  titleName.classList.add('hidd-title-name');
  loginName.value = "";
  loginPassword.value = "";
  linkBooks.innerHTML = "";
   //изменяем блок Digital Library Card
   changeLibraryCard(libCardTitle);
   changeLibraryCard(libCardProfileBtn);
   changeLibraryCard(libCardText);
  inputCardName.value ="";
  inputCardNumber.value = "";
}

const showStatistics = () => {
  if ((localStorage.getItem('user'))) {
    if (inputCardName.value !== ''){
      if (inputCardNumber.value !== ''){
        const person = JSON.parse(localStorage.user);
        if (inputCardName.value === person.firstName + ' ' + person.lastName && inputCardNumber.value === person.cardNumber){
          document.querySelectorAll('#count-visit').forEach(item => item.innerText = person.countVisit);
          document.querySelectorAll('#count-books').forEach(item => item.innerText = person.countBooks);
          changeLibraryCard(libCardProfileBtn);
          setTimeout(() => {
            changeLibraryCard(libCardProfileBtn);
            inputCardName.value = '';
            inputCardNumber.value = '';
          }, 10000);
        } else alert('You entered wrong data')
      } else alert('Enter your Card Number');
    } else alert('Enter your name');
  }
}

const copyCardNumber = () => {
  const text = document.querySelector('.card-number').innerText;
  navigator.clipboard.writeText(text);
}

// РЕГИСТРАЦИЯ сохранение данных пользователя
const registretionUser = (event) => {
  if (firstName.value && lastName.value && email.value && password.value){
    userLogIn.firstName = firstName.value;
    userLogIn.lastName = lastName.value;
    userLogIn.email = email.value;
    userLogIn.countVisit = 1;
    if (password.value.length >= 8){
      userLogIn.password = password.value;
      userLogIn.cardNumber = createCardNumber();
      localStorage.setItem('user', JSON.stringify(userLogIn));
      event.preventDefault();
      MODAL.classList.remove('open');
      modalRegistr.classList.remove('open-window');
    }
    authUser();
  }
}


const authorizationUser = (event) => {
  if (loginName.value && loginPassword.value){
    const currentUser = JSON.parse(localStorage.user);
    if ((loginName.value === currentUser.email || loginName.value === currentUser.cardNumber) && loginPassword.value === currentUser.password) {
      event.preventDefault();
      MODAL.classList.remove('open');
      modalLogin.classList.remove('open-window');

      //счетчик визитов
      let count = Number(currentUser.countVisit);
      count = ++count;
      currentUser.countVisit = count;

      //книги в собственности
      BOOKS.forEach(item => {
        const buyBookBtn = item.children[6];
        currentUser.ownBooks.forEach(el => {
          if (el.name == item.children[2].innerText){
            changeBuyBooksBth(buyBookBtn);
          }
        })
      })
      localStorage.setItem('user', JSON.stringify(currentUser));
      document.querySelector('.modal-login__error-message').innerText = ''
      authorBtn.style.marginTop = '';
      authUser();
    } else {
      event.preventDefault();
      authorBtn.style.marginTop = '10px';
      if (loginName.value != currentUser.email || loginName.value != currentUser.cardNumber){
        document.querySelector('.modal-login__error-message').innerText = 'Incorrect user';
      }
      if (loginPassword.value.length < 8){
        document.querySelector('.modal-login__error-message').innerText = 'Short password'
      } else if (loginPassword.value != currentUser.password){
        document.querySelector('.modal-login__error-message').innerText = 'Incorrect password'
      }
    };
  }
}

BOOKS.forEach(item => {
  item.addEventListener('click', (elem)=> {
    if(elem.target.classList.contains('book__btn')){
      const buyBookBtn = elem.target;
      if (SVG.style.display != 'none'){
        openLoginWindow();
      }
      if (SVG.style.display === 'none'){
        const currentUser = JSON.parse(localStorage.user);
        let count = Number(currentUser.countBooks);
        const ownBook = {
          name: '',
          author: ''
        };

        if (currentUser.buyCard === true){
          changeBuyBooksBth(buyBookBtn);
          const liBook = document.createElement('li');
          liBook.innerText = capitalizeWords(item.children[2].innerText.toLowerCase()) + ', ' + item.children[3].innerText.slice(3);
          linkBooks.appendChild(liBook);
          ownBook.name = capitalizeWords(item.children[2].innerText.toLowerCase());
          ownBook.author = item.children[3].innerText;
          currentUser.ownBooks.push(ownBook);
          count = ++count;
          currentUser.countBooks = count;
          localStorage.setItem('user', JSON.stringify(currentUser));
          document.querySelectorAll('#count-books').forEach(item => item.innerText = currentUser.countBooks);
        } else openBuycadrWindow();
      }
    }
  })
})

export function modalWindow(){
  DROPMENU.forEach(item => {
    item.addEventListener('click', function(event) {
      if (event.target.classList.contains('registr')) {
        openRegistrationWindow();
      }
      if (event.target.classList.contains('login')){
        openLoginWindow();
      }
      if (event.target.classList.contains('my-profile')){
        openProfileWindow();
      }
      if (event.target.classList.contains('logout')){
        exitProfile();
      }
    })
  })

  singUpBtn.addEventListener('click', openRegistrationWindow);
  linkToReg.addEventListener('click', () => {
    modalLogin.classList.remove('open-window');
    openRegistrationWindow();
  });

  logInBtn.addEventListener('click', openLoginWindow);
  linkToLog.addEventListener('click', () => {
    modalRegistr.classList.remove('open-window');
    openLoginWindow();
  });
  buyCard();
  MODAL.addEventListener('click', closeWindow);
  registrBtn.addEventListener('click', registretionUser);
  authorBtn.addEventListener('click', authorizationUser);
  profileBtn.addEventListener('click', openProfileWindow);
  checkTheCardBtn.addEventListener('click', showStatistics);
  iconCopy.addEventListener('click', copyCardNumber);
}

