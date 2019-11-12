import React, { Component } from "react";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";

const getCleanSearch = search => search.replace(" ", "");
const getMapsUrl = search => `https://maps.googleapis.com/maps/api/staticmap?center=${getCleanSearch(search)}&zoom=15&size=500x500&key=${process.env.MAP_API}`

class Map extends Component {
   constructor(props) {
      super(props);
      this.state = {
         search: ""
      };
   };

   render() {
      return (
         <div>
            <input
               name="search"
               placeholder="Search for a Location here!"
               className="searchbox"
               onChange={event => this.setState({ search: event.target.value })}
               value={this.state.search}
            />
            <img alt="Map of searched Location">getMapsUrl()</img>
         </div>
      )
   }
};

export default Map;