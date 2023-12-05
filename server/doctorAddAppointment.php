<?php

include("connection.php");
include('decodeJWT.php');

$auth = $_SERVER['HTTP_AUTHORIZATION'];
if (!decodeJWTs($auth)) {
    echo json_encode("Not Authorized");
    exit();
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $patientId = $_POST['patientId'];
    $doctorId = $_POST['doctorId'];
    $appDate = $_POST['date'];
    $startTime = $_POST['startTime'];
    $endTime = $_POST['endTime'];

    if(!$patientId){
        $patientId=null;
    }

    $query = $mysqli->prepare("INSERT INTO appointments (DoctorID, PatientID, Appointment_Date, Start_Time, End_Time, Status) VALUES (?, ?, ?, ?, ?, 'upcoming')");
    $query->bind_param("iisss", $doctorId, $patientId, $appDate, $startTime, $endTime);
    $query->execute();
    $query->store_result();
    $num_rows = $query->num_rows;

    echo json_encode("Appointment Added Successfully.");
}
?>