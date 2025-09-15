import React from "react";

function LoggedIn({ setIsLoggedIn, setUsername, username, createToDoUser }) {
  return (
    <form className="border d-flex justify-content-center align-items-center vh-100">
      <div className="bg-input-loggin-button border rounded px-4 py-4">
        <label htmlFor="userName" className="form-label">
          <h4>Add your User / Create User</h4>
        </label>
        <input
          type="user"
          className="form-control text-center"
          id="userName"
          placeholder="type you user ..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              setUsername(e.target.value);
              createToDoUser(e.target.value);
              setIsLoggedIn(true);
            }
          }}
        />
      </div>
    </form>
  );
}

export default LoggedIn;
