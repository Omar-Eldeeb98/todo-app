var todoInput = document.getElementById("todo_input");
var addTodoBtn = document.getElementById("add_todo_btn");

var TodoText = document.getElementById("todo_text");

var loader = document.getElementById("loader");
//^ ============================================================================
addTodoBtn.addEventListener("click", function () {
  //   console.log(todoInput.value);
  var task = {
    title: todoInput.value,
    apiKey: "65a006662681618c591bd6a1",
  };

  addTodo(task);
});
//^ ============================================================================

//& ================== add to-do ============================================
async function addTodo(task) {
  if (todoInput.value == "" || todoInput.value == " ") {
    Swal.fire({
      icon: "error",
      title: "🤡",
      text: "Can Not Add Empty Task",
      color: "white",
    });
  } else {
    var data = await fetch("https://todos.routemisr.com/api/v1/todos", {
      method: "post",
      body: JSON.stringify(task),
      headers: { "content-type": "application/json" },
    });
    var result = await data.json();
    if (result.message == "success") {
      getTodos();

      // clear input after add task
      clearInputs();
    }
    Swal.fire({
      position: "top-right",
      icon: "success",
      title: "Task Added Successfully",
      showConfirmButton: false,
      timer: 1000,
    });
    console.log(result); //~ for testing
  }
}
//& ================== add to-do ============================================

//& ================== get all todos ============================================
async function getTodos() {
  loader.style.display = "block";
  document.getElementById("tasks").classList.add("d-none");

  var data = await fetch(
    "https://todos.routemisr.com/api/v1/todos/65a006662681618c591bd6a1"
  );

  var result = await data.json();
  console.log(result.todos); //~ for testing

  if (result.message == "success") {
    loader.style.display = "none";
    document.getElementById("tasks").classList.remove("d-none");
    if ((result.todos.length == 0)) {
      document.getElementById("tasks").style.height = "0px";
      document.getElementById("all_tasks").classList.add("d-none");
      console.log("tasks is empty");
    }
    else {
      document.getElementById("tasks").style.height = "350px";
      document.getElementById("all_tasks").classList.remove("d-none");
    }

    displayTodos(result.todos);
  }
}
getTodos();

//& ================== get all todos ============================================

//& ================== display all todos ============================================
function displayTodos(data) {
  var cartona = "";
  for (var i = 0; i < data.length; i++) {
    cartona += ` 
    <div id="todo_content"
    class="todo w-75 mx-auto text-white d-flex align-items-center justify-content-between bg-success rounded-3 mt-3 p-2   ${
      data[i].completed ? "bg-danger" : ""
    } ">
    <p id="todo_text" class="px-1 p-0 m-0 text-capitalize ${
      data[i].completed ? "text-decoration-line-through" : ""
    }">
     ${data[i].title}
    </p>
    <div class="w-25 d-flex justify-content-evenly">
      <i onclick = "markComplete('${
        data[i]._id
      }')" class="complete_icon fa-solid fa-circle-check ${
      data[i].completed ? "d-none" : ""
    } "></i>
      <i onclick = "deleteTodo('${
        data[i]._id
      }')" class="delete_icon fa-solid fa-trash-can "></i>
    </div>
  </div>`;
  }
  document.getElementById("tasks").innerHTML = cartona;
}

//& ================== display all todos ============================================

//& ================== delete todo ============================================

async function deleteTodo(id) {
  var taskId = {
    todoId: id,
  };
  var data = await fetch("https://todos.routemisr.com/api/v1/todos", {
    method: "delete",
    body: JSON.stringify(taskId),
    headers: { "content-type": "application/json" },
  });
  var result = await data.json();
  if (result.message == "success") {
    getTodos();
    Swal.fire({
      position: "top-right",
      icon: "success",
      title: "This Task Is Deleted",
      showConfirmButton: false,
      timer: 1000,
    });
  }
  console.log(result); //~ for testing
}

//& ================== delete todo  ============================================

//& ================== mark complete  ============================================

async function markComplete(id) {
  var taskId = {
    todoId: id,
  };
  var data = await fetch("https://todos.routemisr.com/api/v1/todos", {
    method: "put",
    body: JSON.stringify(taskId),
    headers: { "content-type": "application/json" },
  });
  var result = await data.json();
  if (result.message == "success") {
    getTodos();
    Swal.fire({
      position: "top-right",
      icon: "success",
      title: "This Task Is Completed",
      showConfirmButton: false,
      timer: 1000,
    });
  }
  console.log(result); //~ for testing
}

//& ================== mark complete  ============================================

//& ================== clear  inputs  ============================================
function clearInputs() {
  todoInput.value = "";
}
//& ================== clear inputs  ============================================
