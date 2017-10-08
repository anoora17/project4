import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Books from "./pages/Books";
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
        <Route exact path="/signup" component={Signup} />        
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/" component={Books} />
        <Route exact path="/books" component={Books} />
        <Route exact path="/books/:id" component={Detail} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>;

export default App;
