import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "../App.css"


class Ptform extends Component {

   render() {
      return (
         <div class="pt-form">
            <div class="row">
               <div class="col-sm-3"></div>
               <div class="col-sm-6">
                  <h2 class="ptheader">Please fill in the form</h2>
                  <br />
                  <hr />
                  <br />
                  <form>
                     <label class="authlabel">Title</label>
                     <input
                        type="text"
                        class="ptinfo"
                        className="form-control"
                        name="title"
                        placeholder="Ms/Miss/Mr/Mrs/Dr"
                     />
                     <label class="authlabel">First Name</label>
                     <input
                        type="text"
                        class="ptinfo"
                        className="form-control"
                        name="firstname"
                        placeholder="First Name"
                     />
                     <label class="authlabel">Surname</label>
                     <input
                        type="text"
                        class="ptinfo"
                        className="form-control"
                        name="surname"
                        placeholder="Surname"
                     />
                     <label class="authlabel">Date of Birth</label>
                     <input
                        type="text"
                        class="ptinfo"
                        className="form-control"
                        name="dob"
                        placeholder="DD/MM/YYYY"
                     />
                     <hr />
                     <label class="authlabel">Address</label>
                     <input
                        type="text"
                        class="ptinfo"
                        className="form-control"
                        name="address"
                        placeholder="Address"
                     />
                     <label class="authlabel">Suburb</label>
                     <input
                        type="text"
                        class="ptinfo"
                        className="form-control"
                        name="suburb"
                        placeholder="Suburb"
                     />
                     <label class="authlabel">Postcode</label>
                     <input
                        type="text"
                        class="ptinfo"
                        className="form-control"
                        name="postcode"
                        placeholder="Postcode"
                     />
                     <hr />
                     <label class="authlabel">Mobile Number</label>
                     <input
                        type="text"
                        class="ptinfo"
                        className="form-control"
                        name="mobile"
                        placeholder="Mobile Number"
                     />
                     <label class="authlabel">Home Number</label>
                     <input
                        type="text"
                        class="ptinfo"
                        className="form-control"
                        name="home"
                        placeholder="Home Number"
                     />
                     <hr />
                     <label class="authlabel">Medicare Card Number</label>
                     <input
                        type="text"
                        class="ptinfo"
                        className="form-control"
                        name="medicare"
                        placeholder="Medicare Card Number"
                     />
                     <label class="authlabel">Expiry Date</label>
                     <input
                        type="text"
                        class="ptinfo"
                        className="form-control"
                        name="expiry"
                        placeholder="DD/MM/YYYY"
                     />
                     <hr />
                     <label class="authlabel">Next of Kin</label>
                     <input
                        type="text"
                        class="ptinfo"
                        className="form-control"
                        name="nok"
                        placeholder="Next of Kin"
                     />
                     <label class="authlabel">Relationship</label>
                     <input
                        type="text"
                        class="ptinfo"
                        className="form-control"
                        name="relationship"
                        placeholder="Relationship"
                     />
                     <label class="authlabel">Contact Number</label>
                     <input
                        type="text"
                        class="ptinfo"
                        className="form-control"
                        name="contact"
                        placeholder="Contact Number"
                     />
                     <hr />
                     <label class="authlabel">Reason for Appointment</label>
                     <br />
                     <textarea class="pttext">Please type your reasons here</textarea>
                  </form>
                  <Link to="/success">
                     <button class="authbtn">Submit</button>
                  </Link>
               </div>
               <div class="col-sm-3"></div>
            </div>
         </div>
      );
   };
}

export default Ptform;