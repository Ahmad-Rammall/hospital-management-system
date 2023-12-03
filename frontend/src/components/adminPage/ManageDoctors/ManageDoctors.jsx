import React, { useEffect, useState } from "react";
import axios from "axios";

import "./manageDoctors.css";
import DoctorRow from "../DoctorRow/DoctorRow";
import Modal from "../modal/Modal";

function ManageDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [modalOpened , setOpened] = useState(false)

  const getDoctors = async () => {
    try {
      const response = await axios.get(
        "http://localhost:80/Hospital-Management-System/server/manageDR.php"
      );
      console.log(response.data);
      setDoctors(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const manageModal = () => {
    setOpened(!modalOpened);
  }

  useEffect(() => {
    getDoctors();
  }, []);

  return (
    <div className="flex center column container">
      <Modal opened={modalOpened} manageModal={manageModal} btn_text="Add"/>
      <button className="add-doctor-btn" onClick={manageModal}>Add Doctor</button>

      <table>
        <tr>
          <th>UserID</th>
          <th>DoctorID</th>
          <th>Username</th>
          <th>Full_Name</th>
          <th>Phone_Number</th>
          <th>Specialization</th>
          <th>Password</th>
          <th>Options</th>
        </tr>
        {doctors.map((d,index) => (
          <DoctorRow key={index} doctor={d} />
        ))}
      </table>
    </div>
  );
}

export default ManageDoctors;
