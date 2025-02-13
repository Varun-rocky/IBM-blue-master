import React, { useState } from "react";
import "./Signup.css";

function Signup({ setIsAuthenticated }) {
  const [isLogin, setIsLogin] = useState(false);

  const handleSwitch = () => setIsLogin(!isLogin);

  const handleSignup = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const managerEmail = e.target.managerEmail.value;
    const password = e.target.password.value;

    // Add logic to handle signup with email, managerEmail, and password
    if (email && managerEmail && password) {
      localStorage.setItem("jwtToken", "mockToken");
      setIsAuthenticated(true);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    // Mock login logic simply ignores the ManagerEmail field
    if (email && password) {
      localStorage.setItem("jwtToken", "mockToken");
      setIsAuthenticated(true);
    }
  };

  return (
    <div className="signup-container">
      <div className="form-container">
        <h1>{isLogin ? "Login" : "Sign Up"}</h1>
        <form onSubmit={isLogin ? handleLogin : handleSignup}>
          <input type="email" name="email" placeholder="Email" required />
          {!isLogin && (
            <input type="email" name="managerEmail" placeholder="Manager Email" required />
          )}
          <input type="password" name="password" placeholder="Password" required />
          <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
        </form>
        <p>
          {isLogin ? "New user? " : "Already have an account? "}
          <button className="toggle-button" onClick={handleSwitch}>
            {isLogin ? "Create an Account" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Signup;
