import React, { Component } from "react";
import moment from "moment";
import "../calendar.css";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-modal";
import "../App.css";

const customStyles = {
   content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)"
   }
};

Modal.setAppElement("#root");


export default class Calendar extends Component {
   state = {
      dateContext: moment(),
      today: moment(),
      showMonthPopup: false,
      showYearPopup: false,
      selectedDay: null,
      modalData: "",
      modalIsOpen: false
   }


   constructor(props) {
      super(props);
      this.width = props.width || "80%";
      this.style = props.style || {};
      this.style.width = this.width; // add this
      this.state = {
         dateContext: moment(),
         today: moment(),
         showMonthPopup: false,
         showYearPopup: false,
         selectedDay: null,
         modalData: "",
         modalIsOpen: false
      }
   }


   weekdays = moment.weekdays(); //["Sunday", "Monday", "Tuesday", "Wednessday", "Thursday", "Friday", "Saturday"]
   weekdaysShort = moment.weekdaysShort(); // ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
   months = moment.months();

   year = () => {
      return this.state.dateContext.format("Y");
   }
   month = () => {
      return this.state.dateContext.format("MMMM");
   }
   daysInMonth = () => {
      return this.state.dateContext.daysInMonth();
   }
   currentDate = () => {
      console.log("currentDate: ", this.state.dateContext.get("date"));
      return this.state.dateContext.get("date");
   }
   currentDay = () => {
      return this.state.dateContext.format("D");
   }

   firstDayOfMonth = () => {
      let dateContext = this.state.dateContext;
      let firstDay = moment(dateContext).startOf("month").format("d"); // Day of week 0...1..5...6
      return firstDay;
   }

   setMonth = (month) => {
      let monthNo = this.months.indexOf(month);
      let dateContext = Object.assign({}, this.state.dateContext);
      dateContext = moment(dateContext).set("month", monthNo);
      this.setState({
         dateContext: dateContext
      });
   }

   nextMonth = () => {
      let dateContext = Object.assign({}, this.state.dateContext);
      dateContext = moment(dateContext).add(1, "month");
      this.setState({
         dateContext: dateContext
      });
      this.props.onNextMonth && this.props.onNextMonth();
   }

   prevMonth = () => {
      let dateContext = Object.assign({}, this.state.dateContext);
      dateContext = moment(dateContext).subtract(1, "month");
      this.setState({
         dateContext: dateContext
      });
      this.props.onPrevMonth && this.props.onPrevMonth();
   }

   onSelectChange = (e, data) => {
      this.setMonth(data);
      this.props.onMonthChange && this.props.onMonthChange();

   }
   SelectList = (props) => {
      let popup = props.data.map((data) => {
         return (
            <div key={data}>
               <a href="#" onClick={(e) => { this.onSelectChange(e, data) }}>
                  {data}
               </a>
            </div>
         );
      });

      return (
         <div className="month-popup">
            {popup}
         </div>
      );
   }

   onChangeMonth = (e, month) => {
      this.setState({
         showMonthPopup: !this.state.showMonthPopup
      });
   }

   MonthNav = () => {
      return (
         <span className="label-month"
            onClick={(e) => { this.onChangeMonth(e, this.month()) }}>
            {this.month()}
            {this.state.showMonthPopup &&
               <this.SelectList data={this.months} />
            }
         </span>
      );
   }

   showYearEditor = () => {
      this.setState({
         showYearNav: true
      });
   }

   setYear = (year) => {
      let dateContext = Object.assign({}, this.state.dateContext);
      dateContext = moment(dateContext).set("year", year);
      this.setState({
         dateContext: dateContext
      })
   }
   onYearChange = (e) => {
      this.setYear(e.target.value);
      this.props.onYearChange && this.props.onYearChange(e, e.target.value);
   }

   onKeyUpYear = (e) => {
      if (e.which === 13 || e.which === 27) {
         this.setYear(e.target.value);
         this.setState({
            showYearNav: false
         })
      }
   }

