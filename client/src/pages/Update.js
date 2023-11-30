import React from "react";
import FormSecond from "../components/FormSecond.js";
import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Update = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cookies, setCookies] = useCookies("access_token");
  const navigate = useNavigate();
  const [updatedUser, setUpdatedUser] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/auth/updateUser",
        {
          username,
          password,
          updatedUser,
        }
      );

      // console.log(response.data.message);

      if (response.data.message !== undefined && response.data.code !== 200) {
        // alert(response.data.message);
        setError(response.data.message);
        throw response.data.message;
      }

      alert("updated successfully");
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="update-container">
      <h2 className="page-headings">Update Username</h2>
      <FormSecond
        username={username}
        setUsername={setUsername}
        updatedUser={updatedUser}
        setUpdatedUser={setUpdatedUser}
        password={password}
        setPassword={setPassword}
        label="Update Username"
        onSubmit={onSubmit}
        error={error}
      />
    </div>
  );
};

export default Update;
