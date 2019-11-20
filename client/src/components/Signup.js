import React, { Component } from "react";
import axios from "axios";
import form from "react-bootstrap/Form"
import button from "react-bootstrap/Button"
import "../App.css";

const axiosInstance = axios.create({
   baseURL: "http://localhost:8080"
})

class Signup extends Component {
   constructor() {
      super();
      this.state = {
         username: "",
         password: "",
         confirmPassword: ""
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
   };

   handleChange(event) {
      console.log("------")
      this.setState({
         [event.target.name]: event.target.value
      });
   };

   handleSubmit(event) {
      console.log("------")

      event.preventDefault();
      console.log("Sign-up-form, username: " + this.state.username);

      // Axios post
      axiosInstance.post("/user/signup", {
         username: this.state.username,
         password: this.state.password
      })
         .then(response => {
            console.log(response);
            if (!response.data.errormessage) {
               console.log("Signup successful!");
               this.setState({

                  // Redirect to login page on successful sign-up
                  redirectTo: "/user/login"
               });
            } else {
               console.log("Username already taken.");
            };
         })
         .catch(error => {
            console.log("Error signing up " + error);
         });
   };

   render() {
      return (
         <div className="auth">
            {/* THIS IS THE ORIGINAL CODE */}
            {/* <form className="form-horizontal">
               <div className="form-group">
                  <div className="col-1 col-ml-auto">
                     <label className="form-label" htmlFor="username">Username: </label>
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
                     <label className="form-label" htmlFor="password">Password: </label>
                  </div>
                  <div className="col-3 col-ml-auto">
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
                  <button
                     className="btn btn-primary col-1 col-mr-auto"
                     onClick={this.handleSubmit}
                     type="submit"
                  >Sign Up</button>
               </div>
            </form> */}

            <form className="form-auth">
               <div className="form-group col-3 col-mr-auto">
                  <label>Username</label>
                  <input type="text" className="form-control" id="username"
                     name="username"
                     placeholder="Username"
                     value={this.state.username}
                     onChange={this.handleChange} />
               </div>

               <div className="form-group col-3 col-mr-auto">
                  <label htmlFor="password">Password</label>
                  <input type="password" className="form-control" name="password" placeholder="Password"
                     value={this.state.password}
                     onChange={this.handleChange} />
               </div>
               <button type="submit" className="btn btn-primary btn-block col-1 col-mr-auto" onClick={this.handleSubmit}>Submit</button>

               {this.state.showError ? <div class="alert alert-danger" >
                  <strong>Invalid username or password</strong>
               </div> : null}
            </form>
         </div>
      )
   };
};

export default Signup;