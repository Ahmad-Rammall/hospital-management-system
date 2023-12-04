<?php

include("connection.php");
include('decodeJWT.php');

$auth = $_SERVER['HTTP_AUTHORIZATION'];
if(!decodeJWTs($auth)) {
    echo json_encode("Not Authorized");
    exit();
}

$appId = $_POST["appId"];

$delete_query = $mysqli->prepare("DELETE FROM appointments WHERE AppointmentID = ?");
$delete_query->bind_param("i", $appId);
$delete_done1 = $delete_query->execute();

if ($delete_done1) {
    echo json_encode("Appointment Canceled successfully.");
} else {
    echo json_encode("Error Deleting Doctor");
}
