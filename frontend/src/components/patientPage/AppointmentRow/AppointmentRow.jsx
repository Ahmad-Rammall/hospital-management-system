import React from "react";
import { sendRequest } from "../../../helpers/request";

function AppointmentRow({ appointment , patientId}) {
  const cancelAppointment = async () => {
    try {
      const response = await sendRequest({
        method: "POST",
        route: "/cancelAppointment",
        body: { patientId , appId: appointment.AppId},
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <tr>
      <td>{appointment.AppId}</td>
      <td>{appointment.DocId}</td>
      <td>{appointment.Date}</td>
      <td>{appointment.StartTime}</td>
      <td>{appointment.EndTime}</td>
      <td>{appointment.Status}</td>
      <td>
        <i className="fa-solid fa-trash" onClick={cancelAppointment}></i>
      </td>
    </tr>
  );
}

export default AppointmentRow;
