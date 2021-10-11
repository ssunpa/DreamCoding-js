'use strict';
import Field from './field.js';
import * as Sound from './sound.js';

// Builder pattern
export default class gameBuilder {
    gameDuration(duration) {
        this.gameDuration = duration;
        return this;
    }

    carrotCount(num) {
        this.carrotCount = num;
        return this;
    }

    bugCount(num) {
        this.bugCount = num;
        return this;
    }

    build() {
        return new Game(
            this.gameDuration, //
            this.carrotCount,
            this.bugCount
        );
    }
}

class Game {
    constructor(gameDuration, carrotCount, bugCount) {
        this.gameDuration = gameDuration;
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;

        this.gameTimer = document.querySelector('.game__timer');
        this.gameScore = document.querySelector('.game__score');
        this.gameBtn = document.querySelector('.game__button');
        this.gameBtn.addEventListener('click', () => {
            if (this.started) {
                this.stop();
            } else {
                this.start();
            }
        });
        this.gameField = new Field(carrotCount, bugCount);
        this.gameField.setClickListener(this.onItemClick);

        this.started = false;
        this.score = 0;
        this.timer = undefined;
    }

    setGameStopLinsener(onGameStop) {
        this.onGameStop = onGameStop;
    }

    start() {
        this.started = true;
        this.initGame();
        this.showStopButton();
        this.showTimerAndScore();
        this.startGameTimer();
        Sound.playBackground();
    }

    stop() {
        this.started = false;
        this.stopGameTimer();
        this.hideGameButton();
        Sound.playAlert();
        Sound.stopBackground();
        this.onGameStop && this.onGameStop('cancel');
    }

    finish(win) {
        this.started = false;
        this.hideGameButton();
        if (win) {
            Sound.playWin();
        } else {
            Sound.playAlert();
        }
        this.stopGameTimer();
        Sound.stopBackground();
        this.onGameStop && this.onGameStop(win ? 'win' : 'lose');
    }

    onItemClick = (item) => {
        if (!this.started) {
            return;
        }
        if (item == 'carrot') {
            this.score++;
            this.updateScoreBoard();
            if (this.score == this.carrotCount) {
                this.finish(true);
            }
        } else if (item == 'bug') {
            this.finish(false);
        }
    };

    showStopButton() {
        const icon = this.gameBtn.querySelector('.fas');
        icon.classList.remove('fa-play');
        icon.classList.add('fa-stop');
        this.gameBtn.style.visibility = 'visible';
    }

    hideGameButton() {
        this.gameBtn.style.visibility = 'hidden';
    }
    showTimerAndScore() {
        this.gameTimer.style.visibility = 'visible';
        this.gameScore.style.visibility = 'visible';
    }
    startGameTimer() {
        let remainingTimeSec = this.gameDuration;
        this.updateTimerText(remainingTimeSec);
        this.timer = setInterval(() => {
            if (remainingTimeSec <= 0) {
                clearInterval(this.timer);
                this.finish(this.carrotCount === this.score);
                return;
            }
            this.updateTimerText(--remainingTimeSec);
        }, 1000);
    }

    stopGameTimer() {
        clearInterval(this.timer);
    }
    updateTimerText(time) {
        const minutes = Math.floor(time / 60);
        const secondes = time % 60;
        this.gameTimer.innerText = `${minutes}:${secondes}`;
    }

    initGame() {
        this.score = 0;
        this.gameScore.innerText = this.carrotCount;
        this.gameField.init();
    }

    updateScoreBoard() {
        this.gameScore.innerText = this.carrotCount - this.score;
    }
}
