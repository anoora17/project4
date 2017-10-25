import React from "react";

import "./jumbotron.css"


const Jumbotron = ({ children }) =>
  <div style={{ height: 200 }} className="jumbotron">
    {children}
  </div>;

export default Jumbotron;
