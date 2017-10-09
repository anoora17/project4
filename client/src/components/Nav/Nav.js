import React from "react";

const Nav = () =>
  <nav className="navbar navbar-inverse navbar-top">
    <div className="container-fluid">
      <div className="navbar-header">
        <button type="button" className="collapsed navbar-toggle">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar" /> <span className="icon-bar" />
          <span className="icon-bar" />
        </button>
        
        <a href="/" className="navbar-brand">
          ACME Inc. Resume Database
        </a>
        
        <a href="/managers" className="navbar-brand">
        Managers
        </a>
        
        <a href="/candidates" className="navbar-brand">
        Candidates
        </a>
      </div>
    </div>
  </nav>;

export default Nav;
