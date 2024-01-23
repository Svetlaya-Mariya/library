const RADIOSEASON = document.querySelectorAll('input[name=season]');
const BOOKS = document.querySelectorAll('.books');

export function seasonSlider(){
  RADIOSEASON.forEach((item, index) => {
    item.addEventListener('change', function(){
      BOOKS.forEach(elem => {elem.classList.remove('books-active')});
      if (item.checked){
       BOOKS[index].classList.add('books-active');
      }
    })
  })
  console.log(RADIOSEASON)
}