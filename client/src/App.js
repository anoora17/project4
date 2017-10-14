import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Books from "./pages/Books";
import Home from "./pages/Home";
import Candidates from "./pages/Candidate";
import Manager from "./pages/Manager";
import AllCand from "./pages/AllCand";
import Detail from "./pages/Detail";
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
        <Route exact path="/managers" component={Manager} />        
        <Route exact path="/candidates" component={Candidates} />
        <Route exact path="/candidates/:id" component={Detail} />
        <Route exact path="/allcand" component={AllCand} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>;

export default App;
