import React, { Component } from "react"
import { Redirect } from "react-router-dom"
import axios from "axios"

class LoginForm extends Component {
   constructor() {
      super();
      this.state = {
         username: "",
         password: "",
         RedirectTo: null
      }
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
   };

   handleChange(event) {
      event.preventDefault();
      this.setState({
         [event.target.name]: event.target.value
      });
   }
}