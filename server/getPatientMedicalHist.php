<?php

include("connection.php");
include('decodeJWT.php');

$auth = $_SERVER['HTTP_AUTHORIZATION'];
if (!decodeJWTs($auth)) {
    echo json_encode([]);
    exit();
}


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $patientId = $_POST['patientId'];

    $query = $mysqli->prepare('select Medical_HisID, Surgical_History, Allergies, Notes from medical_histories,patients where PatientID=? AND patients.Medical_HistoryID=medical_histories.Medical_HisID');
    $query->bind_param("i", $patientId);
    $query->execute();
    $query->store_result();
    $query->bind_result($medId, $sugeries, $allergies, $notes);
    $query->fetch();

    $response['MedId'] = $medId;
    $response['Surgeries'] = $sugeries;
    $response['Allergies'] = $allergies;
    $response['Notes'] = $notes;

    echo json_encode($response, JSON_PRETTY_PRINT);}
