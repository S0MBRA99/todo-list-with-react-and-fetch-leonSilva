import { use, useState } from "react";

function ResetAllTaskButton({todo, setTodo, deleteToDo}) {
  return (
    <div className="d-flex justify-content-center mt-3 w-50 mx-auto">
      <button
        type="button"
        className="btn btn-danger"
        onClick={() => {
          for(const element of todo){
            deleteToDo(element.id)
          }
          setTodo([]);

        }}
      >
        Reset all tasks
      </button>
    </div>
  );
}

export default ResetAllTaskButton