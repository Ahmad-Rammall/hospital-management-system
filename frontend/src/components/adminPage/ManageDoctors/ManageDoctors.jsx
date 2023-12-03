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

  const addNewDoctor = async (username, name, phone, password, specialization) => {
    try {
      const response = await axios.post(
        "http://localhost:80/Hospital-Management-System/server/manageDR.php",
        {
          username,
          name,
          phone,
          specialization,
          password
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  useEffect(() => {
    getDoctors();
    addNewDoctor('doc13' , 'doc 13' , 12313 , '123' , 'asdsad')
  }, []);

  return (
    <div className="flex center column container">
      <Modal opened={modalOpened} manageModal={manageModal} addNewDoctor={addNewDoctor} btn_text="Add"/>
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
        {doctors.map((d) => (
          <DoctorRow key={d.userId} doctors={d} />
        ))}
      </table>
    </div>
  );
}

export default ManageDoctors;
