import React, { useState, useEffect } from "react";

import MedicalHistorySection from "../../components/patientPage/MedicalHistorySection/MedicalHistorySection";
import BookAppsection from "../../components/patientPage/BookAppointmentsSection/BookAppSection";
import CancelAppSection from "../../components/patientPage/CancelAppSection/CancelAppSection";

function PatientPage() {
  const [openMed, setMed] = useState(false);
  const [bookApp, setBookApp] = useState(false);
  const [cancelApp, setCancelApp] = useState(false);
  const [patientId, setPatientId] = useState(0);
  const [decodedToken , setDecodedToken] = useState('')

  const openMedicalHistorysection = () => {
    setMed(!openMed);
    setBookApp(false);
    setCancelApp(false);
  };

  const openManageAppSection = () => {
    setMed(false);
    setBookApp(!bookApp);
    setCancelApp(false);
  };

  const openAppSection = () => {
    setMed(false);
    setBookApp(false);
    setCancelApp(!cancelApp);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setPatientId(JSON.parse(atob(token.split(".")[1])).patientId);
    }
    setDecodedToken(JSON.parse(atob(token.split(".")[1])).role)
  }, []);

  return (
    <div>

      {decodedToken === 'patient' ? (<div className="flex nav-container">
        <div
          className={openMed ? "nav-item selected" : "nav-item"}
          onClick={openMedicalHistorysection}
        >
          View Medical History
        </div>
        <div
          className={bookApp ? "nav-item selected" : "nav-item"}
          onClick={openManageAppSection}
        >
          Book Appointments
        </div>
        <div
          className={cancelApp ? "nav-item selected" : "nav-item"}
          onClick={openAppSection}
        >
          Cancel Appointments
        </div>
      </div>) : <div className="error">Not Authorized</div>}

      {openMed ? <MedicalHistorySection patientId={patientId} /> : ""}
      {bookApp ? <BookAppsection patientId={patientId}/> : ""}
      {cancelApp ? <CancelAppSection patientId={patientId}/> : ""}
    </div>
  );
}

export default PatientPage;
