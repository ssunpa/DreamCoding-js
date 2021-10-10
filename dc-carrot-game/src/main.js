'use strict';
import PopUp from './popup.js';
import Field from './field.js';
import * as Sound from './sound.js';

const CARROT_COUNT = 15;
const BUG_COUNT = 15;
const GAME_DURATION_SEC = 30;

const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

let started = false;
let score = 0;
let timer = undefined;

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(() => {
    startGame();
});

const gameField = new Field(CARROT_COUNT, BUG_COUNT);
gameField.setClickListener(onItemClick);

function onItemClick(item) {
    if (!started) {
        return;
    }
    if (item == 'carrot') {
        score++;
        updateScoreBoard();
        if (score == CARROT_COUNT) {
            finishGame(true);
        }
    } else if (item == 'bug') {
        finishGame(false);
    }
}

gameBtn.addEventListener('click', () => {
    if (started) {
        stopGame();
    } else {
        startGame();
    }
});

function startGame() {
    started = true;
    initGame();
    showStopButton();
    showTimerAndScore();
    startGameTimer();
    Sound.playBackground();
}

function stopGame() {
    started = false;
    stopGameTimer();
    hideGameButton();
    gameFinishBanner.showWithText('REPLAY❓');
    Sound.playAlert();
    Sound.stopBackground();
}

function finishGame(win) {
    started = false;
    hideGameButton();
    if (win) {
        Sound.playWin();
    } else {
        Sound.playAlert();
    }
    stopGameTimer();
    Sound.stopBackground();
    gameFinishBanner.showWithText(win ? 'YOU WON🎉' : 'YOU LOST💩');
}

function showStopButton() {
    const icon = gameBtn.querySelector('.fas');
    icon.classList.remove('fa-play');
    icon.classList.add('fa-stop');
    gameBtn.style.visibility = 'visible';
}

function hideGameButton() {
    gameBtn.style.visibility = 'hidden';
}

function showTimerAndScore() {
    gameTimer.style.visibility = 'visible';
    gameScore.style.visibility = 'visible';
}

function startGameTimer() {
    let remainingTimeSec = GAME_DURATION_SEC;
    updateTimerText(remainingTimeSec);
    timer = setInterval(() => {
        if (remainingTimeSec <= 0) {
            clearInterval(timer);
            finishGame(CARROT_COUNT === score);
            return;
        }
        updateTimerText(--remainingTimeSec);
    }, 1000);
}

function stopGameTimer() {
    clearInterval(timer);
}

function updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const secondes = time % 60;
    gameTimer.innerText = `${minutes}:${secondes}`;
}

function initGame() {
    score = 0;
    gameScore.innerText = CARROT_COUNT;
    gameField.init();
}

function updateScoreBoard() {
    gameScore.innerText = CARROT_COUNT - score;
}
