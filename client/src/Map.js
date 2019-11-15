
import React, { Component } from "react";
import { GoogleMap, Marker, InfoWindow, withGoogleMap, withScriptjs } from "react-google-maps";
import item from "./places.json";
//const fs = require("fs")

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

class SimpleMapPage extends Component {
    defaultProps = {
        center: { lat: -37.88, lng: 145.018 },
        zoom: 14,
        infoWindows: this.props.item.map(p => {
            return { isOpen: false };
        })
    };
};

{
    onToggleOpen: ({ infoWindows }) => selectedIndex => ({
        infoWindows: infoWindows.map((iw, i) => {
            iw.isOpen = selectedIndex === i;
            return iw;
        })
    })
};

state = {
    item: item
};


render() {
    return (
        <div style={{ width: "100%", height: "400px" }}>
            <GoogleMap
                bootstrapURLKeys={{ key: this.props.apiKey }}
                defaultCenter={{ lat: -37.88, lng: 145.018 }}
                defaultZoom={14}
            >
                {this.state.markers.map((item, i) => {
                    let lat = parseFloat(item.latitude, 10);
                    let lng = parseFloat(item.longitude, 10);
                    // eslint-disable-next-line no-unreachable
                    return (
                        <Marker
                            id={item.id}
                            key={item.id}
                            position={{ lat: lat, lng: lng }}
                            title="Click to View"
                            onClick={props.onToggleOpen.bind(this, i)}
                        >
                            <InfoWindow onCloseClick={props.onToggleOpen.bind(i)}>
                                <div>{item.name}</div>
                            </InfoWindow>
                        </Marker>
                    )
                })}
            </GoogleMap>
        </div >
    );
};


export default withScriptjs(withGoogleMap(SimpleMapPage))
