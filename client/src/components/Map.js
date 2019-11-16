import React, { Component } from "react";
import { GoogleMap, Marker, InfoWindow, withGoogleMap, withScriptjs } from "react-google-maps";
import item from "../places.json";
class SimpleMapPage extends Component {
    defaultProps = {
        center: { lat: -37.88, lng: 145.018 },
        zoom: 14,
    };

    state = {
        item: item,
    }


    render() {
        return (
            <div style={{ width: "100%", height: "400px" }}>
                <GoogleMap
                    bootstrapURLKeys={{ key: this.props.apiKey }}
                    defaultCenter={{ lat: -37.88, lng: 145.018 }}
                    defaultZoom={14}
                >
                    {this.state.item.map((item, i) => {
                        let lat = parseFloat(item.latitude, 10);
                        let lng = parseFloat(item.longitude, 10);
                        // eslint-disable-next-line no-unreachable
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
                                }
                            </Marker>
                        )
                    })}
                </GoogleMap>
            </div >
        );
    };
};

export default withScriptjs(withGoogleMap(SimpleMapPage))
