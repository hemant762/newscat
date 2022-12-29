import React from "react";

const Spinner = (props) => {
  return (
    <div className="text-center my-5">
      {props.heading && (
        <h4 className="my-5">News Cat - {props.heading}</h4>
      )}
      <div className="spinner-border" role="status"></div>
    </div>
  );
};

export default Spinner;
