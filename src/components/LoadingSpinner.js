import React from "react";

const LoadingSpinner = () => {
  return (
    <>
      <div className="spinner-border text-warning" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </>
  );
}

export default LoadingSpinner;