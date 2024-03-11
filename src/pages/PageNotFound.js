import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for might be unavailable or does not exist.</p>
      <p>
        Return to <Link to="/">home</Link>.
      </p>
    </div>
  );
};

export default PageNotFound;
