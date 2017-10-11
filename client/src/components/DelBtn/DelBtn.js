import React from "react";

const DelBtn = props =>
  <button {...props} style={{ float: "right" }} className="btn btn-danger">
    {props.children}
  </button>;

  export default DelBtn;