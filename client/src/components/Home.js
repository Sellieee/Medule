// Imports
import React, { Component } from "react";
import MCarousel from "./Carousel";
import "../App.css";

class Home extends Component {
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
               <MCarousel />
               {/* <p className="aboutMeduleText">Needing to reschedule your appointment but tired of needing to find time to make a call or
                                 simply just hate listening to the on-hold music? Now you can skip the wait lines (and the boring music), simply log onto Medule
                                 and book or reschedule it yourself! Alternatively, you can find the practitioner nearest to you for added convenience.
                </p> */}
               < br />
               <br />
               <p className="meduleSlogan">Medule - The trusted Medical Schedule.</p>
            </div>
         </div>

      )
   }
}

export default Home;