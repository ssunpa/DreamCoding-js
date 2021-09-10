const playBtn = document.querySelector('.playButton');
const countdown = document.querySelector('.countdownTimer');
let limitTime = 10;

// 카운트다운 타이머
function startTimer() {
    let timerID = setInterval(() => {
        limitTime--;
        countdown.textContent = `0:${limitTime}`;
    }, 1000);
    if (limitTime == 0) {
        clearInterval(timerID);
    }
}

playBtn.addEventListener('click', () => {
    startTimer();
});
