import React from "react";
import ManageDoctors from "../ManageDoctors/ManageDoctors";

import "./navbar.css";

function navbar() {
  return (
    <>
      <div className="flex nav-container">
        <div className="nav-item">Manage Doctors</div>
        <div className="nav-item">Manage Patients</div>
        <div className="nav-item">Rooms Reservations</div>
      </div>
      <ManageDoctors />
    </>
  );
}

export default navbar;
