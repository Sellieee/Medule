// Imports
import React, { Component } from "react";
import "../App.css";

class Success extends Component {
   // Define Constructor
   constructor(props) {
      super(props);

      // Declare State
      this.state = {
         loggedIn: false
      };
   }

   render() {
      return (
         <div>
            <div>
               <br />
               <p className="confirmation">Thanks for booking your own appointment! A confirmation text message will arrive shortly!</p>
               <br />
               <br />
               <p className="meduleSlogan">Medule - The trusted Medical Schedule.</p>
            </div>
         </div>

      )
   }
}

export default Success;