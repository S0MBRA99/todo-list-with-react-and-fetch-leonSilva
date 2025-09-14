import React, { useEffect, useState } from "react";
import FormHome from "./FormHome";
import TaskSection from "./TaskSection";
import ResetAllTaskButton from "./ResetAllTaskButton";
import LoggedIn from "./LoggedIn";


function Home() {
  const [todo, setTodo] = useState([]);
  const [isLoggedIn,setIsLoggedIn] = useState(false)
  const [username,setUserName]= useState('')  
  
  useEffect(()=>{
    if(isLoggedIn && username){
      getTodo()
    }
  },[isLoggedIn,username])
  
  function getTodo(){
    fetch(`https://playground.4geeks.com/todo/users/${username}`)
      .then((response) => {
        if(!response.ok){
          throw new Error('Error en la respuesta:'+ response.status)
        }
        return response.json()
      })
      //.then(data=> console.log(data))
      .then(data=> setTodo(data.todos))

      .catch(err=> console.log('there was a error:'+ err))
  }

  function createToDoUser(username){
    fetch(`https://playground.4geeks.com/todo/users/${username}`,{
      method: 'POST',
      body:JSON.stringify({
        name: username
      }),
      headers:{
        'Content-Type': 'application/json'
      }})
      .then((response) => {
        if(!response.ok){
          throw new Error('Error en la respuesta:'+ response.status)
        }
        return response.json()
      })
      .then(response=> response)
      .catch(err=> 'there was a error' + err)
  }

  function postToDo(dataToDo){
    //console.log(JSON.stringify(dataToDo))
    return fetch(`https://playground.4geeks.com/todo/todos/${username}`,{
      method:'POST',
      body: JSON.stringify(dataToDo),
      headers:{
        'Content-Type': 'application/json'
      }
    })  
    .then((response) =>{
      if(!response.ok){
        throw new Error('Error en la respuesta:'+ response.status) 
      }
      return response.json()
    })
    
    .then(response => response) // este response ya esta siendo retornado en la linea 33 para darselo al setToDo en FormHome ln 20
    .catch(error => console.log(error))
  }

  function putToDo(dataToDo,id){
    //console.log(JSON.stringify(dataToDo))
    fetch(`https://playground.4geeks.com/todo/todos/${id}`,{
      method:'PUT',
      body: JSON.stringify(dataToDo),
      headers:{
        'Content-Type': 'application/json'
      }
    })  
    .then((response) =>{
      if(!response.ok){
        throw new Error('Error en la respuesta:'+ response.status) 
      }
      return response.json()
    })
    
    .then(response => console.log('updated correctly',response))
    .catch(error => console.log(error))
  }
  
  function deleteToDo(id){
    fetch(`https://playground.4geeks.com/todo/todos/${id}`,{
      method:'DELETE',
      headers:{
        'content-Type': 'application/json'
      }
    })  
    .then((response) =>{
      if(!response.ok){
        throw new Error('Error en la respuesta:'+ response.status) 
      }
      return response.json()
    })
    
    .then(response => console.log('task was deleted correctly',response)) 
    .catch(error => console.log(error))
  }

  return (
    <>
      {isLoggedIn === false?
      (
        <LoggedIn setIsLoggedIn={setIsLoggedIn} setUsername={setUserName} createToDoUser={createToDoUser} username={username}/>
      ):(
    <>
      <header>
       <h1 className="text-center mt-4">Leon Silva's To-Do List</h1>
      </header>
      <main>
        <FormHome todo={todo} setTodo={setTodo} postToDo={postToDo}/>
        <TaskSection todo={todo} setTodo={setTodo} putToDo={putToDo} deleteToDo={deleteToDo}/>
		    <ResetAllTaskButton todo={todo} setTodo={setTodo} deleteToDo={deleteToDo}/>
      </main>
    </>
      )}
    </>
  );
}

export default Home;
