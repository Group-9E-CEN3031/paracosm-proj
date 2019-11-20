import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./views/Home/Home";
import NotFound from "./views/NotFound";
import Header from "./components/Header/Header";
import Upload from "./views/upload.ejs"
/*
<Route exact path="/">
          <Redirect to="/Home" />
        </Route>


        <Route component={NotFound}/>
*/

const App = () => {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/Home" component={Home} />

        <Route exact path="/upload" component={Upload} />
      </Switch>
    </div>
  );
};

export default App;
