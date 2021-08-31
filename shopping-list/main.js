const addBox = document.querySelector('#list_form');

addBox.addEventListener('submit', (event) => {
    const addTxt = document.querySelector('.list_add_txt');
    const addBox = document.querySelector('.list_box');

    const addList = document.createElement('li');
    addList.setAttribute('class', 'list_add');
    addList.textContent = addTxt.value;

    const addDel = document.createElement('i');
    addDel.setAttribute('class', 'fas fa-trash-alt');
    addDel.onclick = function () {
        this.parentElement.remove();
    };
    if (addTxt.value) {
        addBox.appendChild(addList);
        addList.appendChild(addDel);
        addTxt.value = '';
    } else {
        alert('내용을 입력해주세요!');
    }
    event.preventDefault();
});
