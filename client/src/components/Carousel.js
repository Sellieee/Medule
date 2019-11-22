import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import calendar from "../calendar.png";
import loginpage from "../loginpage.png";
import doctor from "../doctor.png";
import caulfield from "../caulfield.png";
import map from "../map.png";

class MCarousel extends Component {

   render() {
      return (
         <Carousel>
            <div>
               <img alt="loginpage" src={loginpage} />
            </div>
            <div>
               <img alt="map" src={map} />
            </div>
            <div>
               <img alt="caulfield" src={caulfield} />
            </div>
            <div>
               <img alt="doctor" src={doctor} />
            </div>
            <div>
               <img alt="calendar" src={calendar} />
            </div>
         </Carousel>
      );
   };
}

export default MCarousel;