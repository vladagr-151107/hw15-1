const form = document.querySelector('.js--form');
const input = document.querySelector('.js--form__input');
const todosWrapper = document.querySelector('.js--todos-wrapper');

const todos = JSON.parse(localStorage.getItem('todos')) || [];

function saveToDos(){
    localStorage.setItem('todos', JSON.stringify(todos));
}

function updateToDos(){
    todosWrapper.innerHTML = '';
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        if(todo.done) li.classList.add('todo-item--checked');

        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.checked = todo.done;
        checkBox.addEventListener('change', () => {
            todos[index].done = !todos[index].done;
            saveToDos();
            updateToDos();
        });

        const span = document.createElement('span');
        span.textContent = todo.text;
        span.classList.add('todo-item__description');

        const button = document.createElement('button');
        button.textContent = 'Delete';
        button.classList.add('todo-item__delete');
        button.addEventListener('click', () => {
            todos.splice(index, 1);
            saveToDos();
            updateToDos();
        });

        li.appendChild(checkBox);
        li.appendChild(span);
        li.appendChild(button);

        todosWrapper.appendChild(li);
    });
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if(text) {
        todos.push({ text, done: false});
        saveToDos();
        updateToDos();
        input.value = '';
    }
});

updateToDos();