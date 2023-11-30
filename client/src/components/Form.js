import React from "react";

const Form = ({
  username,
  setUsername,
  password,
  setPassword,
  label,
  onSubmit,
  error,
}) => {
  return (
    <div className="form-boss">
      <form className="form-container" onSubmit={onSubmit}>
        <h2>{label}</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>

        <button className="form-button" type="Submit">
          {label}
        </button>
      </form>

      <div
        style={error ? { display: "block" } : { display: "none" }}
        className="form-error"
      >
        **{error}**
      </div>
    </div>
  );
};

export default Form;
