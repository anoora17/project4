import React from "react";

const Nav = () =>
  <nav className="navbar navbar-inverse navbar-fixed-top">
    <div className="container-fluid">
      <div className="navbar-header">
        
        <ul className="nav navbar-nav navbar-left">
          <a href="/" className="navbar-brand">
            ACME Inc. Resume Database
          </a>
          
          <a href="/managers" className="navbar-brand">
          Managers
          </a>
          
          <a href="/candidates" className="navbar-brand">
          Candidates
          </a>
        </ul>
        <ul className="nav navbar-nav navbar-right">
          <li><a href="/managers"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>
          <li><a href="#"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>
        </ul>
      </div>
    </div>
  </nav>;

export default Nav;
