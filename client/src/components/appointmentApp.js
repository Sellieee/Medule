
import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import moment from "moment";
import DatePicker from "material-ui/DatePicker";
import Dialog from "material-ui/Dialog";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import TextField from "material-ui/TextField";
import SnackBar from "material-ui/Snackbar";
import Card from "material-ui/Card";
import App from "../App";
import {
   Step, Stepper,
   StepLabel,
   StepContent
} from "material-ui/Stepper";
import { RadioButton, RadioButtonGroup } from "material-ui/RadioButton";
import axios from "axios";

const API_BASE = "http://localhost:8083/";

class AppointmentApp extends Component {
   constructor(props, context) {
      super(props, context);
      this.state = {
         firstName: "",
         lastName: "",
         email: "",
         schedule: [],
         confirmationModalOpen: false,
         appointmentDateSelected: false,
         appointmentMeridiem: 0,
         validEmail: true,
         validPhone: true,
         finished: false,
         smallScreen: window.innerWidth < 768,
         stepIndex: 0
      };
   }

   componentWillMount() {
      axios.get(API_BASE + `api/retrieveSlots`).then(response => {
         console.log("Response via database: ", response.data);
         this.handleDBResponse(response.data);
      });
   }

   handleSetAppointmentDate(date) {
      this.setState({ appointmentDate: date, confirmationTextVisible: true });
   }

   handleSetAppointmentSlot(date) {
      this.setState({ appointmentSlot: slot });
   }

   handleSetAppointmentMeridiem(meridiem) {
      this.setState({ appointmentMeridiem: meridiem });
   }

   handleSubmit() {
      this.setState({ confirmationModalOpen: false });
      const newAppointment = {

      }
   }

}
render() {
   return (
      <div>
         <p>AppointmentApp</p>
      </div>
   );
}


export default AppointmentApp