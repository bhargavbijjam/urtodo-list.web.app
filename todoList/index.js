let todoList = document.getElementById("todoItemsContainer");

let saveButton = document.getElementById("saveButton");

saveButton.onclick = function () {
  localStorage.setItem("todoListItem", JSON.stringify(todoListItem));
};

function getTodoListfromLocalStorage() {
  let todoListItem = localStorage.getItem("todoListItem");
  if (todoListItem == null) {
    return [];
  } else {
    return JSON.parse(todoListItem);
  }
}

let todoListItem = getTodoListfromLocalStorage();

function checkboxcheck(checkboxId, labelId, todoItemId) {
  let inputElement = document.getElementById(checkboxId);
  let labelElement = document.getElementById(labelId);
  labelElement.classList.toggle("checked");
  let todoIndex = todoListItem.findIndex(function (eachTodo) {
    if ("todoItem" + eachTodo.id === todoItemId) {
      return true;
    } else {
      return false;
    }
  });

  let todoObject = todoListItem[todoIndex];

  if (todoObject.isChecked === true) {
    todoObject.isChecked = false;
  } else {
    todoObject.isChecked = true;
  }
}

function todoItemRemove(todoItemId) {
  let todoList = document.getElementById("todoItemsContainer");
  let todoItem = document.getElementById(todoItemId);
  todoList.removeChild(todoItem);
  let deleteTodoIndex = todoListItem.findIndex(function (eachtodo) {
    let eachTodoId = "todoItem" + eachtodo.id;
    if (eachTodoId === todoItemId) {
      return true;
    } else {
      return false;
    }
  });
  todoListItem.splice(deleteTodoIndex, 1);
}

function appendTodo(todo, isChecked) {
  let checkboxId = "checkbox" + todo.id;
  let labelId = "label" + todo.id;
  let todoItemId = "todoItem" + todo.id;
  let deleteIconId = "deleteIcon" + todo.id;

  let todoItem = document.createElement("li");
  todoItem.className = "todo-item-container d-flex flex-row";
  todoItem.id = todoItemId;

  let inputElement = document.createElement("input");
  inputElement.type = "checkbox";
  inputElement.className = "checkbox-input";
  inputElement.id = checkboxId;
  inputElement.checked = todo.isChecked;
  inputElement.onclick = function () {
    checkboxcheck(checkboxId, labelId, todoItemId);
  };

  let labelContainer = document.createElement("div");
  labelContainer.className = "label-container d-flex flex-row";

  let labelElement = document.createElement("label");
  labelElement.className = "checkbox-label";
  labelElement.textContent = todo.text;
  labelElement.setAttribute("for", checkboxId);
  labelElement.id = labelId;

  if (todo.isChecked === true) {
    labelElement.classList.add("checked");
  }

  let deleteIconContainer = document.createElement("div");
  deleteIconContainer.className = "delete-icon-container";

  let deleteIcon = document.createElement("i");
  deleteIcon.className = "fa-regular fa-trash-can delete-icon";

  deleteIconContainer.onclick = function () {
    todoItemRemove(todoItemId);
  };

  todoList.appendChild(todoItem);
  todoItem.appendChild(inputElement);
  todoItem.appendChild(labelContainer);
  labelContainer.appendChild(labelElement);
  deleteIconContainer.appendChild(deleteIcon);
  labelContainer.appendChild(deleteIconContainer);
}

function todoItemAdd() {
  let todoInput = document.getElementById("todoUserInput");
  let todoText = todoInput.value;
  if (todoText === "") {
    alert("Please enter valid input");
    return;
  }
  let newTodo = {
    text: todoText,
    id: todoListItem.length + 1,
    isChecked: false,
  };
  todoListItem.push(newTodo);
  appendTodo(newTodo);
  todoInput.value = "";
}

let button = document.getElementById("Add");
button.onclick = function () {
  todoItemAdd();
};

for (let item of todoListItem) {
  appendTodo(item, todoListItem.isChecked);
}
