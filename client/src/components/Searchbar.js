import React, { Component } from "react"
import ReactGoogleMapLoader from "react-google-maps-loader"
import ReactGooglePlacesSuggest from "react-google-places-suggest"
import { longStackSupport } from "q"
import Map from "./Map"

const MY_API_KEY = "AIzaSyAi5FmO4ICcm5wSgSML69KMj4ebRXObtwY" // fake

export default class Searchbar extends React.Component {
   state = {
      search: "",
      value: "",
      lat: 0,
      lng: 0
   }

   handleInputChange = e => {
      this.setState({ search: e.target.value, value: e.target.value })
   }

   handleSelectSuggest = (geocodedPrediction, originalPrediction) => {
      var latitude = geocodedPrediction.geometry.location.lat
      var longitude = geocodedPrediction.geometry.location.lng
      var numlat = latitude()
      var numlng = longitude()
      console.log(latitude(), longitude()) // eslint-disable-line
      this.setState({ search: this.state.search, value: geocodedPrediction.formatted_address, lat: numlat, lng: numlng })

      console.log(this.state.lat, this.state.lng, "This works!")
   }

   handleNoResult = () => {
      console.log('No results for ', this.state.search)
   }

   handleStatusUpdate = (status) => {
      console.log(status)
   }

   render() {
      const { search, value } = this.state
      return (
         <ReactGoogleMapLoader
            params={{
               key: MY_API_KEY,
               libraries: "places,geocode",
            }}
            render={googleMaps =>
               googleMaps && (
                  <ReactGooglePlacesSuggest
                     googleMaps={googleMaps}
                     autocompletionRequest={{
                        input: search,
                        // Optional options
                        // https://developers.google.com/maps/documentation/javascript/reference?hl=fr#AutocompletionRequest
                     }}
                     // Optional props
                     onNoResult={this.handleNoResult}
                     onSelectSuggest={this.handleSelectSuggest}
                     onStatusUpdate={this.handleStatusUpdate}
                     textNoResults="My custom no results text" // null or "" if you want to disable the no results item
                     customRender={prediction => (
                        <div className="customWrapper">
                           {prediction
                              ? prediction.description
                              : "My custom no results text"}
                        </div>
                     )}
                  >
                     <input
                        type="text"
                        value={value}
                        placeholder="Search a location"
                        onChange={this.handleInputChange}
                     />
                     <Map lat={this.state.lat} lng={this.state.lng} />
                  </ReactGooglePlacesSuggest>
               )
            }
         />
      )
   }
}