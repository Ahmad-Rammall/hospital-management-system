<?php

include("connection.php");

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

try {
    $json_data = file_get_contents("php://input");
    $data = json_decode($json_data, true);

    $userIdToUpdate = $data["userId"];
    $username = $data["username"];
    $name = $data["name"];
    $phone = $data["phone"];
    $med = $data["med"];
    $password = password_hash($data["password"], PASSWORD_DEFAULT);

    $update_user_query = $mysqli->prepare("UPDATE users SET Username = ?, Full_Name = ?, Phone_Number = ?, Password = ? WHERE UserID = ?");
    $update_user_query->bind_param("ssisi", $username, $name, $phone, $password, $userIdToUpdate);
    $update_user_done = $update_user_query->execute();

    $userId = $mysqli->insert_id;

    $update_patient_query = $mysqli->prepare("UPDATE patients SET Medical_History = ? WHERE UserID = ?");
    $update_patient_query->bind_param("si", $med, $userIdToUpdate);
    $update_patient_done = $update_patient_query->execute();
} catch (\Throwable $th) {
    throw $th;
}

if ($update_user_done && $update_patient_done) {
    echo json_encode("User Updated successfully.");
} else {
    echo json_encode("Error Adding Doctor");
}
