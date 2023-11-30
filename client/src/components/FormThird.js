import React from "react";

const FormThird = ({
  username,
  setUsername,
  reEnteredPassword,
  setreEnteredPassword,
  password,
  setPassword,
  newPassword,
  setNewPassword,
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

        <div className="form-group">
          <label htmlFor="updatedPass">Confirm Password</label>
          <input
            type="password"
            id="updatedPass"
            value={reEnteredPassword}
            onChange={(e) => {
              setreEnteredPassword(e.target.value);
            }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="newPass">New Password</label>
          <input
            type="password"
            id="newPass"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
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

export default FormThird;
