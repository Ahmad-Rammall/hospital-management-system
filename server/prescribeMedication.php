<?php
include("connection.php");
include('decodeJWT.php');

$auth = $_SERVER['HTTP_AUTHORIZATION'];
if(!decodeJWTs($auth)) {
    echo json_encode("Not Authorized");
    exit();
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    try {
        $doctorId = $_POST["doctorId"];
        $patientId = $_POST["patientId"];
        $name = $_POST["name"];
        $desc = $_POST["desc"];
        $dosage = $_POST['dosage'];

        $add_user_query = $mysqli->prepare("INSERT INTO medications (DoctorID, PatientID, Name, Description, Dosage) VALUES (?, ?, ?, ?, ?)");
        $add_user_query->bind_param("iisss", $doctorId, $patientId, $name, $desc, $dosage);
        $user_done = $add_user_query->execute();
        $userId = $mysqli->insert_id;
    } catch (\Throwable $th) {
        throw $th;
    }

    if ($user_done) {
        echo json_encode("Medication added successfully.");
    } else {
        echo json_encode("Error Adding Medication.");
    }
}
?>