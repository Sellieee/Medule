import React, { Component } from "react";
import "./App.css";
import Search from "./components/Search";
import Map from "./components/Map";
import AppointmentApp from "./components/AppointmentApp";
import Navbar from "./components/Navbar";
import Modal from "react-modal";
import { tsConstructorType } from "@babel/types";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

const API_KEY = "AIzaSyAi5FmO4ICcm5wSgSML69KMj4ebRXObtwY"

Modal.setAppElement("#root");

class App extends Component {
  constructor() {
    super();
    this.state = {
      modalIsOpen: false,
      modalData: ''
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal(data) {
    this.setState({ modalIsOpen: true, modalData: data });
  }

  afterOpenModal() {
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({ modalIsOpen: false, modalData: "" });
  }

  render() {
    return (
      <div className="App" >
        <div>
          <button onClick={this.openModal}>Open Modal</button>
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >

            <h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2>
            <button onClick={this.closeModal}>close</button>
            <div>{this.state.modalData.name}</div>

          </Modal>
        </div>
        <Navbar />
        <Search
          apiKey={API_KEY}
        />
        <Map
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAi5FmO4ICcm5wSgSML69KMj4ebRXObtwY"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          center={{ lat: -24.9923319, lng: 135.2252427 }}
          zoom={11}
          apiKey={API_KEY}
          openModal={this.openModal}
        />
        <div></div>
        {/* <AppointmentApp /> */}
      </div>
    );
  }
}

export default App;
