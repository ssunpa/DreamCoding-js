const startBtn = document.querySelector('.startButton');
const stopBtn = document.querySelector('.stopButton');
const retryBtn = document.querySelector('.retryButton');
const timer = document.querySelector('.countdownTimer');
const retry = document.querySelector('.retry');

let timerID = null;

// start버튼을 stop버튼으로
function toggleBtn() {
    startBtn.style.display = 'none';
    stopBtn.classList.toggle('active');
}

// retry창 보이기
function showRetry() {
    retry.classList.toggle('active');
    stopBtn.classList.toggle('active');
}

// 카운트다운 타이머
function startTimer() {
    let limitTime = 10;
    timer.innerHTML = '0:10';
    timerID = setInterval(function () {
        limitTime -= 1;
        timer.innerHTML = `0:${limitTime}`;
        if (limitTime == 0) {
            stopTimer();
            showRetry();
        }
    }, 1000);
}
function stopTimer() {
    clearInterval(timerID);
}

// image 랜덤 배치
const playground = document.querySelector('.playground');
function randomPosition() {
    const x = playground.offsetHeight - 80;
    const y = playground.offsetWidth - 80;

    let randomX = Math.floor(Math.random() * x);
    let randomY = Math.floor(Math.random() * y);
    return [randomX, randomY];
}

function placeImg() {
    cnt = 10;
    while (cnt > 0) {
        const c_img = document.createElement('img');
        c_img.setAttribute('class', 'carrotImg');
        c_img.setAttribute('src', './img/carrot.png');
        playground.appendChild(c_img);
        var c_xy = randomPosition();
        c_img.style.top = c_xy[0] + 'px';
        c_img.style.left = c_xy[1] + 'px';

        const b_img = document.createElement('img');
        b_img.setAttribute('class', 'bugImg');
        b_img.setAttribute('src', './img/bug.png');
        playground.appendChild(b_img);
        var b_xy = randomPosition();
        b_img.style.top = b_xy[0] + 'px';
        b_img.style.left = b_xy[1] + 'px';
        cnt--;
    }
}

// 게임 시작
startBtn.addEventListener('click', () => {
    toggleBtn();
    startTimer();
    placeImg();
});

// 게임 중도 포기
stopBtn.addEventListener('click', () => {
    stopTimer();
    showRetry();
});

// 재시작
retry.addEventListener('click', () => {
    startTimer();
    showRetry();
});
