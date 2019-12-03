import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./views/Home/Home";
import Download from "./views/Download/Download";
import Register from "./views/Register/Register";
import Upload from "./views/FileUpload/Upload";
import NotFound from "./views/NotFound";
import Login from "./views/Login";
import fire from "./config/Fire";

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    });
  }

  //{this.state.user ? (<Upload/>) : (<Login/>)}
 
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/Home" component={Home} />
          <Route exact path="/Register" component={Register} />
          <Route exact path="/Upload" component={Upload} />
          <Route exact path="/Download" component={Download} />
          <Route exact path="/Login" component={Login} />
          <Route exact path="/">
            <Redirect to="/Login" />
          </Route>

          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
