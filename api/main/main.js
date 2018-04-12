document.addEventListener("DOMContentLoaded", ()=>{
  const testDB = [
    {
      index: 1,
      text: 'test todo db 1'
    },
    {
      index: 2,
      text: 'test todo db 2'
    }
  ]
  const template = document.querySelector('#todoList').innerHTML;
  const todos = testDB.reduce((p,v,i)=>{
    return p + `<li>
    <span>${v.text}</span>
    <button>Edit</button>
    <button>X</button>
    </li>`
  }, '')
  const result = template.replace(/{todoList}/, todos);  

  document.querySelector('.todo-list').innerHTML = result;
})
