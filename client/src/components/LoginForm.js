import React, {
   Component
} from "react";
import {
   Redirect
} from "react-router-dom";
import axios from "axios";
import form from "react-bootstrap/Form"
import button from "react-bootstrap/Button"
import "../App.css";

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
               this.props.updateUser({
                  loggedIn: true,
                  username: response.data.username
               });
               this.setState({
                  redirectTo: "/signedin"
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
         return <Redirect to={
            {
               pathname: this.state.redirectTo
            }
         }
         />
      } else {
         return (

            <div className="auth" >
               <div class="row text-center">
                  <div class="col-sm-4"></div>
                  <div class="col-sm-4">
                     <form class="auth-form">
                        <label class="authlabel"> Username </label>
                        <input
                           type="text"
                           class="authinput"
                           id="username"
                           className="form-control"
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
                              type="password"
                              class="authinput"
                              name="password"
                              id="password"
                              className="form-control"
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
         );
      };
   };
};

export default LoginForm;