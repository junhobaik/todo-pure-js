const ajax = (url, fn)=>{
  const xhr = new XMLHttpRequest();
  xhr.open('POST', url);
  xhr.setRequestHeader('Content-Type', "application/json");
  xhr.send();

  xhr.addEventListener('load', ()=>{
    const data = JSON.parse(xhr.responseText);
    console.log('data, ', data);
    fn(data);
  })
}

const render = (data) => {
  const template = document.querySelector('#todoList').innerHTML;
  const todos = data.reduce((p,v,i)=>{
    return p + `<li>
    <span key=${v.text_num}>${v.text}</span>
    <button>Edit</button>
    <button>X</button>
    </li>`
  }, '')
  const result = template.replace(/{todoList}/, todos);  

  document.querySelector('.todo-list').innerHTML = result;
}


document.addEventListener("DOMContentLoaded", ()=>{
  ajax(`/main/user${location.search}`, render);
})
