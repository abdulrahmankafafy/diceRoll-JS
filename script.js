'use strict';

// selecting elements
const player0el = document.querySelector('.player--0');
const player1el = document.querySelector('.player--1');
let el0score = document.querySelector('#score--0');
let el1score = document.getElementById('score--1');
let current0el = document.querySelector('#current--0');
let current1el = document.querySelector('#current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

// Starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  el0score.textContent = 0;
  el1score.textContent = 0;
  current0el.textContent = 0;
  current1el.textContent = 0;

  diceEl.classList.add('hidden');
  player0el.classList.remove('player--winner');
  player1el.classList.remove('player--winner');
  player0el.classList.add('player--active');
  player1el.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0el.classList.toggle('player--active');
  player1el.classList.toggle('player--active');
};

//Rolling the dice functionality
btnRoll.addEventListener('click', function () {
  //Generate a random dice
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    //Display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //Check if the it's 1
    if (dice !== 1) {
      //add the dice to the current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  //adding the score to the player
  scores[activePlayer] += currentScore;

  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];

  //check if the player won

  if (scores[activePlayer] >= 100) {
    game = false;
    diceEl.classList.add('hidden');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
  } else {
    switchPlayer();
  }
});
btnNew.addEventListener('click', init);
