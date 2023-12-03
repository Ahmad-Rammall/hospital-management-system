import React , {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "../DoctorRow/doctorRow.css";
import Modal from "../modal/Modal";
import PatientModal from "../PatientModal/PatientModal";

function PatientRow({patient}) {
  const navigate = useNavigate();
  const [modalOpened, setOpened] = useState(false);

  const manageModal = () => {
    setOpened(!modalOpened);
  };

  const deletePatient = async () => {
    try {
      const response = await axios.post(
        "http://localhost:80/Hospital-Management-System/server/deletePatient.php",
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          userId: patient.UserID,
        }
      );

      console.log(response.data);
      navigate(0);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <PatientModal
        user={patient}
        btn_text="Edit"
        opened={modalOpened}
        manageModal={manageModal}
      />

      <tr>
        <td>{patient.UserID}</td>
        <td>{patient.PatientID}</td>
        <td>{patient.UserName}</td>
        <td>{patient.Name}</td>
        <td>{patient.Phone}</td>
        <td>{patient.Medical_Hist}</td>
        <td>{patient.Password}</td>
        <td>
          <button className="btn red-btn" onClick={deletePatient}>
            <i className="fa-solid fa-trash"></i>
          </button>
          <button className="btn blue-btn" onClick={manageModal}>
            <i className="fa-regular fa-pen-to-square"></i>
          </button>
        </td>
      </tr>
    </>
  );
}

export default PatientRow;
