import React, { Component } from "react"
import ReactGooglePlacesSuggest from "react-google-places-suggest"
import { longStackSupport } from "q"
import "../App.css";

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
      this.setState({ search: "", value: geocodedPrediction.formatted_address, lat: numlat, lng: numlng })

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
                  </ReactGooglePlacesSuggest>
               </div>
               <div className="col-sm-3"></div>
            </div>
         )
      )
   }
}