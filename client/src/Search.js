// Imports
import React, { Component } from "react";
import Map from "./Map"

// Import React Scrit Libraray to load Google object
import Script from "react-load-script";

class Search extends Component {
  // Define Constructor
  constructor(props) {
    super(props);

    // Declare State
    this.state = {
      city: "",
      query: ""
    };

  }

  handleScriptLoad = () => {
    // Declare Options For Autocomplete
    const options = {
      types: ["geocode"],
    };

    // Initialize Google Autocomplete
    /*global google*/ // To disable any eslint 'google not defined' errors
    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById("autocomplete"),
      options,
    );

    // Avoid paying for data that you don't need by restricting the set of
    // place fields that are returned to just the address components and formatted
    // address.
    this.autocomplete.setFields(["address_components", "formatted_address"]);

    // Fire Event when a suggested name is selected
    // this.autocomplete.addListener('place_changed', this.handlePlaceSelect);
  }

  handlePlaceSelect = () => {

    // Extract City From Address Object
    const addressObject = this.autocomplete.getPlace();
    const address = addressObject.address_components;
    console.log("handlePlaceSelect", address)
    // Check if address is valid
    if (address) {
      // Set State
      this.setState(
        {
          city: address[0].long_name,
          query: addressObject.formatted_address,
        }
      );
    }
  }


  handleChange = event => {
    let target = event.target;
    console.log("value", target.value)
    this.setState(
      {
        query: target.value,
      }
    );
  }

  render() {
    return (
      <div>
        <Script
          url={`http://maps.googleapis.com/maps/api/js?libraries=places&key=${this.props.apiKey}&callback=initMap`}
          onLoad={this.handleScriptLoad}
        />
        <input id="autocomplete" type="text" size="50" placeholder="Search for a Location Here!"
          onChange={this.handleChange}
          value={this.state.query}
          name="        "
          style={{
            margin: "0 auto",
            maxWidth: 800,
          }}
        />
      </div>
    );
  }
}

export default Search;