const coordinate = document.querySelector('.coordinate');
const cursorImg = document.querySelector('.cursor');
const cursorX = cursorImg.getBoundingClientRect().width / 2;
const cursorY = cursorImg.getBoundingClientRect().height / 2;

document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;

    coordinate.innerHTML = `${x}, ${y}`;
    coordinate.style.transform = `translate(${x + 20}px,${y + 20}px)`;
    cursorImg.style.transform = `translate(${x - cursorX}px,${y - cursorY}px)`;

    document.querySelector('.horizon').style.transform = `translateY(${y}px)`;
    document.querySelector('.vertical').style.transform = `translateX(${x}px)`;
});
