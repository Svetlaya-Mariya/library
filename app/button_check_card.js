const cardButton = document.querySelector('.card__button');

export function checkTheCard(){
  cardButton.addEventListener('click', function(event){
    event.preventDefault();
  })
}