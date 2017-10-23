import React from "react";
import { Component, Route } from "react";
import { withRouter} from "react-router-dom";
import Routes from "../Routenav";
import "./nav.css";
import { authUser, signOutUser } from "../../libs/awsLib.js";
import Routenav from "../Routenav";
import { NavItem } from "react-bootstrap";


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

  async componentDidMount() {
      try {
       if ( await authUser()) {
        // this.userHasAuthenticated(true);
       }
    }        catch(e) {
          alert(e);
    }

    this.setState({ isAuthenticating: false });
  }



  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  handleLogout = event => {
    signOutUser()
    // window.location.replace("/login")
    this.userHasAuthenticated(false);
    this.props.history.push("/login");
    
   

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
            <a href="/" className="navbar-brand ">
            ACME Inc. </a>            
          
          </div>

    
        <div className="collapse navbar-collapse" >
          <ul className="nav navbar-nav">
             <li className="active" className="nbar"><a href="/managers"> Managers <span className="sr-only">(current)</span></a></li>
            <li><a href="/candidates" className="nbar">Candidates</a></li>
            <li><a href="/allcand"className="nbar">Search Resumes</a></li>            
            <li><a href="/managers/59ea0ce5a8d8643b8821938f" className="nbar">My Positions</a></li>
            <li><a href="/resume" className="nbar">Upload Resumes</a></li>        
          </ul>
      
          <ul className="nav navbar-nav navbar-right">        
            <li className="dropdown">

              {this.state.isAuthenticated
                ? <NavItem onClick={this.handleLogout } className ="Login">Sign Out</NavItem>
              :[<a key={0} data-toggle="dropdown" >Login <span className="caret"></span></a>,
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
     <Routes childProps={childProps} />   
   
  </nav>
    );
   }

}
export default withRouter(Nav);