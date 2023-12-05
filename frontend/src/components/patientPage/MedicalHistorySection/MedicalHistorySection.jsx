import React, { useState , useEffect} from "react";
import { sendRequest } from "../../../helpers/request";

function MedicalHistorySection({patientId}) {
  const [history, setHistory] = useState([]);

  const getMedicationHistory = async () => {
    try {
      const response = await sendRequest({
        method: "POST",
        route: "/getPatientMedicalHist",
        body: {patientId},
      });
      console.log(response);
      setHistory(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMedicationHistory();
  }, []);

  return (
    <div className="flex center column container">

      <table>
        <tr>
          <th>Medical History ID</th>
          <th>Surgical History</th>
          <th>Allergies</th>
          <th>Notes</th>
        </tr>
        <tr>
            <td>{history.MedId}</td>
            <td>{history.Surgeries}</td>
            <td>{history.Allergies}</td>
            <td>{history.Notes}</td>
        </tr>
      </table>
    </div>
  );
}

export default MedicalHistorySection;
