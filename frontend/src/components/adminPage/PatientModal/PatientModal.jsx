import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "../modal/modal.css";

function PatientModal({opened , manageModal , btn_text ,user}) {
  const navigate = useNavigate();
  const [username, setUsername] = useState(user ? user?.UserName : "");
  const [name, setName] = useState(user ? user?.Name : "");
  const [phone, setPhone] = useState(user ? user?.Phone : "");
  const [password, setPassword] = useState(user ? user?.Password : "");
  const [med, setMed] = useState(user ? user?.Medical_Hist : "");

  const addNewPatient = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:80/Hospital-Management-System/server/managePatients.php",
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          username,
          name,
          phone,
          password,
          med,
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const updatePatient = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:80/Hospital-Management-System/server/updatePatient.php",
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          userId: user.UserID,
          username,
          name,
          phone,
          password,
          med,
        }
      );

      console.log(response.data);
      navigate(0);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <div className={opened ? "popup open-popup" : "popup"} id="popup">
      <form action="" method="POST">
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
            placeholder="Medical History"
            value={med}
            onChange={(e) => setMed(e.target.value)}
          />
        </div>

        <div className="popup-buttons">
          <input
            type="submit"
            value={btn_text}
            className="popup-button"
            onClick={btn_text === "Add" ? addNewPatient : updatePatient}
          />
          <button className="popup-button" type="button" onClick={manageModal}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default PatientModal;
