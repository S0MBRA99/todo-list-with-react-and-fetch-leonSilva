import { useState } from "react";

function TaskSection({ todo, setTodo, putToDo, deleteToDo }) {
  
  const [isEditing,setIsEditing]= useState(-1)
  const [tempText,setTempText]= useState('')

  return (
    <section className="mt-5 text-center w-50 mx-auto">
      {todo.map((element, index) => {
        return (
          <div className="border rounded mb-1">
            {isEditing === index?(
              <input 
              value={tempText}
              onChange={(e)=>setTempText(e.target.value)}
              autoFocus
              onKeyDown={(e)=>{
                if(e.key==='Enter'){
                  setTodo(
                    todo.map((element,i)=>{
                      if(i===index){
                        setTempText(e.target.value)
                        setIsEditing(-1)
                        let changes = {...element,label:e.target.value}
                        putToDo(changes,element.id)
                        return {...element,label:e.target.value}
                      }
                      return element
                    })
                  )
                }
              }}
              className="form-control"
               />
            ):(
              <p className="my-auto overflow-scroll" key={index}>
                {element.label}
              </p>
            )}
            <div className="d-flex justify-content-evenly">
              <button
                type="button"
                className="border-0 rounded"
                onClick={() => {
                  setTempText(element.label)
                  setIsEditing(isEditing === -1? index:-1)}}
              >
                Edit: 📝
              </button>
              <button
                type="button"
                className="border-0 rounded"
                onClick={() => {
                  setTodo(
                    todo.map((label, i) => {
                      if (i === index) {
                        let changeToDo = {
                          ...label,
                          is_done: label.is_done === false ? true : false,
                        };
                        putToDo(changeToDo, label.id);
                        return {
                          ...label,
                          is_done: label.is_done === false ? true : false,
                        };
                      }
                      return label;
                    })
                  );
                }}
              >
                Status task: {element.is_done === false ? "🔲" : "✅"}
              </button>
              <button
                type="button"
                className="border-0 rounded"
                onClick={() => {
                  let changes = todo.filter((element, i) => i != index);
                  deleteToDo(element.id);
                  setTodo([...changes]);
                }}
              >
                Delete: 🗑️
              </button>
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default TaskSection;
