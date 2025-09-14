import React from "react";

function LoggedIn({ setIsLoggedIn, setUsername, username, createToDoUser }) {
  return (
    <form className="border d-flex justify-content-center align-items-center vh-100">
      <div>
        <label htmlFor="userName" className="form-label">
          <strong>Add your User / Create User</strong>
        </label>
        <input
          type="user"
          className="form-control"
          id="userName"
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
