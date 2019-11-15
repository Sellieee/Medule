
// import React, { Component } from "react";
// import AppBar from "material-ui/AppBar";
// import RaisedButton from "material-ui/RaisedButton";
// import FlatButton from "material-ui/FlatButton";
// import moment from "moment";
// import DatePicker from "material-ui/DatePicker";
// import Dialog from "material-ui/Dialog";
// import SelectField from "material-ui/SelectField";
// import MenuItem from "material-ui/MenuItem";
// import TextField from "material-ui/TextField";
// import SnackBar from "material-ui/Snackbar";
// import Card from "material-ui/Card";
// import App from "../App";
// import {
//    Step, Stepper,
//    StepLabel,
//    StepContent
// } from "material-ui/Stepper";
// import { RadioButton, RadioButtonGroup } from "material-ui/RadioButton";
// import axios from "axios";

// const API_BASE = "http://localhost:8083/";

// class AppointmentApp extends Component {
//    constructor(props, context) {
//       super(props, context);
//       this.state = {
//          firstName: "",
//          lastName: "",
//          email: "",
//          schedule: [],
//          confirmationModalOpen: false,
//          appointmentDateSelected: false,
//          appointmentMeridiem: 0,
//          validEmail: true,
//          validPhone: true,
//          finished: false,
//          smallScreen: window.innerWidth < 768,
//          stepIndex: 0
//       };
//    }

//    componentWillMount() {
//       axios.get(API_BASE + `api/retrieveSlots`).then(response => {
//          console.log("Response via database: ", response.data);
//          this.handleDBResponse(response.data);
//       });
//    }

//    handleSetAppointmentDate(date) {
//       this.setState({ appointmentDate: date, confirmationTextVisible: true });
//    }

//    handleSetAppointmentSlot(date) {
//       this.setState({ appointmentSlot: slot });
//    }

//    handleSetAppointmentMeridiem(meridiem) {
//       this.setState({ appointmentMeridiem: meridiem });
//    }

//    handleSubmit() {
//       this.setState({ confirmationModalOpen: false });
//       const newAppointment = {
//          name: this.state.firstName + " " + this.state.lastName,
//          email: this.state.email,
//          phone: this.state.phone,
//          slot_date: moment(this.state.appointmentDate).format("YYYY-DD-MM"),
//          slot_time: this.state.appointmentSlot
//       };

//       axios.post(API_BASE + "api/appointment/Create", newAppointment)
//          .then(response =>
//             this.setState({
//                confirmationSnackbarMessage: "Appointment succesfully added!",
//                confirmationSnackbarOpen: true,
//                processed: true
//             })
//          )
//          .catch(error => {
//             console.log(error);
//             return this.setState({
//                confirmationSnackbarMessage: "Appointment failed to save.",
//                confirmationSnackbarOpen: true
//             })
//          })
//    }

//    handleNext = () => {
//       const { stepIndex } = this.state;
//       this.setState({
//          stepIndex: stepIndex + 1,
//          finished: stepIndex >= 2
//       });
//    };

//    handlePrev = () => {
//       const { stepIndex } = this.state;
//       if (stepIndex > 0) {
//          this.setstate({ stepIndex: stepIndex - 1 });
//       }
//    };

//    // validateEmail(email) {
//    //    const regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
//    //    return regex.test(email)
//    //       ? this.setState({ email: email, validEmail: true })
//    //       : this.setState({ validEmail: false });
//    // }

//    // validatePhone(phoneNumber) {
//    //    const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
//    //    return regex.test(phoneNumber)
//    //       ? this.setState({ phone: phoneNumber, validPhone: true })
//    //       : this.setState({ validPhone: false });
//    // }

//    // checkDisableDate(day) {
//    //    const dateString = moment(day).format("MM-DD-YYYY");
//    //    return (
//    //       this.state.schedule[dateString] === true ||
//    //       moment(day)
//    //          .startOf("day")
//    //          .diff(moment().startOf("day")) < 0
//    //    );
//    // }

//    // handleDBReponse(response) {
//    //    const appointments = response;
//    //    const today = moment().startOf("day"); //start of today 12 am
//    //    const initialSchedule = {};
//    //    initialSchedule[today.format("YYYY-DD-MM")] = true;
//    //    const schedule = !appointments.length
//    //      ? initialSchedule
//    //      : appointments.reduce((currentSchedule, appointment) => {
//    //          const { slot_date, slot_time } = appointment;
//    //          const dateString = moment(slot_date, "YYYY-DD-MM").format(
//    //            "YYYY-DD-MM"
//    //          );
//    //          !currentSchedule[slot_date]
//    //            ? (currentSchedule[dateString] = Array(8).fill(false))
//    //            : null;
//    //          Array.isArray(currentSchedule[dateString])
//    //            ? (currentSchedule[dateString][slot_time] = true)
//    //            : null;
//    //          return currentSchedule;
//    //        }, initialSchedule);

//    //    for (let day in schedule) {
//    //      let slots = schedule[day];
//    //      slots.length
//    //        ? slots.every(slot => slot === true) ? (schedule[day] = true) : null
//    //        : null;
//    //    }

//    render() {
//       return (
//          <div>
//             <p>AppointmentApp</p>
//          </div>
//       );
//    }
// }

// export default AppointmentApp