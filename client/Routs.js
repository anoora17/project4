import React from "react";
import { Route, Switch } from "react-router-dom";
import AppliedRoute from "./components/Routenav";

import Nav from "./components/Nav"
import Signin from "./components/pages/Signin";


export default ({ childProps }) =>
  <Switch>
    <Appliednave path="/" exact component={Nav} props={childProps} />
    <AppliedRoute path="/login" exact component={Signin} props={childProps} />
  </Switch>;