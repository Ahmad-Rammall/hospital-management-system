import React, { useEffect, useState } from "react";

import RecordsSection from "../../components/doctorPage/RecordsSection/RecordsSection";
import ManageAppointments from "../../components/doctorPage/ManageAppointments/ManageAppointments";
import PrescribeMed from "../../components/doctorPage/prescribeMed/PrescribeMed";

import './doctor.css'

function DoctorPage() {
  const [openRecords, setRecordsSection] = useState(false);
  const [openPrescribe, setPrescribe] = useState(false);
  const [openApp, setApp] = useState(false);
  const [decodedToken, setDecodedToken] = useState("");

  const openRecordsSection = () => {
    setRecordsSection(!openRecords);
    setPrescribe(false);
    setApp(false);
  };

  const openMedSection = () => {
    setRecordsSection(false);
    setPrescribe(!openPrescribe);
    setApp(false);
  };

  const openAppSection = () => {
    setRecordsSection(false);
    setPrescribe(false);
    setApp(!openApp);
  };

  useEffect(() => {
    // Get the token from local storage
    const token = localStorage.getItem("token");

    if (token) {
      // Decode the token
      setDecodedToken(JSON.parse(atob(token.split(".")[1])).role);
    } else {
      console.log("Token not found in local storage.");
      // Handle the case when the token is not found in local storage
    }
  }, []);

  return (
    <div>
      {decodedToken === "doctor" ? (
        <div className="flex nav-container">
          <div
            className={openRecords ? "nav-item selected" : "nav-item"}
            onClick={openRecordsSection}
          >
            View Patient Record
          </div>
          <div
            className={openPrescribe ? "nav-item selected" : "nav-item"}
            onClick={openMedSection}
          >
            Prescribe Medication
          </div>
          <div
            className={openApp ? "nav-item selected" : "nav-item"}
            onClick={openAppSection}
          >
            Manage Appointments
          </div>
        </div>
      ) : (
        <div className='error'>Not Authorized</div>
      )}

      {openRecords ? <RecordsSection /> : ""}
      {openPrescribe ? <PrescribeMed /> : ""}
      {openApp ? <ManageAppointments /> : ""}
    </div>

  );
}

export default DoctorPage;
