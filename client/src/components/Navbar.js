import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/navbar.css";
import { useCookies } from "react-cookie";
import { MdMenu } from "react-icons/md";
import { useGetUserID } from "../hooks/useGetUserID";

const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const userID = useGetUserID();

  const [showDrop, setShowDrop] = useState(false);

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/register");
  };

  useEffect(() => {
    setShowDrop(false);
  }, []);

  console.log(userID);

  return (
    <div className="Navbar">
      {/* <Link to="/">Home</Link>
      <Link to="/create-recipe">Create Recipe</Link>
      <Link to="/saved-recipe">Saved Recipes</Link>
      <Link to="/auth">Login / Register</Link> */}

      <div className="navbar-container">
        <div className="navbar-left">
          <button
            onClick={() => setShowDrop(!showDrop)}
            className="navbar-menu"
          >
            <MdMenu className="menu-icon" />
          </button>
          <Link className="navbar-buttons" to="/">
            Home
          </Link>
          {cookies.access_token ? (
            <>
              <Link className="navbar-buttons" to="/create-recipe">
                Create
              </Link>
              <Link className="navbar-buttons" to="/saved-recipe">
                Saved
              </Link>
            </>
          ) : (
            <button style={{ display: "none" }}></button>
          )}
        </div>
        <div className="navbar-right">
          {!cookies.access_token || !userID ? (
            <>
              <Link className="navbar-buttons navbar-right-buttons" to="/login">
                Login
              </Link>
              <Link
                className="navbar-buttons navbar-right-buttons"
                to="/register"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                className="navbar-buttons navbar-right-buttons update-buttons"
                to="/update-user"
              >
                Update Username
              </Link>
              <Link
                className="navbar-buttons navbar-right-buttons update-buttons"
                to="/update-pass"
              >
                Update Password
              </Link>
              <button className="logout-button" onClick={logout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      {showDrop ? (
        <div className="navbar-sidebar">
          <Link className="sidebar-button" to="/">
            Home
          </Link>

          {cookies.access_token ? (
            <>
              {" "}
              <Link className="sidebar-button" to="/create-recipe">
                Create
              </Link>
              <Link className="sidebar-button " to="/saved-recipe">
                Saved
              </Link>
              <Link
                className="sidebar-button navbar-right-buttons update-buttons"
                to="/update-user"
              >
                Update Username
              </Link>
              <Link
                className="sidebar-button navbar-right-buttons update-buttons last-sidebar-button"
                to="/update-pass"
              >
                Update Password
              </Link>
            </>
          ) : (
            ""
          )}
        </div>
      ) : (
        <button style={{ display: "none" }}></button>
      )}

      {/* <div className="navbar-sidebar">
        <Link className="sidebar-button" to="/">
          Home
        </Link>
        <Link className="sidebar-button" to="/create-recipe">
          Create
        </Link>
        <Link
          className="sidebar-button saved-sidebar-button"
          to="/saved-recipe"
        >
          Saved
        </Link>
      </div> */}
    </div>
  );
};

export default Navbar;
