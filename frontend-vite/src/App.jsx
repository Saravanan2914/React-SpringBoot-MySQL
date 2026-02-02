import React, { Component } from "react";
import AddStudent from "./Components/AddStudent";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import StudentTable from "./Components/StudentTable";
import PrivateRoute from "./Components/PrivateRoute";
import LandingPage from "./Components/LandingPage";
import AdminLogin from "./Components/AdminLogin";
import UserLogin from "./Components/UserLogin";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/admin-login" component={AdminLogin} />
          <Route exact path="/user-login" component={UserLogin} />
          <PrivateRoute exact path="/admin" component={AddStudent} roles={['ROLE_ADMIN']} />
          <PrivateRoute exact path="/user" component={StudentTable} roles={['ROLE_USER', 'ROLE_ADMIN']} />
          <PrivateRoute exact path="/view" component={StudentTable} roles={['ROLE_USER', 'ROLE_ADMIN']} />
        </Switch>
      </Router>
    );
  }
}

export default App;

