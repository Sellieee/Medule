
import React, { Component } from 'react';
// import SearchBar from 'material-ui-search-bar';
import GoogleMapReact from 'google-map-react';
const dotenv = require('dotenv');
const env = dotenv.config().parsed;

const AnyReactComponent = ({ text }) => (
   <div style={{
      color: 'white',
      background: 'grey',
      padding: '15px 10px',
      display: 'inline-flex',
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '100%',
      transform: 'translate(-50%, -50%)'
   }}>
      {text}
   </div>
);

export default class Map extends Component {

   static defaultProps = {
      center: { lat: 59.95, lng: 30.33 },
      zoom: 11
   };

   // state = {
   //    city: '',
   //    query: ''
   // };

   render() {
      return (
         <div style={{ width: '100%', height: '400px' }}>
            {/* <SearchBar id="autocomplete" placeholder="" hintText="Search City" value={this.state.query}
               style={{
                  margin: '0 auto',
                  maxWidth: 800,
               }}
            /> */}
            <GoogleMapReact
               bootstrapURLKeys={{ key: this.props.AIzaSyAi5FmO4ICcm5wSgSML69KMj4ebRXObtwY }}
               defaultCenter={this.props.center}
               defaultZoom={this.props.zoom}
            >
               <AnyReactComponent
                  lat={59.955413}
                  lng={30.337844}
                  text={'Kreyser Avrora'}
               />
            </GoogleMapReact>
         </div>
      );
   }
}

