const ajax = (url, fn, sendData) => {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", url);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(sendData) || '');

  xhr.addEventListener("load", () => {
    const data = JSON.parse(xhr.responseText);
    console.log("data, ", data);
    fn(data);
  });
};

const render = data => {
  const template = document.querySelector("#todoList").innerHTML;
  const todos = data.reduce((p, v, i) => {
    return (
      p +
      `<li key=${v.text_num}>
    <span class="todo-span">${v.text}</span>
    <input class="todo-input" style="display:none;" type="text" value="${
      v.text
    }"/>
    <button class="edit-btn">Edit</button>
    <button class="done-btn" style="display:none;">Done</button>
    <button class="del-btn">X</button>
    </li>`
    );
  }, "");
  const result = template.replace(/{todoList}/, todos);

  document.querySelector(".todo-list").innerHTML = result;
};

const toggleShow = function(els) {
  const args = Array.from(arguments);
  args.map(v => {
    if (v.style.display === "none") {
      v.style.display = "inline-block";
    } else {
      v.style.display = "none";
    }
  });
};

const edit = () => {
  const todos = Array.from(document.querySelectorAll(".todo-list>ul>li"));
  todos.map(v => {
    const vSapn = v.querySelector(".todo-span"),
      vInput = v.querySelector(".todo-input"),
      vEditBtn = v.querySelector(".edit-btn"),
      vDoneBtn = v.querySelector(".done-btn");

    vEditBtn.addEventListener("click", e => {
      toggleShow(vInput, vSapn, vDoneBtn, vEditBtn);
    });

    vDoneBtn.addEventListener("click", e => {
      const editedValue = vInput.value;
      vSapn.innerText = editedValue;

      toggleShow(vInput, vSapn, vDoneBtn, vEditBtn);
    });
  });
};

const deleteTodo = () => {
  const delBtn = Array.from(
    document.querySelectorAll(".todo-list>ul>li .del-btn")
  );
  delBtn.map(v => {
    v.addEventListener("click", e => {
      const key = parseInt(e.target.parentElement.attributes.key.value);
      e.target.parentElement.remove();
      ajax("/main/delete", (data)=>{
        //console.log(data);
      }, {key});
    });
  });
};

document.addEventListener("DOMContentLoaded", () => {
  ajax(`/main/user${location.search}`, data => {
    render(data);
    edit();
    deleteTodo();
  });
});
