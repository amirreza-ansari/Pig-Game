'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

let dice, current, scores, activePlayer, playing;

const init = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');

  current = 0;
  activePlayer = 0;
  scores = [0, 0];
  activePlayer = 0;
  playing = true;
};

init();

const switchPlayer = function () {
  current = 0;
  document.querySelector(`#current--${activePlayer}`).textContent = current;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active');

  activePlayer = activePlayer === 0 ? 1 : 0;

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    dice = Math.trunc(Math.random() * 6) + 1;

    diceEl.classList.remove('hidden');
    diceEl.src = `./images/dice-${dice}.png`;

    console.log(activePlayer);

    if (dice !== 1) {
      current += dice;
      document.querySelector(`#current--${activePlayer}`).textContent = current;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += current;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (!(scores[activePlayer] >= 10)) {
      switchPlayer();
    } else {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      playing = false;
    }
  }
});

btnNew.addEventListener('click', function () {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');

  if (activePlayer === 1) {
    switchPlayer();
  }
  init();
});
