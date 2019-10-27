import React, { Component } from "react"
import axios from "axios"

render(){
   return (
      <div className="signUpForm">
         <h4>Sign Up</h4>
         <form className="form-horizontal">
            <div className="form-group">
               <div className="col-1 col-ml-auto">
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

         </form>
      </div>
   )
}