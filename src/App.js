import "./App.css";
import { Container, Row } from "react-bootstrap";

import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import ProtectedRoute from "./components/protectedRoutes";
import Home from "./components/home";
import Login from "./components/login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App(props) {
  const { isAuthenticated, isVerifying } = props;
  return (
    <div className="App">
      <Container style={{ padding: 0, width: 1000 }} fluid>
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            component={Home}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
          />
          <Route path="/login" component={Login} />
        </Switch>
      </Container>
      <ToastContainer />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isVerifying: state.auth.isVerifying,
  };
}
export default connect(mapStateToProps)(App);
