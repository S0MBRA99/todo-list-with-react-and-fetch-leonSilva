import React, { useState } from "react";
import postToDo from './Home'

function FormHome({todo,setTodo,postToDo}) {
  return (
    <form className="w-50 mx-auto">
      <div className="d-flex justify-content-center">
        <label htmlFor="exampleInputEmail1" className="form-label"></label>
        <input
          type=""
          className="form-control text-center mt-5"
          id="exampleInputEmail1"
          placeholder="type your task"
          onKeyDown={async (e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              let inputValueToDo = {label:e.target.value, is_done: false}
              
              try{
                const toDoWithId = await postToDo(inputValueToDo) //esperamos a que la API nos mande el objeto pero con el id que le haya puesto y devolvemos el objeto con todo
                setTodo([...todo, toDoWithId]);
              } catch(error){
                console.log('error to create toDo',error)
              }
              e.target.value = "";
            }
          }}
        />
      </div>
    </form>
  );
}

export default FormHome;
