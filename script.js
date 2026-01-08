const inputDOM = document.getElementById('add-input');
const addBtnDOM = document.getElementById('add-btn');
const toDoTasksDOM = document.getElementById('to-do-tasks');
const inProgressTasksDOM = document.getElementById('in-progress-tasks');
const doneTasksDOM = document.getElementById('done-tasks');

const toDoTaskCounterDOM = document.querySelector('.to-do-counter');
const inProgressCounterDOM = document.querySelector('.in-progress-counter');
const doneCounterDOM = document.querySelector('.done-counter');

/* ====== NEW TASK ====== */

addBtnDOM.addEventListener('click', () => {

    if (inputDOM.value !== '') {
        toDoTasksDOM.insertAdjacentHTML('afterbegin', `
            <div class="task" draggable="true">
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

const tasksTables = [
    toDoTasksDOM,
    inProgressTasksDOM,
    doneTasksDOM
];
/* ====== TABLE EDIT ====== */

tasksTables.forEach((table) => {
    table.addEventListener('click', e => {
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
    })
});


/* ====== DRAG AND DROP ====== */

let selected = null;

document.addEventListener('dragstart', (e) => {
    if (e.target.classList.contains('task')) {
        selected = e.target;
    }
});

tasksTables.forEach((table) => {
    table.addEventListener('dragover', (e) => { e.preventDefault() });
    table.addEventListener('drop', () => {
        table.appendChild(selected);
        selected = null;
    })
});

/* ====== TASKS COUNTER ====== */

const observer = new MutationObserver((mutations, observer) => {
    toDoTaskCounterDOM.textContent = toDoTasksDOM.querySelectorAll('.task').length;
    inProgressCounterDOM.textContent = inProgressTasksDOM.querySelectorAll('.task').length;
    doneCounterDOM.textContent = doneTasksDOM.querySelectorAll('.task').length;
});

observer.observe(toDoTasksDOM, { childList: true });
observer.observe(inProgressTasksDOM, { childList: true });
observer.observe(doneTasksDOM, { childList: true });