import React, { Component } from "react";
import { GoogleMap, Marker, InfoWindow, withGoogleMap, withScriptjs } from "react-google-maps";
import item from "../places.json";

class SimpleMapPage extends Component {
    // defaultProps = {
    //     center: { lat: this.props.lat, lng: this.props.lng },
    //     zoom: 14,
    // };

    // state = {
    //     item: item,
    // }


    render() {
        console.log(this.props.lat, this.props)

        return (
            <div style={{ width: "100%", height: "400px" }}>
                Map loaded on search
                <GoogleMap
                    bootstrapURLKeys={{ key: this.props.apiKey }}
                    defaultCenter={{ lat: this.props.lat, lng: this.props.lng }}
                    defaultZoom={14}
                >
                    <Marker position={{ lat: this.props.lat, lng: this.props.lng }} />
                    {/* {this.state.item.map((item, i) => {
                        let lat = parseFloat(this.props.lat, 10);
                        let lng = parseFloat(this.props.lng, 10);
                        return (
                            <Marker
                                id={item.id}
                                key={item.id}
                                position={{ lat: lat, lng: lng }}
                                title={item.name}
                                onClick={() => this.props.openModal(item)}
                            >
                                {this.state.position &&
                                    <InfoWindow position={this.state.position}>
                                        <h1>{item.name}</h1>
                                    </InfoWindow>
                                        </Marker>
                        )
                    })} */}
                </GoogleMap>
            </div>
        );
    };
};

export default withGoogleMap(SimpleMapPage)
