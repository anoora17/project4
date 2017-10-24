import React from "react";
import { Component } from "react";
import { withRouter, Route, Link} from "react-router-dom";
import Routes from "../Routenav";
import "./nav.css";
import { authUser, signOutUser } from "../../libs/awsLib.js";

import { NavItem } from "react-bootstrap";


/* This section Added By Noor*/
class Nav extends Component { 


    async componentDidMount() {
      console.log("componenst did Mounted")
    try {
      if (await authUser()) {

        this.props.HandelClick(true);
      }
    }
    catch(e) {
      alert(e);
    }
    console.log(" Auth Something else")
    this.setState({ isAuthenticating: false,  isAuthenticated: true });
  }

  

  handleLogout = event => {
    signOutUser()
    
    this.props.HandelClick(false);
    this.props.history.push("/login");
    
   

  }

  render() {
    


  return (
        !this.props.isAuthenticating &&
        <nav className="navbar navbar-default navbar-top">  
        <div className="container-fluid">   
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link to="/" className="navbar-brand ">
            ACME Inc. </Link>            
          
          </div>

    
        <div className="collapse navbar-collapse" >
          <ul className="nav navbar-nav">
          { this.props.isAuthenticated
             ?[ <li className="active" className="nbar"><Link to="/managers"> Managers <span className="sr-only">(current)</span></Link></li>,
              <li><Link to="/candidates" className="nbar">Candidates</Link></li> ,                         
              <li><Link to="/managers/:id" className="nbar">My Positions</Link></li>,
              <li><Link to="/resume" className="nbar">Upload Resumes</Link></li>]
                           
              :<li><Link to="/allcand"className="nbar">Search Resumes</Link></li> 
             }        
            </ul>
             
          <ul className="nav navbar-nav navbar-right">        
            <li className="dropdown">

              {this.props.isAuthenticated 
                ? <NavItem onClick={this.handleLogout } className ="Login">Sign Out</NavItem>
              :[<a key={0} data-toggle="dropdown" >Login <span className="caret"></span></a>,
              <ul key={1} className="dropdown-menu">                  
                    <NavItem><Link key={2} className ="Login" to="/login">Signin</Link></NavItem>                          
                    <NavItem><Link key={3} className ="Login" to="/signup">Signup</Link></NavItem>
                    
             </ul>
             ]}
          </li>
         </ul>
       </div>

      </div>
     <section className="picture"></section>   
     
  </nav>
    );
   }

}
export default withRouter(Nav);