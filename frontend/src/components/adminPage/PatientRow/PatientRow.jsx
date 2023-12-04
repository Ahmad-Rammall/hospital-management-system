import React , {useState} from "react";
import { useNavigate } from "react-router-dom";
import { sendRequest } from "../../../helpers/request";
import "../DoctorRow/doctorRow.css";
import PatientModal from "../PatientModal/PatientModal";

function PatientRow({patient}) {
  const navigate = useNavigate();
  const [modalOpened, setOpened] = useState(false);

  const manageModal = () => {
    setOpened(!modalOpened);
  };

  const deletePatient = async () => {
    try {
      const response = await sendRequest({
        body: {userId: patient.UserID},
        route: "/deletePatient",
        method: "POST",
      });

      console.log(response);
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
