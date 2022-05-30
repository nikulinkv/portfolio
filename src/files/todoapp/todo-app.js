(function () {

    function createAppTitle(title) {
        let appTitle = document.createElement('h2')
        appTitle.innerHTML = title
        return appTitle
    }

    function whosTodo(title) {

        if (title === 'Мои дела') {
            nameArray = 'son'
            itemsArray = [
                { name: 'Купить хлеб', done: true },
                { name: 'Купить молоко', done: true },
                { name: 'Помыть посуду' }
            ];
        }
        else if (title === 'Дела для папы') {
            nameArray = 'dad'
            itemsArray = [
                { name: 'Купить маме цветов', done: true },
                { name: 'Сказать маме что она красивая', done: true },
                { name: 'Построить дом' }
            ];
        }
        else if (title === 'Дела для мамы') {
            nameArray = 'mom'
            itemsArray = [
                { name: 'Поцеловать мужа', done: true },
                { name: 'Поцеловать сына', done: true }
            ];
        }

        return {
            itemsArray,
            nameArray
        }
    }

    function createTodoItemForm() {
        let form = document.createElement('form')
        let input = document.createElement('input')
        let buttonWrapper = document.createElement('div')
        let button = document.createElement('button')

        form.classList.add('input-group', 'mb-3')
        input.classList.add('form-control')
        input.placeholder = "Введите название нового дела"
        buttonWrapper.classList.add('input-group-append')
        button.classList.add('btn', 'btn-primary', 'disabled')
        button.textContent = 'Добавить дело'

        buttonWrapper.append(button)
        form.append(input)
        form.append(buttonWrapper)

        input.addEventListener('input', function () {
            if (input.value.length > 0) {
                button.classList.remove('disabled')
            } else {
                button.classList.add('disabled')
            }
        })

        return {
            form,
            input,
            button,
        }
    }
    function createTodoList() {
        let list = document.createElement('ul')
        list.classList.add('list-group')
        return list
    }
    function createTodoItem(name, done) {

        let userItem = {
            name,
            done
        }

        let user = whosTodo()
        let item = document.createElement('li');
        let buttonGroup = document.createElement('div');
        let doneButton = document.createElement('button');
        let deleteButton = document.createElement('button');

        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        item.textContent = userItem.name;

        buttonGroup.classList.add('btn-group', 'btn-group-sm');
        doneButton.classList.add('btn', 'btn-success');
        doneButton.textContent = "Готово";
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.textContent = "Удалить";

        buttonGroup.append(doneButton);
        buttonGroup.append(deleteButton);
        item.append(buttonGroup);

        if (!userItem.done) {
            userItem.done = false;
        } else {
            item.classList.add('list-group-item-success')
        }

        doneButton.addEventListener('click', function () {
            console.log(user.nameArray)
            item.classList.toggle('list-group-item-success')
            let updateArray = (JSON.parse(localStorage.getItem(user.nameArray))).filter(function (el) {
                if (el.name == userItem.name) {
                    if (item.classList.contains('list-group-item-success')) {
                        el.done = true
                    } else (
                        el.done = false
                    )
                }
                return userItem
            })
            localStorage.setItem(user.nameArray, JSON.stringify(updateArray))
        });

        deleteButton.addEventListener('click', function () {
            if (confirm('Вы уверены?')) {
                let updateArray = JSON.parse(localStorage.getItem(user.nameArray)).filter(el => el.name != userItem.name)
                item.remove()
                if (updateArray.length === 0) {
                    localStorage.clear()
                } else {
                    localStorage.setItem(user.nameArray, JSON.stringify(updateArray))
                }
            };
        });


        return {
            userItem,
            item,
            doneButton,
            deleteButton,
        };
    };

    function createTodoApp(title) {

        let todoAppTitle = createAppTitle(title)
        let todoItemForm = createTodoItemForm()
        let todoList = createTodoList()
        let container = document.getElementById('todo-app')
        let user = whosTodo(title)

        container.append(todoAppTitle)
        container.append(todoItemForm.form)
        container.append(todoList)

        localItemsArray = JSON.parse(localStorage.getItem(user.nameArray))

        if (localStorage.getItem(user.nameArray) !== null) {
            user.itemsArray = localItemsArray
        }

        for (let todoItem of user.itemsArray) {
            todoItem = createTodoItem(todoItem.name, todoItem.done)
            todoList.append(todoItem.item)
        }

        todoItemForm.form.addEventListener('submit', function (e) {
            e.preventDefault()
            if (!todoItemForm.input.value) {
                return
            }
            todoItem = createTodoItem(todoItemForm.input.value)
            todoList.append(todoItem.item)
            user.itemsArray.push(todoItem.userItem)
            localStorage.setItem(user.nameArray, JSON.stringify(user.itemsArray))
            todoItemForm.input.value = ""
            todoItemForm.button.classList.add('disabled')
        })
        localStorage.setItem(user.nameArray, JSON.stringify(user.itemsArray))
    }
    window.createTodoApp = createTodoApp
})();