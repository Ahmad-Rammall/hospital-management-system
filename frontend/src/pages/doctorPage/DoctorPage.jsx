import React, { useState } from "react";

import RecordsSection from "../../components/doctorPage/RecordsSection/RecordsSection";
import ManageAppointments from "../../components/doctorPage/ManageAppointments/ManageAppointments";
import PrescribeMed from "../../components/doctorPage/prescribeMed/PrescribeMed";

function DoctorPage() {
  const [openRecords, setRecordsSection] = useState(false);
  const [openPrescribe, setPrescribe] = useState(false);
  const [openApp, setApp] = useState(false);

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

  return (
    <div>
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

      {openRecords ? <RecordsSection /> : ""}
      {openPrescribe ? <PrescribeMed /> : ""}
      {openApp ? <ManageAppointments /> : ""}
    </div>
  );
}

export default DoctorPage;
