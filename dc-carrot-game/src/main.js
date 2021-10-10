'use strict';
import PopUp from './popup.js';
import Game from './game.js';

const gameFinishBanner = new PopUp();
const game = new Game(20, 5, 5);

game.setGameStopLinsener((reason) => {
    console.log(reason);
    let message;
    switch (reason) {
        case 'cancel':
            message = 'REPLAY❓';
            break;
        case 'win':
            message = 'YOU WON🎉';
            break;
        case 'lose':
            message = 'YOU LOST💩';
            break;
        default:
            throw new Error('not valid reaseon');
    }
    gameFinishBanner.showWithText(message);
    gameFinishBanner.setClickListener(() => {
        game.start();
    });
});
