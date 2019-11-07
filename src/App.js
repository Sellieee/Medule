import React, { Component } from "react";
import axios from "axios";
import { Route } from "react-router-dom";
import Signup from "./components/Signup";
import LoginForm from "./components/login";
import Navbar from "./components/navbar";
import Home from "./components/home";
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      username: null
    };

    this.getUser = this.getUser.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateUser = this.updateUser.bind(this);
  };

  componentDidMount() {
    this.getUser();
  };

  updateUser(userObject) {
    this.setState(userObject);
  };

  getUser() {
    axios.get("/user/").then(response => {
      console.log("Get user response: " + response.data);
      if (response.data.user) {
        console.log("Get user: There is a user saved in the server session: " + response.data.user);
        this.setState({
          loggedIn: true,
          username: response.data.user.username
        });
      }
      else {
        console.log("Get user: no user found");
        this.setState({
          loggedIn: false,
          username: null
        });
      };
    });
  };

  render() {
    return (
      <div className="App">
        <Navbar updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
        {this.state.loggedIn && <p>Welcome to Medule, {this.state.username}!</p>}

        {/* Home page */}
        <Route exact path="/"
          component={Home} />

        {/* Login page */}
        <Route path="/login"
          render={() =>
            <LoginForm updateUser={this.updateUser} />}
        />

        {/* Signup page */}
        <Route path="/signup"
          render={() =>
            <Signup />}
        />

      </div>
    );
  }
};

export default App;