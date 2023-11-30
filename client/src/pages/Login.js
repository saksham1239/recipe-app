import React, { useState } from "react";
import "../css/form.css";
import Form from "../components/Form";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [cookies, setCookies] = useCookies("access_token");

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/auth/login", {
        username,
        password,
      });

      // console.log(response.data.message);

      if (response.data.message !== undefined) {
        // alert(response.data.message);
        setError(response.data.message);
        throw response.data.message;
      }

      setCookies("access_token", response.data.token);
      window.localStorage.setItem("userID", response.data.userID);
      // console.log(response.data.token);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label="Login"
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default Login;
