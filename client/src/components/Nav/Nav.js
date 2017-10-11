import React from "react";
import { Component } from "react";
import {  withRouter, Route} from "react-router-dom";
import "./nav.css";
import { authUser, signOutUser } from "../../libs/awsLib.js";
import Routenav from "../Routenav"


/* This section Added By Noor*/
class Nav extends Component { 
  // Added this constructor to update the status of the props
constructor(props) {
    super(props);
// to load user session to the state
    this.state = {
      isAuthenticated: false,
        isAuthenticating: true
    };
    this.userHasAuthenticated = this.userHasAuthenticated.bind(this)
  }

   componentDidMount() {
    try {
       if ( authUser()) {
        this.userHasAuthenticated(true);
       }
    }
        catch(e) {
          alert(e);
    }

    this.setState({ isAuthenticating: false });
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  handleLogout = event => {
    signOutUser()
    this.userHasAuthenticated(false);
     

  }

  render() {
    //pass the session state to the routes
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
        };


  return (
        !this.state.isAuthenticating &&
        <nav className="navbar navbar-default navbar-top">  
        <div className="container-fluid">   
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
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

          <a href="/allcand" className="navbar-brand">
          Search Resumes
          </a>
          </div>

    
        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav">
            <li className="active"><a href="#">All <span className="sr-only">(current)</span></a></li>
            <li><a href="#">Saved Items</a></li>            
          </ul>
      
          <ul className="nav navbar-nav navbar-right">        
            <li className="dropdown">

              {this.state.isAuthenticated
                ? <a onClick={this.handleLogout} role="button" aria-haspopup="true" aria-expanded="false">Signout <span className="caret"></span></a>
              :[<a key={0} data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Login <span className="caret"></span></a>,
              <ul key={1} className="dropdown-menu">                  
                    <Routenav key={2} className ="Login" href="/login">Signin</Routenav>                          
                   <Routenav key={3} className ="Login" href="/signup">Signup</Routenav>
                   
             </ul>
             ]}

          </li>
         </ul>
       </div>

    </div>
           <section className="picture"></section>

   
     <Route childProps={childProps} />
   
    
   
  </nav>
    );
   }

}
export default withRouter(Nav);
