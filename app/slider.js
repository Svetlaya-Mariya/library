
const carousel = document.querySelector('.about__images');
const IMAGES = document.querySelector('.about__image-items');
const imgItem = document.querySelectorAll('.img-item');
const POINTS = document.querySelectorAll('.btn-circle');
const arrowLeft = document.querySelector('.about__carret-left');
const arrowRight = document.querySelector('.about__carret-right');

let slideWidth;
let imageWidth;
let currentPoint = 0;

function changePoint(index){
  POINTS.forEach(item => item.classList.remove('btn-circle_active'));
  POINTS[index].classList.add('btn-circle_active');
}

function showSlide(){
    slideWidth = carousel.offsetWidth;
    if (slideWidth > 969 & currentPoint > 2){
      console.log('more 1024');
      currentPoint = 2;
      changePoint(2)
    }
    rollSlide();
}

function rollSlide(){
  imageWidth = document.querySelector('.img-item').offsetWidth;
  IMAGES.style.transform = `translateX(${-currentPoint * imageWidth}px)`;
  if (currentPoint == 4){
    arrowRight.classList.add('hidden');
  }
  else arrowRight.classList.remove('hidden');
  if (currentPoint == 0){
    arrowLeft.classList.add('hidden');
  }
  else arrowLeft.classList.remove('hidden');
  console.log(slideWidth);
  console.log(currentPoint);
}

function rollRight(){
  currentPoint++;
  if (currentPoint >= imgItem.length){
    currentPoint = imgItem.length - 1
  }
  rollSlide();
  changePoint(currentPoint);
}

function rollLeft(){
  currentPoint--;
  if(currentPoint < 0){
    currentPoint = 0;
  }
  rollSlide();
  changePoint(currentPoint);
}



export function slider(){
  window.addEventListener('resize', showSlide);
  arrowLeft.addEventListener('click', rollLeft);
  arrowRight.addEventListener('click', rollRight);
  POINTS.forEach((elem, index) => {elem.addEventListener('click', function(){
    currentPoint = index;
    console.log(index);
    changePoint(index);
    rollSlide();
  })})
};
