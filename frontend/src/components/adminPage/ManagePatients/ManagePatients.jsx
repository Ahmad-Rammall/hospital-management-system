import React, { useEffect, useState } from "react";
import { sendRequest } from "../../../helpers/request";
import "./managePatients.css";
import PatientModal from "../PatientModal/PatientModal";
import PatientRow from "../PatientRow/PatientRow";

function ManagePatients() {
  const [patients, setPatients] = useState([]);
  const [modalOpened , setOpened] = useState(false)

  const getPatients = async () => {
    try {

      const response = await sendRequest({
        route: "/managePatients",
      });
      console.log(response);
      setPatients(response);
    } catch (error) {
      console.error(error);
    }
  };

  const manageModal = () => {
    setOpened(!modalOpened);
  }

  useEffect(() => {
    getPatients();
  }, []);

  return (
    <div className="flex center column container">
      <PatientModal opened={modalOpened} manageModal={manageModal} btn_text="Add"/>
      <button className="add-doctor-btn" onClick={manageModal}>Add Patient</button>

      <table>
        <tr>
          <th>UserID</th>
          <th>PatientID</th>
          <th>Username</th>
          <th>Full_Name</th>
          <th>Phone_Number</th>
          <th>Medical_History</th>
          <th>Password</th>
          <th>Options</th>
        </tr>
        {patients.map((d,index) => (
          <PatientRow key={index} patient={d} manageModal={manageModal}/>
        ))}
      </table>
    </div>
  );
}

export default ManagePatients;
