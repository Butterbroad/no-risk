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




let data = fetch('https://maxline.by/api/event/line-top?cors=1')
  .then(response => response.json())
  .then(item => {
    betItems(item)
  });

function getTime(currentDate) {
  const fullDate = currentDate.split(' ');
  const date = fullDate[0];
  const time = fullDate[1];
  const splittedDate = date.split('-');
  return `${splittedDate[2]}.${splittedDate[1]}.${splittedDate[0].slice(2, 4)} ${time.slice(0, 5)}`
}

function betItems(item) {
  console.log(item)
  const betWrapper = document.querySelector('.bet__row_2');
  const betitems = item.data.events.map(bet => {
    //get factors
    let factors = [];
    for (let factor in item.data.factors) {
      if (factor === bet.id) {
        factors = item.data.factors[factor];
      }
    }
    //get league title
    const league = item.data.leagues.find(league => {
      return bet.league_id === league.id
    });
    console.log(league)
    //make bet item
    let betItem = `              
    <div class="bet__row-item bet-item">
    <div class="bet-item__title">
      ${league.name}
    </div>
    <div class="bet-item__wrapper">
      <div class="bet-item__about">
        <div class="bet-item__team bet-item__team_1">
          ${bet.team1}
          <img src="./img/team-img2.png" alt="">
        </div>
        <div class="bet-item__team bet-item__team_2">
          ${bet.team2}
          <img src="./img/team-img2.png" alt="">
        </div>
        <div class="bet-item__event-time">
          <span class="bet-item__date">${getTime(bet.time)}</span>
        </div>
      </div>
      <div class="bet-item__factors">
        <div class="bet-item__factor bet-item__factor_1">
          ${factors[0].v}
        </div>
        <div class="bet-item__factor bet-item__factor_2">
        ${factors[1].v}
        </div>
      </div>
    </div>
  </div>`
    return betWrapper.innerHTML += betItem;
  });
}