   YearNav = () => {
      return (
         this.state.showYearNav ?
            <input
               defaultValue={this.year()}
               className="editor-year"
               ref={(yearInput) => { this.yearInput = yearInput }}
               onKeyUp={(e) => this.onKeyUpYear(e)}
               onChange={(e) => this.onYearChange(e)}
               type="number"
               placeholder="year" />
            :
            <span
               className="label-year"
               onDoubleClick={(e) => { this.showYearEditor() }}>
               {this.year()}
            </span>
      );
   }

   onDayClick = (e, day) => {
      this.setState({
         selectedDay: day
      }, () => {
         console.log("SELECTED DAY: ", this.state.selectedDay);
         this.openModal();
      });

      this.props.onDayClick && this.props.onDayClick(e, day);
   }

   openModal(data) {
      this.setState({ modalIsOpen: true, modalData: data });

   }

   afterOpenModal() {
      this.style.color = "#f00";
   }

   closeModal() {
      this.setState({ modalIsOpen: false, modalData: "" })
   }

   render() {
      // Map the weekdays i.e Sun, Mon, Tue etc as <td>
      let weekdays = this.weekdaysShort.map((day) => {
         return (
            <td key={day} className="week-day">{day}</td>
         )
      });

      let blanks = [];
      for (let i = 0; i < this.firstDayOfMonth(); i++) {
         blanks.push(<td key={i * 80} className="emptySlot">
            {""}
         </td>
         );
      }

      console.log("blanks: ", blanks);

      let daysInMonth = [];
      for (let d = 1; d <= this.daysInMonth(); d++) {
         let className = (d == this.currentDay() ? "day current-day" : "day");
         let selectedClass = (d == this.state.selectedDay ? " selected-day " : "")
         daysInMonth.push(
            <td key={d} className={className + selectedClass} >
               <span onClick={(e) => { this.onDayClick(e, d) }}>{d}</span>
            </td>
         );
      }


      console.log("days: ", daysInMonth);

      var totalSlots = [...blanks, ...daysInMonth];
      let rows = [];
      let cells = [];

      totalSlots.forEach((row, i) => {
         if ((i % 7) !== 0) {
            cells.push(row);
         } else {
            let insertRow = cells.slice();
            rows.push(insertRow);
            cells = [];
            cells.push(row);
         }
         if (i === totalSlots.length - 1) {
            let insertRow = cells.slice();
            rows.push(insertRow);
         }
      });

      let trElems = rows.map((d, i) => {
         return (
            <tr key={i * 100}>
               {d}
            </tr>
         );
      })

      return (
         <div>
            <Modal class="ptmodal"
               isOpen={this.state.modalIsOpen}
               onAfterOpen={this.afterOpenModal}
               onRequestClose={this.closeModal}
               style={customStyles}
               contentLabel="Example Modal"
            >
               <h2 class="ptheader" ref={subtitle => this.subtitle = subtitle}>Please select a time</h2>
               <br />
               <hr />
               <br />
               <Link to="/form">
                  <button class="timebtn">9.00</button>
               </Link>
               <br />
               <Link to="/form">
                  <button class="timebtn">10.00</button>
               </Link>
               <br />
               <Link to="/form">
                  <button class="timebtn">13.00</button>
               </Link>
               <br />
               <br />
               <button class="closebtn" onClick={this.closeModal}>Close</button>
            </Modal >
            <br />
            <br />
            <div class="row">
               <div class="col-sm-1"></div>
               <div class="calendar-container col-sm-10" style={this.style}>
                  <table className="calendar">
                     <thead>
                        <tr className="calendar-header">
                           <td colSpan="6">
                              <this.MonthNav />
                              {" "}
                              <this.YearNav />
                           </td>
                           <td colSpan="0.5" className="nav-month">
                              <i className="prev fa fa-fw fa-chevron-left"
                                 onClick={(e) => { this.prevMonth() }}>
                              </i>
                              <i className="prev fa fa-fw fa-chevron-right"
                                 onClick={(e) => { this.nextMonth() }}>
                              </i>

                           </td>
                        </tr>
                     </thead>
                     <tbody>
                        <tr>
                           {weekdays}
                        </tr>
                        {trElems}
                     </tbody>
                  </table>
               </div>
            </div>
            <div class="col-sm-1"></div>
            <Link to="/">
               <button class="homebtn">Go back</button>
            </Link>
         </div >


      );
   }
}