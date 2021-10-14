'use strict';
import PopUp from './popup.js';
import * as Sound from './sound.js';
import { GameBuilder, Reason } from './game.js';

const gameFinishBanner = new PopUp();
const game = new GameBuilder()
    .gameDuration(10)
    .carrotCount(5)
    .bugCount(5)
    .build();

game.setGameStopLinsener((reason) => {
    let message;
    switch (reason) {
        case Reason.cancle:
            message = 'REPLAY❓';
            Sound.playAlert();
            break;
        case Reason.win:
            message = 'YOU WON🎉';
            Sound.playWin();
            break;
        case Reason.lose:
            message = 'YOU LOST💩';
            Sound.playBug();
            break;
        default:
            throw new Error('not valid reaseon');
    }
    gameFinishBanner.showWithText(message);
    gameFinishBanner.setClickListener(() => {
        game.start();
    });
});
