import React from "react";
import { sendRequest } from "../../../helpers/request";
import { useNavigate } from "react-router-dom";

function AppointmentRow({ appointment, patientId, nullAppointment }) {
  const navigate = useNavigate();
  const cancelAppointment = async () => {
    try {
      const response = await sendRequest({
        method: "POST",
        route: "/cancelAppointment",
        body: { patientId, appId: appointment.AppId },
      });
      navigate(0);
    } catch (error) {
      console.error(error);
    }
  };

  const bookAppointment = async () => {
    try {
      const response = await sendRequest({
        method: "POST",
        route: "/patientBookAppointment",
        body: { patientId, appId: appointment.AppId },
      });
      navigate(0);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {nullAppointment ? (
        <tr>
          <td>{appointment.AppId}</td>
          <td>{appointment.DocId}</td>
          <td>{appointment.PatientID}</td>
          <td>{appointment.Date}</td>
          <td>{appointment.StartTime}</td>
          <td>{appointment.EndTime}</td>
          <td>{appointment.Status}</td>
          <td>
            <i className="fa-solid fa-plus" onClick={bookAppointment}></i>
          </td>
        </tr>
      ) : (
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
      )}
    </>
  );
}

export default AppointmentRow;
