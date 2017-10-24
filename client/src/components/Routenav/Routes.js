import React from "react";
import { Route, Switch } from "react-router-dom";
import Appliednav from "./components/Routenav";

import Nav from "./components/Nav"
import Manager from "./pages/Manager";
import Resume from "./pages/Resume";



export default ({ childProps }) =>
  <Switch>
    
    <Appliednav path="/login" exact component={Signin} props={childProps} />
    <Appliednav path="/managers" exact component={Manager} props={childProps} />
      <Appliednav path="/resume" exact component={Resume} props={childProps} />
  </Switch>;