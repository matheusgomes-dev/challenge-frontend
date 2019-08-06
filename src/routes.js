import React from "react";
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  withRouter
} from "react-router-dom";
import { isAuthenticated } from "./services/auth";

import NavbarChallenge from "./components/Navbar";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ToolsList from "./pages/Tools";
import Users from "./pages/Users";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const RoutesList = withRouter(({ location }) => {
  return (
    <div>
      {location.pathname !== "/login" &&
      location.pathname !== "/signup" &&
      location.pathname !== "/" ? (
        <NavbarChallenge />
      ) : (
        ""
      )}

      <Switch>
        <Route exact path="/" component={() => <Redirect to="/login" />} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <PrivateRoute path="/tools" component={ToolsList} />
        <PrivateRoute path="/users" component={Users} />
        <Route path="*" component={() => <h1>Página não encontrada!</h1>} />
      </Switch>
    </div>
  );
});

const Routes = () => (
  <BrowserRouter>
    <RoutesList />
  </BrowserRouter>
);

export default Routes;
