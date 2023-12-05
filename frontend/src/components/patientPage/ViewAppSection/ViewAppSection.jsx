import React, { useState, useEffect } from "react";
import { sendRequest } from "../../../helpers/request";
import AppointmentRow from "../AppointmentRow/AppointmentRow";

function ViewAppSection({ patientId }) {
  const [appointments, setAppointments] = useState([]);
  const getPatientAppointments = async () => {
    try {
      const response = await sendRequest({
        method: "POST",
        route: "/getPatientAppointments",
        body: { patientId },
      });
      console.log(response);
      setAppointments(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPatientAppointments();
  }, []);

  return (
    <div className="flex center column container">
      <table>
        <tr>
          <th>Appointment ID</th>
          <th>Doctor ID</th>
          <th>Date</th>
          <th>Start Time</th>
          <th>End Time</th>
          <th>Status</th>
          <th>Cancel</th>
        </tr>
        {appointments.map((appointment) => (
          <AppointmentRow key={appointment.AppId} appointment={appointment} patientId={patientId}/>
        ))}
      </table>
    </div>
  );
}

export default ViewAppSection;
