import React, { Component } from "react";
import { GoogleMap, Marker, InfoWindow, withGoogleMap, withScriptjs } from "react-google-maps";
import item from "./places.json";

// const AnyReactComponent = ({ text }) => (
//     <div style={{
//         color: "white",
//         background: "grey",
//         padding: "15px 10px",
//         display: "inline-flex",
//         textAlign: "center",
//         alignItems: "center",
//         justifyContent: "center",
//         borderRadius: "100%",
//         transform: "translate(-50%, -50%)"
//     }}>
//         {text}
//     </div>
// );

class SimpleMapPage extends Component {
    defaultProps = {
        center: { lat: -37.88, lng: 145.018 },
        zoom: 14,
    };

    state = {
        item: item,
    }

    handleToggleOpen(item) {
        this.setState({
            position: {
                lat: item.latitude,
                lng: item.longitude
            }
        })
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
                                onClick={() => this.handleToggleOpen(item)}
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
