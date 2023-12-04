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

    $query = $mysqli->prepare('select Medical_HisID, Surgical_History, Allergies, Notes from medical_histories,patients where PatientID=? AND patients.Medical_HistoryID=medical_histories.Medical_HisID');
    $query->bind_param("i", $patientId);
    $query->execute();
    $query->store_result();
    $num_rows = $query->num_rows;
    $query->bind_result($medId, $sugeries, $allergies, $notes);

    $histories = [];

    while ($query->fetch()) {
        $history = [
            'MedId' => $medId,
            'Surgeries' => $sugeries,
            'Allergies' => $allergies,
            'Notes' => $notes,
        ];

        $histories[] = $history;
    }

    echo json_encode($histories, JSON_PRETTY_PRINT);
}
