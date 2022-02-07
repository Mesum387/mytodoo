// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-analytics.js";
import { getDatabase, ref, push, set,onValue,update,remove } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDZYUHqGBzFKoLAjtbfW3eyVKifb4M-Les",
    authDomain: "real-todo-cb464.firebaseapp.com",
    projectId: "real-todo-cb464",
    storageBucket: "real-todo-cb464.appspot.com",
    messagingSenderId: "1057377344877",
    appId: "1:1057377344877:web:667f022b061de478fbce64",
    measurementId: "G-KYDKY387FY"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase();

window.addingtodo= function(){
    var obj={
        todo: document.getElementById("myinptodo").value
    }
    var toDo_ref = push(ref(db,"ToDo")) 
    obj.key = toDo_ref.key; 
    set(toDo_ref,obj)
    
    var toDos = document.getElementById("toDo")
    onValue(ref(db,"ToDo"),function(data){
        // console.log(data.val());
        // var TodoList=Object.values(data.val())
        // for(var j =0;j<TodoList;i++){
        //     console.log(TodoList[j])
        // }
        // console.log(TodoList)
        
        toDos.innerHTML=''
        data.forEach(function(Todos){
            console.log(Todos.val())
            var TodoLi =Todos.val().todo
            var TodoKey =Todos.val().key
            if(TodoLi){
                toDos.innerHTML+=`TODO : ${TodoLi}   
                <button class="btn btn-outline-primary fs-4 fw-bold" onclick="edit('${TodoKey}')">Edit</button>
                <button class="btn btn-outline-danger fs-4 fw-bold" onclick="DeleteTodo('${TodoKey}')">Delete</button>
                 <br/>`
                
            }
        else{
            toDos.innerHTML='No Todos are available.'
        }
        });
    
    })
}



window.edit = function(id){
var NewTodo = prompt(`EDIT TODO`)
console.log(id)
update(ref(db,`ToDo/${id}`),{
    todo:NewTodo
})


}

window.DeleteTodo=function(id){
    remove(ref(db,`ToDo/${id}`))
}


//delete all
window.deleteall=function()
{
remove(ref(db));
}





