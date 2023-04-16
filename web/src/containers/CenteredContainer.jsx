import React from "react";

function CenteredContainer({ children }) {
  return (
    <div
      className="d-flex align-items-center justify-content-center pt-5"
      style={{ minHeight: "30vh" }}
    >
      {children}
    </div>
  );
}

export default CenteredContainer;
