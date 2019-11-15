import React, { Component } from "react";

class Modal extends Component {
   constructor(props) {
      super(props);
      this.state
   }

   const createModal = ({ handleClose, show, children }) => {
      const showHideClassName = show ? "modal display-block" : "modal display-none";

      return (
         <div className={showHideClassName}>
            <section className="doctor-modal">
               {children}
               <button onClick={handleClose}>Close</button>
            </section>
         </div>
      )
   }

}

export default Modal;