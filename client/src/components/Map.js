import React, { Component } from "react";
import { GoogleMap, Marker, InfoWindow, withGoogleMap, withScriptjs } from "react-google-maps";
import item from "../places.json";

class SimpleMapPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            item: item,
            center: { lat: this.props.lat, lng: this.props.lng }
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.lat !== this.props.lat || prevProps.lng !== this.props.lng) {
            console.log()
            this.setState({ center: { lat: this.props.lat, lng: this.props.lng } })
        }
    }

    handleCenterChange = (center) => {
        this.setState({
            center: center
        })
    }

    render() {
        console.log(this.props.lat, this.props)

        return (
            <div style={{ width: "100%", height: "400px" }}>
                <GoogleMap
                    bootstrapURLKeys={{ key: this.props.apiKey }}
                    onCenterChanged={this.handleCenterChange}
                    center={this.state.center}
                    defaultZoom={14}
                >
                    {/* <Marker position={{ lat: this.props.lat, lng: this.props.lng }} /> */}
                    {this.state.item.map((item, i) => {
                        let lat = parseFloat(item.latitude, 10);
                        let lng = parseFloat(item.longitude, 10);
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
                                    </InfoWindow>}
                            </Marker>
                        )
                    })}
                </GoogleMap>
            </div>
        );
    };
};

export default withGoogleMap(SimpleMapPage)
