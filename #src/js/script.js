'use strict'
//get link with parameters
const paramLinks = document.querySelectorAll('.get-link');
if (paramLinks.length > 0) {
  paramLinks.forEach(link => {
    link.setAttribute('href', link.getAttribute('href') + window.location.search);
  });
}

//modal
const modalTrigger = document.querySelector('.hero__info');
modalTrigger.addEventListener('click', () => {
  const modal = document.querySelector('.modal');
  modal.classList.add('active');

  const modalClose = document.querySelector('.modal-info__close');
  modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
  });

  const modalLink = document.querySelector('.modal-info__list-link');
  modalLink.addEventListener('click', e => {
    e.preventDefault();
    modal.classList.remove('active');
  })
});

//slider
const sliderContainer = document.querySelector('.swiper-container');
const slider = new Swiper(sliderContainer, {
  infinite: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  autoplay: {
    delay: 4000,
  }
});



@@include('webpSupport.js');




let data = fetch('https://maxline.by/api/event/line-top', {
  // mode: 'no-cors',
}).then(response => response.json()).then(item => console.log(item.text()));


