import React from "react"
import ReactGoogleMapLoader from "react-google-maps-loader"


export default class Googletest extends React.Component {
   render() {
      return (
         <div>
            const google = () =>
            <ReactGoogleMapLoader
               params={{
                  key: "AIzaSyAi5FmO4ICcm5wSgSML69KMj4ebRXObtwY", // Define your api key here
                  libraries: "places,geometry", // To request multiple libraries, separate them with a comma
               }}
               render={googleMaps =>
                  googleMaps && (
                     <div>Google Maps is loaded !</div>
                  )}
            />
         </div>
      )
   }
}