import React, { useState, useEffect } from "react";

import "./admin.css";

import ManageDoctors from "../../components/adminPage/ManageDoctors/ManageDoctors";
import ManagePatients from "../../components/adminPage/ManagePatients/ManagePatients";

function AdminPage() {
  const [manageDoctors, setManageDoctors] = useState(false);
  const [managePatients, setManagedPatients] = useState(false);
  const [decodedToken, setDecodedToken] = useState("");

  const openPatientsSection = () => {
    setManagedPatients(!managePatients);
    setManageDoctors(false);
  };

  const openDoctorsSection = () => {
    setManagedPatients(false);
    setManageDoctors(!manageDoctors);
  };

  useEffect(() => {
    // Get the token from local storage
    const token = localStorage.getItem("token");

    if (token) {
      // Decode the token
      setDecodedToken(JSON.parse(atob(token.split(".")[1])).role);
    } else {
      console.log("Token not found in local storage.");
    }
  }, []);

  return (
    <div>
      {decodedToken === "admin" ? (
        <div className="flex nav-container">
          <div
            className={manageDoctors ? "nav-item selected" : "nav-item"}
            onClick={openDoctorsSection}
          >
            Manage Doctors
          </div>
          <div
            className={managePatients ? "nav-item selected" : "nav-item"}
            onClick={openPatientsSection}
          >
            Manage Patients
          </div>
          <div className="nav-item">Rooms Reservations</div>
        </div>
      ) : (
        <div className="error">Not Authorized</div>
      )}

      {manageDoctors ? <ManageDoctors /> : ""}
      {managePatients ? <ManagePatients /> : ""}
    </div>
  );
}

export default AdminPage;
