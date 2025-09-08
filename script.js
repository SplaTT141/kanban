const inputDOM = document.getElementById('add-input');
const addBtnDOM = document.getElementById('add-btn');
const taskDOM = document.querySelector('.task');

addBtnDOM.addEventListener('click', () => {
    taskDOM.innerHTML = `
         <p class="text">${inputDOM.value}</p>
         <div class="task-action">
             <button class="edit fa fa-pencil"></button>
             <button class="remove fa fa-trash"></button>
         </div>
    `;
});