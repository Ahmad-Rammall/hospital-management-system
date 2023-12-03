import React from "react";
import axios from "axios";

import "./modal.css";

function Modal({ opened, manageModal, btn_text }) {
  const addNewDoctor = async() => {
    try {
        const response = await axios.post('http://localhost:80/Hospital-Management-System/server/manageDR.php', {
          
        });
  
        console.log(response.data); // Log the response from the server
      } catch (error) {
        console.error('Error adding user:', error);
      }
  };

  return (
    <div className={opened ? "popup open-popup" : "popup"} id="popup">
      <form action="" method="post">
        <div class="center-popup">
          <input
            type="text"
            placeholder="Add Username"
            id="popupText"
            name="username"
          />
          <input type="text" placeholder="Add Full Name" id="" name="name" />
          <input type="text" placeholder="Phone Number" id="" name="phone" />
          <input type="text" placeholder="Password" id="" name="password" />
          <input type="text" placeholder="Specialization" id="" name="spec" />
        </div>

        <div class="popup-buttons">
          <button className="popup-button" id="savePopup">
            {btn_text}
          </button>
          <button
            className="popup-button"
            id="cancelPopup"
            onClick={manageModal}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default Modal;
