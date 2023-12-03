import React from "react";

import './doctorRow.css'

function DoctorRow({ doctors }) {

  return (
    <tr>
      <td>{doctors.UserID}</td>
      <td>{doctors.DoctorID}</td>
      <td>{doctors.UserName}</td>
      <td>{doctors.Name}</td>
      <td>{doctors.Phone}</td>
      <td>{doctors.Spec}</td>
      <td>{doctors.Password}</td>
      <td>
        <button className="btn red-btn">
          <i class="fa-solid fa-trash"></i>
        </button>
        <button className="btn blue-btn">
          <i class="fa-regular fa-pen-to-square"></i>
        </button>
      </td>
    </tr>
  );
}

export default DoctorRow;
