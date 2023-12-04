<?php

include("connection.php");
include('decodeJWT.php');

$auth = $_SERVER['HTTP_AUTHORIZATION'];
if (!decodeJWTs($auth)) {
    echo json_encode("Not Authorized");
    exit();
}

if($_SERVER['REQUEST_METHOD'] == "GET"){
    $query = $mysqli->prepare('select AppointmentID, DoctorID, PatientID, Appointment_Date, Start_Time, End_Time, Status  from appointments where PatientID IS NULL');
    $query->execute();
    $query->store_result();
    $num_rows = $query->num_rows;
    $query->bind_result($appId, $docId, $patientId, $date, $start_time, $end_time, $status);


    $appointments = [];

    while ($query->fetch()) {
        $appointment = [
            'AppId' => $appId,
            'DocId' => $docId,
            'PatientID' => $patientId,
            'Date' => $date,
            'StartTime' => $start_time,
            'EndTime' => $end_time,
            'Status' => $status
        ];

        $appointments[] = $appointment;
    }

    echo json_encode($appointments, JSON_PRETTY_PRINT);
}


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $patientId = $_POST['patientId'];
    $appId = $_POST['appId'];

    $query = $mysqli->prepare("UPDATE appointments SET PatientID = ? WHERE AppointmentID = ?");
    $query->bind_param("ii", $patientId, $appId);
    $query->execute();
    $query->store_result();
    $num_rows = $query->num_rows;

    echo json_encode("Appointment Added.");
}
