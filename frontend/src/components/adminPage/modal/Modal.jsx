import React, { useState } from "react";
import axios from "axios";

import "./modal.css";

function Modal({ opened, manageModal, btn_text, addNewDoctor }) {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [specialization, setSpec] = useState("");

  return (
    <div className={opened ? "popup open-popup" : "popup"} id="popup">
      <form
        action=""
        method="post"
        onSubmit={
          btn_text === "Add"
            ? () => {
                addNewDoctor(username, name, phone, password, specialization);
              }
            : ""
        }
      >
        <div class="center-popup">
          <input
            type="text"
            placeholder="Add Username"
            id="popupText"
            name="username"
          />
          <input
            type="text"
            placeholder="Add Full Name"
            id=""
            name="name"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Phone Number"
            id=""
            name="phone"
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="text"
            placeholder="Password"
            id=""
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="text"
            placeholder="Specialization"
            id=""
            name="spec"
            onChange={(e) => setSpec(e.target.value)}
          />
        </div>

        <div class="popup-buttons">
          <input type="submit" value={btn_text} className="popup-button"/>
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
