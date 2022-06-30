const getTextBtn = document.getElementById('getText')
const getUserBtn = document.getElementById('getUser')
const getPostBtn = document.getElementById('getPost')
const addPostBtn = document.getElementById('addPost')
const outPut = document.getElementById('outPut')

getTextBtn.addEventListener('click', getText)
getUserBtn.addEventListener('click', getUser)
getPostBtn.addEventListener('click', getPost)
addPostBtn.addEventListener('submit', addPost)

function getText(){
    fetch('./components/info.txt')
    .then((res) =>  res.text())
    .then((data) => {
        outPut.innerHTML = data
    })
    .catch((err) => console.log(err))
}
function getUser(){
    fetch('./components/users.json')
    .then((res) => res.json())
    .then((data) => {
        let outPut = `<h2>Users</h2>`
        data.forEach((user) => {
            outPut+= `
                <ul>
                    <li>ID: ${user.id}</li>
                    <li>Name: ${user.name}</li>
                    <li>Email: ${user.email}</li>
                </ul>
            `
        })
        document.getElementById('outPut').innerHTML = outPut
    })
}
function getPost(){
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then((res) => res.json())
    .then((data) => {
        let outPut = `<h2>Posts</h2>`
        data.forEach((post) => {
            outPut+= `
                <div>
                    <h3>${post.title}</h3>
                    <p>${post.body}</p>
                </div>
            `
        })
        document.getElementById('outPut').innerHTML = outPut
    })
}
function addPost(e){
    e.preventDefault();
    const addPostDiv = document.getElementById('addPostDiv')
    let title = document.getElementById('title').value 
    let body = document.getElementById('body').value 
    
    let loader = `<div class="boxLoading">loading..</div>`;
    addPostDiv.innerHTML = loader;
    fetch('https://jsonplaceholder.typicode.com/posts',{
        method:'POST',
        headers:{
            'Accept': 'application/json, text/plain, */*',
            'Content-type':'application/json'
        },
        body:JSON.stringify({title:title, body:body})
    })
    .then((res) => res.json())
    .then((data) => {
        addPostDiv.innerHTML = `
            <ul>
                <li>Title: ${data.title}</li>
                <li>Body: ${data.body}</li>
            </ul>
        `
    })
}