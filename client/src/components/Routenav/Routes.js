import React from "react";
import { Route, Switch } from "react-router-dom";
import AppliedRoute from "./components/Routenav";

import Nav from "./components/Nav"



export default ({ childProps }) =>
  <Switch>
    
    <AppliedRoute path="/login" exact component={Signin} props={childProps} />
  </Switch>;