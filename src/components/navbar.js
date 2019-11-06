import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Route, Link } from "react-router-dom";
import "../App.css";
import axios from "axios";

class Navbar extends Component {
   constructor() {
      super()
      this.logout = this.logout.bind(this)
   };

   logout(event) {
      event.preventDefault();
      console.log("Logging Out");
      axios.post("/user/logout").then(response => {
         console.log(response.data);
         if (response.status === 200) {
            this.props.updateUser({
               loggedIn: false,
               username: null
            });
         };
      })
         .catch(error => {
            console.log("Logout error: " + error);
         });
   };

   render() {
      const loggedIn = this.props.loggedIn;
      console.log("Navbar render, props: " + this.props);

      return (
         <div>
            <header className="navbar App-header" id="nav-container">
               <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
                  <Navbar.Link to="/">Medule</Navbar.Link>
                  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                  <Navbar.Collapse id="responsive-navbar-nav">
                     <Nav className="mr-auto">
                        <Nav.Link href="/login">Login</Nav.Link>
                        <Nav.Link href="/signup">Sign Up</Nav.Link>
                        <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                           <NavDropdown.Item href="#action/3.1">My Forms</NavDropdown.Item>
                           <NavDropdown.Item href="#action/3.2">Something</NavDropdown.Item>
                           <NavDropdown.Divider />
                           <NavDropdown.Item href="#action/3.3">My Doctors</NavDropdown.Item>
                        </NavDropdown>
                     </Nav>
                     <Nav>
                        <Nav.Link href="#" onClick={this.logout}>Logout</Nav.Link>
                     </Nav>
                  </Navbar.Collapse>
               </Navbar>
            </header>
         </div>
      )
   };
};

export default Navbar;