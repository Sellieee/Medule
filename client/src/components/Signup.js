import React, { Component } from "react";
import { Link } from 'react-router-dom';
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
               console.log("Signup successful!")
               return (
                  <Link to="/login" />
               )
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
         <div className="auth" >
            <div class="row text-center">
               <div class="col-sm-4"></div>
               <div class="col-sm-4">
                  <form>
                     <label class="authlabel"> Username </label>
                     <input
                        type="text"
                        class="authinput"
                        className="form-control"
                        id="username"
                        name="username"
                        placeholder="Username"
                        value={this.state.username}
                        onChange={this.handleChange}
                     />
                     <br />
                     <br />
                     <br />

                     <div className="form-group" >
                        <label class="authlabel" htmlFor="password"> Password </label>
                        <input
                           class="authinput"
                           className="form-control"
                           type="password"
                           id="password"
                           name="password"
                           placeholder="Password"
                           value={this.state.password}
                           onChange={this.handleChange}
                        />
                     </div>
                     <br />
                     <button
                        class="authbtn"
                        type="submit"
                        // className="btn btn-primary btn-block"
                        onClick={this.handleSubmit}
                     > Submit
                  </button>

                     {this.state.showError ?
                        <div class="alert alert-danger" >
                           <strong > Invalid username or password </strong>
                        </div> : null}
                  </form>
               </div>
               <div class="col-sm-4"></div>

            </div >
         </div >
      )
   };
};

export default Signup;