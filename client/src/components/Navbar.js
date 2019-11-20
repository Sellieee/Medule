import React, { Component } from "react";
import { Route, Link, Redirect } from "react-router-dom";
import "../App.css";
// import Nav from 'react-bootstrap/Nav';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import axios from "axios";
import Brand from "./Brand";


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
         <div className="brand">
            <Brand />
            <header className="navbar" id="nav-container">
               <div className="col-4" >
                  {loggedIn ? (
                     <section className="navbar-section">
                        <Link to="#" className="btn btn-link text-secondary" onClick={this.logout}>
                           <span class="menu">logout</span></Link>

                     </section>
                  ) : (
                        <section className="navbar-section">
                           {/* <Link to="/" className="btn btn-link text-secondary name">
                              <span className="text-secondary">Medule</span>
                           </Link> */}

                           <Link to="/login" className="btn btn-link text-secondary">
                              <span class="menu">Login</span>
                           </Link>
                           <Link to="/signup" className="btn btn-link text-secondary">
                              <span class="menu">Sign up</span>
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