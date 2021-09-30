// 사운드
const bgm = new Audio('sound/bg.mp3');
const wSound = new Audio('sound/game_win.mp3');
const rSound = new Audio('sound/alert.mp3');
const cSound = new Audio('sound/carrot_pull.mp3');
const bSound = new Audio('sound/bug_pull.mp3');

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
            gameover();
        }
    }, 1000);
}
function stopTimer() {
    clearInterval(timerID);
}

// image 랜덤 배치
const randomplace = document.querySelector('.gameImage');

function placeImg() {
    let img;
    // 당근 배치
    for (let i = 10; i > 0; i--) {
        img = 'carrot';
        createHTML(img);
    }
    for (let i = 10; i > 0; i--) {
        // 벌레 배치
        img = 'bug';
        createHTML(img);
    }
}

// 이미지 담을 틀 제작
function createHTML(who) {
    const width = randomplace.clientWidth;
    const height = randomplace.clientHeight;
    const img = document.createElement('img');
    img.setAttribute('class', who);
    img.setAttribute('src', `img/${who}.png`);
    img.style.top = Math.round(Math.random() * height - 70) + 'px';
    img.style.left = Math.round(Math.random() * width - 70) + 'px';

    if (who == 'carrot') {
        img.onclick = function () {
            img.style.display = 'none';
            carrotClicked();
        };
    } else {
        img.onclick = function () {
            bugClicked();
        };
    }

    randomplace.append(img);
    // randomplace.insertBefore(img, retry);
}

// 이미지 클릭
const msgBox = document.querySelector('.gameoverMessage');
const cntBox = document.querySelector('.carrotCount');
let cnt = 10;
function carrotClicked() {
    cSound.play();
    cnt--;
    cntBox.innerHTML = cnt;
    if (cnt == 0) {
        wSound.play();
        gameover();
        msgBox.textContent = 'YOU WON🤩';
    }
}

function bugClicked() {
    bSound.play();
    gameover();
}

// 게임 시작
startBtn.addEventListener('click', () => {
    bgm.play();
    bgm.loop = true;
    toggleBtn();
    startTimer();
    placeImg();
});

// 게임 중도 포기
stopBtn.addEventListener('click', () => {
    gameover();
});

// 재시작
retryBtn.addEventListener('click', () => {
    bgm.play();
    while (randomplace.hasChildNodes()) {
        randomplace.removeChild(randomplace.firstChild);
    }
    cnt = 10;
    cntBox.innerHTML = cnt;
    console.log(cnt);
    placeImg();
    startTimer();
    showRetry();
});

function gameover() {
    stopTimer();
    showRetry();
    msgBox.textContent = 'YOU LOST😜';

    rSound.play();
    bgm.pause();
    bgm.currentTime = 0;
}
