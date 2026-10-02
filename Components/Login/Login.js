import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 
  const [allEntry, setAllEntry] = useState([]); 

  const submitForm = (e) => {
    e.preventDefault(); 
    const newEntry = { email: email, password: password };
    setAllEntry([...allEntry, newEntry]);
    
    // This directly forces the app to open the main dashboard!
    navigate("/dashboard"); 
  };

  return (
    <>
      <div style={{ height: "100%" }}>
        <div
          style={{
            position: "absolute",
            backgroundColor: "#0d6efd",
            height: "62%",
            clipPath: "polygon(100% 52%, 0% 100%, 0% 0%, 100% 0%)",
            overflow: "hidden",
            left: 0,
            right: 0,
            top: 0,
          }}
        />
        <form onSubmit={submitForm}>
          <section className="vh-100 login-custom">
            <div className="container py-5 h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                  <div className="card shadow-2-strong">
                    <div className="card-bodyy p-5 text-center">
                      <img
                        className="d-flex m-auto pb-3 img"
                        src="logo.png"
                        alt="logo"
                      />
                      <div className="card-title h5">
                        <h2>Login</h2>
                      </div>

                      <div className="mb-4 w-100">
                        <label className="form-label" htmlFor="formBasicEmail">
                          Email address
                        </label>
                        <input
                          placeholder="Enter email"
                          type="email"
                          id="formBasicEmail"
                          className="form-control"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>

                      <div className="mb-4 w-100">
                        <label className="form-label" htmlFor="formBasicPassword">
                          Password
                        </label>
                        <input
                          placeholder="Password"
                          type="password"
                          id="formBasicPassword"
                          className="form-control"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>

                      <button
                        className="btn btn-primary btn-lg btn-block"
                        type="submit"
                      >
                        Login
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </form>
      </div>
    </>
  );
}