import React from "react";
import axios from "axios";

import "./doctorRow.css";

function DoctorRow({ doctor }) {
  const deleteDoctor = async () => {
    try {
      const response = await axios.post(
        "http://localhost:80/Hospital-Management-System/server/deleteDoctor.php",
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          userId: doctor.UserID,
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <tr>
      <td>{doctor.UserID}</td>
      <td>{doctor.DoctorID}</td>
      <td>{doctor.UserName}</td>
      <td>{doctor.Name}</td>
      <td>{doctor.Phone}</td>
      <td>{doctor.Spec}</td>
      <td>{doctor.Password}</td>
      <td>
        <button className="btn red-btn" onClick={deleteDoctor}>
          <i className="fa-solid fa-trash"></i>
        </button>
        <button className="btn blue-btn">
          <i className="fa-regular fa-pen-to-square"></i>
        </button>
      </td>
    </tr>
  );
}

export default DoctorRow;
