import React, { Component } from "React";
import moment from "moment";
import { thisExpression } from "@babel/types";

export default class Calendar extends Component {

   state = {
      dateObject: moment()
   }

   // Sun, Mon, Tue, Wed, Thu, Fri, Sat
   weekdayshort = moment.weekdaysShort();

   // Retrieve first weekday of the month
   firstDayOfMonth = () => {
      let dateObject = this.state.dateObject;
      let firstDay = moment(dateObject)
         .startOf("month")
         .format("d");

      return firstDay;
   };

   render() {
      let weekdayshortname = this.weekdayshort.map(day => {
         return (
            <th key={day} className="week-day">
               {day}
            </th>
         )
      });

      let blanks = [];
      for (let i = 0; i < this.firstDayOfMonth(); i++) {
         blanks.push(<td key={i * 80} className="calendar-day empty">
            {""}
         </td>);
      };

      // This generates the calendar
      totalSlots.forEach((row, i) => {
         if (i % 7 !== 0) {
            cells.push(row);
         } else {
            rows.push(cells);
            cells = [];
            cells.push(row);
         }
         if (i === totalSlots.length - 1) {
            rows.push(cells);
         }
      });

      let daysinmonth = rows.map((d, i) => {
         return <tr>{d}</tr>
      });

      // Finding the current day
      currentDay = () => {
         return this.state.dateObject.format("D");
      };

      // If the day is the current day, add "today" to the class
      let daysInMonth = [];
      for (let d = 1; d <= this.daysInMonth(); d++) {
         let currentDay = d == this.currentDay() ? "today" : "";
         daysInMonth.push(
            <td key={d} className={`calendar-day ${currentDay}`}>
               {d}
            </td>
         );
      };

      var totalSlots = [...blanks, ...daysInMonth];
      let rows = [];
      let cells = [];

      return (
         <div>
            <div className="row">
               <div className="col-8">
                  <div className="calendar-container">
                     <table className="calendar">
                        <thead>
                           <tr className="calendar-header">
                              <td colSpan="5" className="month">

                              </td>
                           </tr>
                        </thead>
                     </table>
                  </div>
               </div>
            </div>
         </div >
      );
   }
}