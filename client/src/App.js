import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Resume from "./pages/Resume";
import Home from "./pages/Home";
import Candidates from "./pages/Candidate";
import Manager from "./pages/Manager";
import AllCand from "./pages/AllCand";
import Detail from "./pages/Detail";
import MgrDetail from "./pages/MgrDetail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";





const App = () =>
  <Router>
    <div>
      <Nav  /> 
      <Switch>

       <Route exact path="/login" component={Signin} />
        <Route exact path="/signup" component = {Signup} />        
       <Route exact path="/" component={Home} />
        <Route exact path="/resume" component={Resume} />
        <Route exact path="/managers" component={Manager} />
        <Route exact path="/managers/:id" component={MgrDetail} />
        <Route exact path="/jobreq/openreqs/:mgrid" component={MgrDetail} />          
        <Route exact path="/candidates" component={Candidates} />
        <Route exact path="/candidates/:id" component={Detail} />
        <Route exact path="/allcand" component={AllCand} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>;

export default App;
