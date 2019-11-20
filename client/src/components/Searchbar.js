import React, { Component } from "react"
import ReactGooglePlacesSuggest from "react-google-places-suggest"
import { longStackSupport } from "q"
import "../App.css";
// import Map from "./Map"


export default class Searchbar extends Component {
   state = {
      search: "",
      value: "",
      // lat: 0,
      // lng: 0
   }

   handleInputChange = e => {
      this.setState({ search: e.target.value, value: e.target.value })
   }

   handleSelectSuggest = (geocodedPrediction, originalPrediction) => {
      console.log(geocodedPrediction, originalPrediction);
      var latitude = geocodedPrediction.geometry.location.lat
      var longitude = geocodedPrediction.geometry.location.lng
      var numlat = latitude()
      var numlng = longitude()
      // console.log(latitude(), longitude())
      this.setState({ search: this.state.search, value: geocodedPrediction.formatted_address, lat: numlat, lng: numlng })

      this.props.onSearch(numlat, numlng)
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

         (
            <div className="row">
               <div className="col-sm-3"></div>
               <div className="googlesearch col-sm-6">
                  <ReactGooglePlacesSuggest
                     displayPoweredByGoogle={false}
                     googleMaps={this.props.googleMaps}
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
                        className="searchbar"
                        type="text"
                        value={value}
                        placeholder="Search a location"
                        onChange={this.handleInputChange}
                     />
                     {/* <Map lat={this.state.lat} lng={this.state.lng} /> */}
                  </ReactGooglePlacesSuggest>
               </div>
               <div className="col-sm-3"></div>
            </div>
         )
      )
   }
}