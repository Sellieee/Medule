import React, { Component } from "react";
// import SearchBar from "material-ui-search-bar";
import Script from "react-load-script";

class Map extends Component {
   constructor(props) {
      super(props);
      this.state = {
         city: "",
         query: "",
      };
   }

   handleScriptLoad() {
      var options = { types: ["(cities)"] };

      /*global google*/
      this.autocomplete = new google.maps.places.Autocomplete(
         document.getElementById("autocomplete"),
         options);

      this.autocomplete.setFields(["address_components",
         "formatted_address"]);

      this.autocomplete.addListener("place_changed",
         this.handlePlaceSelect);
   };

   handlePlaceSelect = () => {
      const addressObject = this.autocomplete.getPlace();
      const address = addressObject.address_components;

      if (address) {
         this.setState({
            city: address[0].long_name,
            query: addressObject.formatted_address,
         });
      };
   };

   render() {
      return (
         <div>
            <Script url="https://maps.googleapis.com/maps/api/js?key=AIzaSyAi5FmO4ICcm5wSgSML69KMj4ebRXObtwY&libraries=places"
               onLoad={this.handleScriptLoad}
            />
            <input id="autocomplete" placeholder="Search for a Location Here" value={this.state.query}
               style={{
                  margin: "0 auto",
                  maxWidth: 800,
               }}
            />
         </div>
      );
   };
};

export default Map;