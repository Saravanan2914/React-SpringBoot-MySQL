import React, { Component } from "react";
import AddStudent from "./Components/AddStudent";
import { Route, BrowserRouter as Router } from "react-router-dom";
import StudentTable from "./Components/StudentTable";

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={AddStudent} />
        <Route exact path="/view" component={StudentTable} />
      </Router>
    );
  }
}

export default App;
