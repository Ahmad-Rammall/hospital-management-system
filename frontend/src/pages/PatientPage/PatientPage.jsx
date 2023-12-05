import React, { useState } from "react";

import MedicalHistorySection from "../../components/patientPage/MedicalHistorySection/MedicalHistorySection";
import ManageAppSection from "../../components/patientPage/ManageAppSection/ManageAppSection";
import ViewAppSection from "../../components/patientPage/ViewAppSection/ViewAppSection";

function PatientPage() {
  const [openMed, setMed] = useState(false);
  const [manageApp, setManageApp] = useState(false);
  const [openApp, setOpenApp] = useState(false);

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
          View Appointments
        </div>
      </div>

      {openMed ? <MedicalHistorySection /> : ""}
      {manageApp ? <ManageAppSection /> : ""}
      {openApp ? <ViewAppSection /> : ""}
    </div>
  );
}

export default PatientPage;
