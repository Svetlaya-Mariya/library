const modalBuyCard = document.querySelector('.modal-buy-card');
const MODAL = document.querySelector('.modal');

const buyCardBtn = document.querySelector('#button-buy-card');

const bankCardInputs = document.querySelectorAll('.bank-card');

const bankCardNumber = document.querySelector('#bank-card-number');
const codeMonth = document.querySelector('#bank-card-month');
const codeYear = document.querySelector('#bank-card-year');
const codeCVC = document.querySelector('#bank-card-cvc');
const bankHoldername = document.querySelector('#bank-card-holdername');
const bankPostalCode = document.querySelector('#bank-card-postalcode');
const bankCity = document.querySelector('#bank-card-city');

// ввод номера карты
const enterBankCardNumber = (input) => {
  let inputLenght = input.value.length+1;
  input.value = input.value.replace(/[^\d\s]/g, '');
  if (inputLenght == 5 || inputLenght == 10 || inputLenght == 15){
    input.value += ' ';
  }
}

bankCardNumber.addEventListener('keyup', (event) => enterBankCardNumber(event.target));

const activeBuy = () => {
    let cardNumber = bankCardNumber.value;
    cardNumber = cardNumber.replace(/\s/g, '');
    if (bankCardNumber.value == "" || cardNumber.length != 16){
      document.querySelector('#button-buy-card').setAttribute('disabled','');
      return;
    }
    if (codeMonth.value == ""){
      document.querySelector('#button-buy-card').setAttribute('disabled','')
      return;
    }
    if (codeYear.value == ""){
      document.querySelector('#button-buy-card').setAttribute('disabled','')
      return;
    }
    if (codeCVC.value == "" || codeCVC.value.length != 3){
      document.querySelector('#button-buy-card').setAttribute('disabled','')
      return;
    }
    if (bankHoldername.value == "" || (/[^A-Za-z]\s/).test(bankHoldername.value)){
      document.querySelector('#button-buy-card').setAttribute('disabled','')
      return;
    }
    if (bankPostalCode.value == "" || (/[^0-9]/).test(bankPostalCode.value) || bankPostalCode.value.length != 6){
      document.querySelector('#button-buy-card').setAttribute('disabled','')
      return;
    }
    if (bankCity.value == "" || (/[^A-Za-z]/).test(bankCity.value)){
      document.querySelector('#button-buy-card').setAttribute('disabled','')
      return;
    }

  document.querySelector('#button-buy-card').removeAttribute('disabled');
}

for (const input of bankCardInputs){
  input.onkeydown = input.onkeyup = input.onkeypress = input.change = activeBuy;
}

const buyCardTrue = (event) => {
  event.preventDefault();
  MODAL.classList.remove('open');
  modalBuyCard.classList.remove('open-window');
  const currentUser = JSON.parse(localStorage.user);
  currentUser.buyCard = true;
  localStorage.setItem('user', JSON.stringify(currentUser));
}

export function buyCard(){
  buyCardBtn.addEventListener('click', buyCardTrue)
}