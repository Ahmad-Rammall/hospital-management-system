import React, { useEffect, useState } from "react";
import { sendRequest } from "../../../helpers/request";
import AppointmentRow from "../AppointmentRow/AppointmentRow";

function ManageAppSection({ patientId }) {
  const [appointments, setAppointments] = useState([]);
  const getNullAppointments = async () => {
    try {
      const response = await sendRequest({
        method: "GET",
        route: "/patientBookAppointment",
      });
      console.log(response);
      setAppointments(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getNullAppointments();
  } , []);
  return (
    <div className="flex center column container">
      <table>
        <tr>
          <th>Appointment ID</th>
          <th>Doctor ID</th>
          <th>Patient ID</th>
          <th>Date</th>
          <th>Start Time</th>
          <th>End Time</th>
          <th>Status</th>
          <th>Cancel</th>
        </tr>
        {appointments.map((appointment) => (
          <AppointmentRow
            key={appointment.AppId}
            appointment={appointment}
            patientId={patientId}
            nullAppointment
          />
        ))}
      </table>
    </div>
  );
}

export default ManageAppSection;
