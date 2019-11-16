import React, { Component } from "react";
import "./App.css";
import Search from "./components/Search";
import Map from "./components/Map";
import Calendar from "./components/Calendar";
import Navbar from "./components/Navbar";
import Modal from "react-modal";
import axios from "axios";
import { Route, Link } from "react-router-dom";
import Signup from "./components/Signup";
import LoginForm from "./components/LoginForm";
import 'bootstrap/dist/css/bootstrap.min.css';


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
      modalData: '',
      loggedIn: false,
      username: null
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.getUser = this.getUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount() {
    // this.getUser();
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


  updateUser(username) {
    this.setState({
      loggedIn: true,
      username: username
    });
  };

  getUser() {
    axios.get("/user").then(response => {
      console.log("Get user response: " + response.data);
      if (response.data.user) {
        console.log("Get user: There is a user saved in the server session: " + response.data.user);
        this.setState({
          loggedIn: true,
          username: response.data.user.username
        });
      }
      else {
        console.log("Get user: no user found");
        this.setState({
          loggedIn: false,
          username: null
        });
      };
    });
  };

  render() {
    return (
      <div className="App" >
        <Navbar updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
        {this.state.loggedIn && <p>Welcome to Medule, {this.state.username}!</p>}

        <Route path="/login"
          render={() =>
            <LoginForm updateUser={this.updateUser} />}
        />

        <Route path="/signup"
          render={() =>
            <Signup />}
        />

        {this.state.loggedIn && <Route path="/calendar"
          render={() =>
            <Calendar />}
        />}



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
          <Link to="/calendar">Go to Calendar</Link>
          <div>{this.state.modalData.name}</div>
        </Modal>


        {
          this.state.loggedIn && <div>
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
            /></div>
        }

        {/* <AppointmentApp /> */}
      </div>
    );
  }
}

export default App;
