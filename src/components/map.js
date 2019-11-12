import React, { Component } from "react";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import axios from "axios";

// const getCleanSearch = search => search.replace(" ", "");
// const getMapsUrl = search => `https://maps.googleapis.com/maps/api/place/textsearch/json?query=general+practitioners+in+${getCleanSearch(search)}&key=AIzaSyAi5FmO4ICcm5wSgSML69KMj4ebRXObtwY`
const search = "";

class Map extends Component {
   constructor(props) {
      super(props);

      // axios.get("http://maps.googleapis.com/maps/api/place/textsearch/json?query=general+practitioners+in+" + search + "&key=AIzaSyAi5FmO4ICcm5wSgSML69KMj4ebRXObtwY")
      //    .then(response => {
      this.state = {
         search: ""
      };
      //       console.log(response);
      //    });
   };

   componentDidMount() {
      axios.get('https://maps.googleapis.com/maps/api/place/details/json?placeid=' +
         search + '&key=AIzaSyAi5FmO4ICcm5wSgSML69KMj4ebRXObtwY')
         .then(response => {
            console.log(response)
         })
         .catch(err => {
            console.log(err)                     //Axios entire error message
            console.log(err.response) //Google API error message 
         })
   }
   render() {
      return (
         <div>
            {/* <input
               name="search"
               placeholder="Search for a Location here!"
               className="searchbox"
               onChange={event => this.setState({ search: event.target.value })}
               value={this.state.search}
            />
            <div>
               <img alt="Map of searched Location" src='https://maps.google.com/maps/contrib/113202928073475129698/photos\"\u003eEmily Zimny\u003c/a\u003e&key=AIzaSyAi5FmO4ICcm5wSgSML69KMj4ebRXObtwY' />
            </div> */}
         </div>
      )
   }
};

export default Map;