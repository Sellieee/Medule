import React, { Component } from "react";
import { Route, Link, Redirect } from "react-router-dom";
import "../App.css";
// import Nav from 'react-bootstrap/Nav';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import axios from "axios";

class Navbar extends Component {
   constructor() {
      super()
      this.logout = this.logout.bind(this)
   }

   logout(event) {
      event.preventDefault()
      console.log('logging out')
      axios.post('/user/logout').then(response => {
         console.log(response.data)
         if (response.status === 200) {
            this.props.updateUser({
               loggedIn: false,
               username: null
            })
         }
      }).catch(error => {
         console.log('Logout error')
      })
   }

   render() {
      const loggedIn = this.props.loggedIn;
      console.log('navbar render, props: ')
      console.log(this.props);

      return (
         <div>

            <header className="navbar" id="nav-container">
               <div className="col-4" >
                  {loggedIn ? (
                     <section className="navbar-section">
                        <Link to="#" className="btn btn-link text-secondary" onClick={this.logout}>
                           <span className="text-secondary">logout</span></Link>

                     </section>
                  ) : (
                        <section className="navbar-section">
                           <Link to="/" className="btn btn-link text-secondary">
                              <span className="text-secondary">Medule</span>
                           </Link>
                           <Link to="/login" className="btn btn-link text-secondary">
                              <span className="text-secondary">Login</span>
                           </Link>
                           <Link to="/signup" className="btn btn-link">
                              <span className="text-secondary">Sign up</span>
                           </Link>
                        </section>
                     )}
               </div>

            </header>
         </div>

      );

   }
}

export default Navbar