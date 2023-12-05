<?php

include("connection.php");
include('decodeJWT.php');

$auth = $_SERVER['HTTP_AUTHORIZATION'];
if(!decodeJWTs($auth)) {
    echo json_encode("Not Authorized");
    exit();
}

$appId = $_POST["appId"];

if(isset($_POST['patientId'])){
    $patientId = $_POST['patientId'];
    $delete_query = $mysqli->prepare("DELETE FROM appointments WHERE (AppointmentID = ? AND PatientID= ?)");
    $delete_query->bind_param("ii", $appId, $patientId);
    $delete_query->execute();
    $affectedRows = $delete_query->affected_rows;
}

if(isset($_POST['doctorId'])){
    $doctorId = $_POST['doctorId'];
    $delete_query = $mysqli->prepare("DELETE FROM appointments WHERE (AppointmentID = ? AND DoctorID= ?)");
    $delete_query->bind_param("ii", $appId, $doctorId);
    $delete_query->execute();
    $affectedRows = $delete_query->affected_rows;
}


if ($affectedRows > 0) {
    echo json_encode("Appointment Canceled successfully.");
} else {
    echo json_encode("Error Cancelling Appointment");
}
