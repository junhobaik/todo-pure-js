let ns = {};

ns.dispatcher = {
  register: fnlist => {
    this.fnlist = fnlist;
  },
  emit: (o, data) => {
    this.fnlist[o.type].apply(null, data);
  }
};

ns.util = {
  ajax: (url, fn, sendData = {}) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(sendData));

    xhr.addEventListener("load", () => {
      const data = xhr.response;
      fn(data);
    });
  }
};

ns.model = {
  todoList: [],
  setData: function(data) {
    this.todoList = data;
  },
  getData: function() {
    return this.todoList;
  },
  addData: function(addData, fn) {
    ns.util.ajax(
      "/main/add",
      res => {
        const key = JSON.parse(res).insertId;
        this.todoList = [
          ...this.todoList,
          {
            user_num: addData.userNum,
            text_num: key,
            text: addData.textValue
          }
        ];
        if (fn) fn();
      },
      addData
    );
  },
  editData: function(data, index, fn) {
    ns.util.ajax(
      "/main/edit",
      _ => {
        this.todoList[index].text = data.editedText;
        if (fn) fn();
      },
      { text_num: data.key, text: data.editedText }
    );
  },
  deleteData: function(deleteKey, deleteIndex, fn) {
    ns.util.ajax(
      "/main/delete",
      _ => {
        this.todoLiot = this.todoList.splice(deleteIndex, 1);
        if (fn) fn();
      },
      { key: deleteKey }
    );
  }
};

ns.view = {
  init: function() {
    this.registerEvents();
  },

  renderView: function(data) {
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
    this.registerEvents();
  },

  registerEvents: function() {
    const addForm = document.querySelector(".add-form");
    const userNum = parseInt(location.search.split("?num=")[1]);

    addForm.addEventListener("submit", e => {
      e.preventDefault();
      e.stopImmediatePropagation();
      const textValue = document.querySelector(".add-form>input").value;
      ns.dispatcher.emit({ type: "add" }, [{ userNum, textValue }]);
    });

    const todos = Array.from(document.querySelectorAll(".todo-list>ul>li"));
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

    const findIndex = e => {
      let index;
      Array.from(e.path[2].querySelectorAll("li")).map((v, i) => {
        if (v === e.path[1]) {
          index = i;
        }
      });
      return index;
    };

    todos.map(v => {
      const vSapn = v.querySelector(".todo-span"),
        vInput = v.querySelector(".todo-input"),
        vEditBtn = v.querySelector(".edit-btn"),
        vDoneBtn = v.querySelector(".done-btn"),
        vDelBtn = v.querySelector(".del-btn"),
        vKey = v.attributes.key.value;

      vEditBtn.addEventListener("click", e => {
        toggleShow(vInput, vSapn, vDoneBtn, vEditBtn);
      });

      vDoneBtn.addEventListener("click", e => {
        const editedText = vInput.value;
        toggleShow(vInput, vSapn, vDoneBtn, vEditBtn);
        ns.dispatcher.emit({ type: "edit" }, [
          { key: vKey, editedText },
          findIndex(e)
        ]);
      });
      vDelBtn.addEventListener("click", e => {
        ns.dispatcher.emit({ type: "delete" }, [vKey, findIndex(e)]);
      });
    });
  }
};

ns.controller = {
  join: function() {
    ns.dispatcher.register({
      init: data => {
        this.model.setData(data);
        this.view.renderView(data);
      },
      add: addData => {
        this.model.addData(addData, () => {
          this.view.renderView(this.model.getData());
        });
      },
      edit: (editData, index) => {
        this.model.editData(editData, index, () => {
          this.view.renderView(this.model.getData());
        });
      },
      delete: (key, index) => {
        this.model.deleteData(key, index, () => {
          this.view.renderView(this.model.getData());
        });
      }
    });
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const model = Object.assign(Object.create(ns.model), {});
  const view = Object.assign(Object.create(ns.view), {});
  const controller = Object.assign(Object.create(ns.controller), {
    model,
    view
  });

  view.init();
  controller.join();
});

document.addEventListener("DOMContentLoaded", () => {
  ns.util.ajax(`/main/user${location.search}`, res => {
    const data = JSON.parse(res);
    ns.dispatcher.emit(
      {
        type: "init"
      },
      [data]
    );
  });
});
