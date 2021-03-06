import React, { Component } from "react";
//import { Link } from "react-router-dom";
import {  FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./signin.css";
import config from "../../config";
import {
 CognitoUserPool,
 AuthenticationDetails,
 CognitoUser
} from "amazon-cognito-identity-js";

import LoaderButton from "../../components/LoaderButton";
import managerAPI from "../../utils/managerAPI";




export default class Signin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      manager:[]
      
    };
  }



    login(email, password) {
    const userPool = new CognitoUserPool({
      UserPoolId: config.cognito.USER_POOL_ID,
      ClientId: config.cognito.APP_CLIENT_ID
    });
    const user = new CognitoUser({ Username: email, Pool: userPool });
    const authenticationData = { Username: email, Password: password };
    const authenticationDetails = new AuthenticationDetails(authenticationData);
      console.log(user) 
      console.log(user.username)

    return new Promise((resolve, reject) =>

      user.authenticateUser(authenticationDetails, {
        onSuccess: result => {
              managerAPI.getManagerbyEmail(authenticationData.Username)
             .then( res =>{
              resolve({
               user,
              result,
              manager:res.data
              })
      
           }).catch(err => console.log(err)); 

          },
        onFailure: err => reject(err)
      })    
   

    );
  }

  // findManager = (email) => {
  //   managerAPI.getManagerbyEmail(email)
  //   .then( res => this.setState({manager:res.data}

  //     )
  //   .catch(err => console.log(err));
  //       // console.log(JSON.stringfy(manager)))
  // };

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();
       this.setState({ isLoading: true });

    
         this.login(this.state.email, this.state.password).then( result => {
            console.log("LOGIN LOGIN")
             console.log(JSON.stringify(result))                  
                    
           // window.location.replace("/managers")
           console.log("email:" +JSON.stringify(this.state) )
           this.props.history.push("/managers/" + result.manager._id);
          this.props.HandelClick(true);
          this.setState({ isLoading: false });
          
         }).catch (e => {
          alert(e);
          this.setState({ isLoading: false });
      })
  }

  render() {
    return (
      <div className="signin">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <LoaderButton
             block
             bsSize="large"
             disabled={ !this.validateForm() }
             type="submit"
             isLoading={this.state.isLoading}
             text="Login"
             loadingText="Logging in…"
            />
        </form>
      </div>
    );
  }
}

//https://vladimirponomarev.com/blog/authentication-in-react-apps-jwt
//https://reactjs.org/docs/higher-order-components.html 