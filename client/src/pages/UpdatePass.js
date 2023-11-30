import React from "react";
import FormThird from "../components/FormThird.js";
import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const UpdatePass = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cookies, setCookies] = useCookies("access_token");
  const navigate = useNavigate();
  const [reEnteredPassword, setreEnteredPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/auth/updatePassword",
        {
          username,
          password,
          reEnteredPassword,
          newPassword,
        }
      );

      // console.log(response.data.message);

      if (response.data.message !== undefined && response.data.code !== 200) {
        // alert(response.data.message);
        setError(response.data.message);
        throw response.data.message;
      }

      alert("Password Updated successfully");
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="update-container">
      <h2 className="page-headings">Update Password</h2>
      <FormThird
        username={username}
        setUsername={setUsername}
        reEnteredPassword={reEnteredPassword}
        setreEnteredPassword={setreEnteredPassword}
        password={password}
        setPassword={setPassword}
        newPassword={newPassword}
        setNewPassword={setNewPassword}
        label="Update Password"
        onSubmit={onSubmit}
        error={error}
      />
    </div>
  );
};

export default UpdatePass;
