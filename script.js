const inputDOM = document.getElementById('add-input');
const addBtnDOM = document.getElementById('add-btn');
const tasksDOM = document.querySelector('.tasks');

addBtnDOM.addEventListener('click', () => {

    if (inputDOM.value !== '') {
        tasksDOM.insertAdjacentHTML('afterbegin', `
            <div class="task">
                <p class="text">${inputDOM.value}</p>
                <div class="task-action">
                    <button class="edit fa fa-pencil"></button>
                    <button class="remove fa fa-trash"></button>
                </div>
            </div>`);
    }

    tasksDOM.addEventListener('click', e => {
        if (e.target.classList.contains('remove')) {
            e.target.closest('.task').remove();
        }
    })

    inputDOM.value = '';
});