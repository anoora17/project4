import React from "react";
import "./nav.css";
/* This section Added By Noor*/
const Nav = () =>
  <nav className="navbar navbar-default navbar-top">
  
  <div className="container-fluid">
   
    <div className="navbar-header">
      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span className="sr-only">Toggle navigation</span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
      </button>
      <a className="navbar-brand" href="#" ><strong>Resume App</strong></a>
    </div>

    
    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul className="nav navbar-nav">
        <li className="active"><a href="#">All <span className="sr-only">(current)</span></a></li>
        <li><a href="#">Saved Items</a></li>
        
      </ul>
      
      <ul className="nav navbar-nav navbar-right">        
        <li className="dropdown">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Login <span className="caret"></span></a>
          <ul className="dropdown-menu">
            <li><a className ="Login"href="/signup">Signup</a></li>           
            <li><a className = "Login"href="/login">Signin</a></li>
            
          </ul>
        </li>
      </ul>
    </div>
  </div>

  </nav>;

export default Nav;
