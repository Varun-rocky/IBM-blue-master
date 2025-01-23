import React from "react";

function Logout({ handleLogout }) {
  const onLogout = () => {
    localStorage.removeItem("jwtToken");
    handleLogout();
  };

  return (
    <button onClick={onLogout} style={{ marginTop: "20px" }}>
      Logout
    </button>
  );
}

export default Logout;
