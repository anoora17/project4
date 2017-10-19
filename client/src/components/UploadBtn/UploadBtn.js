import React from "react";
import "./UploadBtn.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
const UploadBtn = props => (
  <span className="btn btn-info" {...props}>
    Upload
  </span>
);

export default UploadBtn;
