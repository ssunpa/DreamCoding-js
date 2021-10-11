'use strict';
import PopUp from './popup.js';
import GameBuilder from './game.js';

const gameFinishBanner = new PopUp();
const game = new GameBuilder()
    .gameDuration(10)
    .carrotCount(5)
    .bugCount(5)
    .build();

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
