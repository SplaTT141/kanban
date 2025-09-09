const inputDOM = document.getElementById('add-input');
const addBtnDOM = document.getElementById('add-btn');
const toDoTasksDOM = document.querySelector('.to-do-tasks');

addBtnDOM.addEventListener('click', () => {

    if (inputDOM.value !== '') {
        toDoTasksDOM.insertAdjacentHTML('afterbegin', `
            <div class="task">
                <p class="text">${inputDOM.value}</p>
                <div class="edit-block">
                    <input class="edit-input" value="${inputDOM.value}" />
                    <i class="submit fa fa-check" style="color:rgb(3, 188, 37);"></i>
                    <i class="cancel fa fa-times" style="color:red;"></i>
                </div>
                <div class="task-action">
                    <button class="edit fa fa-pencil" type="button"></button>
                    <button class="remove fa fa-trash" type="button"></button>
                </div>
            </div>`);
    }

    inputDOM.value = '';
});

toDoTasksDOM.addEventListener('click', e => {
    if (e.target.classList.contains('remove')) {
        e.target.closest('.task').remove();
    }

    if (e.target.classList.contains('edit')) {
        const task = e.target.closest('.task');
        task.querySelector('.text').style.display = 'none';
        task.querySelector('.edit-block').style.display = 'flex';
        const input = task.querySelector('.edit-input');
        input.focus();
        input.setSelectionRange(0, input.value.length);
    }

    if (e.target.classList.contains('cancel')) {
        const task = e.target.closest('.task');
        task.querySelector('.text').style.display = 'block';
        task.querySelector('.edit-block').style.display = 'none';
    }

    if (e.target.classList.contains('submit')) {
        const task = e.target.closest('.task');
        const newInputValue = task.querySelector('.edit-input').value;
        task.querySelector('.text').textContent = newInputValue;
        task.querySelector('.edit-block').style.display = 'none';
        task.querySelector('.text').style.display = 'block';
    }
});

