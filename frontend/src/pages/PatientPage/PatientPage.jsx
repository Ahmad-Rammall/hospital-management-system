import React, { useState, useEffect } from "react";

import MedicalHistorySection from "../../components/patientPage/MedicalHistorySection/MedicalHistorySection";
import ManageAppSection from "../../components/patientPage/ManageAppSection/ManageAppSection";
import ViewAppSection from "../../components/patientPage/ViewAppSection/ViewAppSection";

function PatientPage() {
  const [openMed, setMed] = useState(false);
  const [manageApp, setManageApp] = useState(false);
  const [openApp, setOpenApp] = useState(false);
  const [patientId, setPatientId] = useState(0);

  const openMedicalHistorysection = () => {
    setMed(!openMed);
    setManageApp(false);
    setOpenApp(false);
  };

  const openManageAppSection = () => {
    setMed(false);
    setManageApp(!manageApp);
    setOpenApp(false);
  };

  const openAppSection = () => {
    setMed(false);
    setManageApp(false);
    setOpenApp(!openApp);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setPatientId(JSON.parse(atob(token.split(".")[1])).patientId);
    }
  }, []);

  return (
    <div>
      <div className="flex nav-container">
        <div
          className={openMed ? "nav-item selected" : "nav-item"}
          onClick={openMedicalHistorysection}
        >
          View Medical History
        </div>
        <div
          className={manageApp ? "nav-item selected" : "nav-item"}
          onClick={openManageAppSection}
        >
          Manage Appointments
        </div>
        <div
          className={openApp ? "nav-item selected" : "nav-item"}
          onClick={openAppSection}
        >
          Cancel Appointments
        </div>
      </div>

      {openMed ? <MedicalHistorySection patientId={patientId} /> : ""}
      {manageApp ? <ManageAppSection patientId={patientId}/> : ""}
      {openApp ? <ViewAppSection patientId={patientId}/> : ""}
    </div>
  );
}

export default PatientPage;
