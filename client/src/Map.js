
import React, { Component } from "react";
import { GoogleMapReact, Marker } from "google-map-react";
import Markers from "./places.json";

const AnyReactComponent = ({ text }) => (
    <div style={{
        color: "white",
        background: "grey",
        padding: "15px 10px",
        display: "inline-flex",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "100%",
        transform: "translate(-50%, -50%)"
    }}>
        {text}
    </div>
);

export default class SimpleMapPage extends Component {
    static defaultProps = {
        center: { lat: -37.88, lng: 145.018 },
        zoom: 14
    };

    state = {
        markers: Markers
    }

    render() {
        return (
            <div style={{ width: "100%", height: "400px" }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: this.props.apiKey }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                >
                    {this.state.markers.map((Markers, i) => {
                        let lat = parseFloat(this.state.markers.latitude, 10);
                        let lng = parseFloat(this.state.markers.longitude, 10);

                        return (
                            <Marker
                                id={this.state.markers.id}
                                key={this.state.markers.id}
                                position={{ lat: lat, lng: lng }}
                                title="Click to zoom"
                                onClick={this.state.onToggleOpen.bind(this, i)}
                            >
                                {this.state.infoWindows[i].isOpen && (
                                    <InfoWindow onCloseClick={this.state.onToggleOpen.bind(i)}>
                                        <div>{this.state.markers.name}</div>
                                    </InfoWindow>
                                )}
                            </Marker>
                    })}
                    <AnyReactComponent
                        lat={-37.8840171}
                        lng={145.0178017}
                        text={"Caulfield"}
                    />
                </GoogleMapReact>
            </div>
        );
    }
}

