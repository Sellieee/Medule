import React, { Component } from "react"
import { Redirect } from "react-router-dom"
import axios from "axios"

const axiosInstance = axios.create({
   baseURL: "http://localhost:8080"
})

class LoginForm extends Component {
   constructor() {
      super();
      this.state = {
         username: "",
         password: "",
         redirectTo: null
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
   };

   handleChange(event) {
      event.preventDefault();
      this.setState({
         [event.target.name]: event.target.value
      });
   };

   handleSubmit(event) {
      event.preventDefault();
      console.log("handleSubmit");

      axiosInstance.post("/user/login", {
         username: this.state.username,
         password: this.state.password
      })
         .then(response => {
            console.log("Login response: " + response);

            if (response.status === 200) {
               this.props.updateUser(response.data.username);
               this.setState({
                  redirectTo: "/"
               });
            };
         })
         .catch(error => {
            // display error message
            console.log("Login error: " + error);
         });
   };

   render() {
      if (this.state.redirectTo) {
         return <Redirect to={{ pathname: this.state.redirectTo }} />
      } else {
         return (
            <div className="loginForm">
               {/* <h4>Login</h4> */}
               <form className="form-horizontal">
                  <div className="form-group">
                     <div className="col -1 col-ml-auto">
                        <label className="form-label" htmlFor="username">Username</label>
                     </div>
                     <div className="col-3 col-mr-auto">
                        <input className="form-input"
                           type="text"
                           id="username"
                           name="username"
                           placeholder="Username"
                           value={this.state.username}
                           onChange={this.handleChange}
                        />
                     </div>
                  </div>
                  <div className="form-group">
                     <div className="col-1 col-ml-auto">
                        <label className="form-label" htmlFor="password">Password</label>
                     </div>
                     <div className="col-3 col-mr-auto">
                        <input className="form-input"
                           type="password"
                           name="password"
                           placeholder="Password"
                           value={this.state.password}
                           onChange={this.handleChange}
                        />
                     </div>
                  </div>
                  <div className="form-group">
                     <div className="col-7"></div>
                     <button className="btn btn-primary col-1 col-mr-auto"
                        onClick={this.handleSubmit}
                        type="submit">Login</button>
                  </div>
               </form>
            </div>
         );
      };
   };
};

export default LoginForm;