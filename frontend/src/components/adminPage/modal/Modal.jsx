import React, { useState } from "react";
import axios from "axios";

import "./modal.css";

function Modal({ opened, manageModal, btn_text }) {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [specialization, setSpec] = useState("");

  const addNewDoctor = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('username' , username)
    formData.append('name' , name)
    formData.append('phone' , phone)
    formData.append('password' , password)
    formData.append('specialization' , specialization)

    try {
      const response = await axios.post(
        "http://localhost:80/Hospital-Management-System/server/manageDR.php",
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          username,
          name,
          phone,
          password,
          specialization,
        }
      );

      console.log(response.data);

    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <div className={opened ? "popup open-popup" : "popup"} id="popup">
      <form action="" method="POST" >
        <div className="center-popup">
          <input
            type="text"
            placeholder="Add Username"
            id="popupText"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Add Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="text"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="text"
            placeholder="Specialization"
            value={specialization}
            onChange={(e) => setSpec(e.target.value)}
          />
        </div>

        <div className="popup-buttons">
          <input type="submit" value={btn_text} className="popup-button" onClick={addNewDoctor}/>
          <button className="popup-button" type="button" onClick={manageModal}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default Modal;
