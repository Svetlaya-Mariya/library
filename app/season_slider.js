const RADIOSEASON = document.querySelectorAll('input[name=season]');
const BOOKS = document.querySelectorAll('.books');

export function seasonSlider(){
  RADIOSEASON.forEach((item, index) => {
    item.addEventListener('change', function(){
      BOOKS.forEach(elem => {
        if (elem.classList.contains('books_active')){
          elem.classList.remove('books_active');
          elem.classList.remove('fade-in');
          elem.classList.add('books_passive');
        }
        if (item.checked){
          BOOKS[index].classList.remove('books_passive');
          BOOKS[index].classList.add('books_active');
          BOOKS[index].classList.add('fade-in');
         }
      });
    })
  })
}