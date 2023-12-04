<?php

include("connection.php");

try {
    $userIdToUpdate = $_POST["userId"];
    $username = $_POST["username"];
    $name = $_POST["name"];
    $phone = $_POST["phone"];
    $med = $_POST["med"];
    $password = password_hash($_POST["password"], PASSWORD_DEFAULT);

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