import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
        <div className="container">

          <span className="navbar-brand me-2">
            <img
              className="d-flex m-auto pb-3 img"
              src="logo.png"
              alt="logo"
            />
          </span>


          <button
            className="btn btn-danger"
            onClick={handleLogout}
          >
            Logout
          </button>


        </div>
      </nav>
    </>
  );
}