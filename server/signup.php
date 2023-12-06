<?php
include("connection.php");


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    try {
        $patient_done = false;
        $doctor_done = false;
        $admin_done = false;

        $username = $_POST["username"];
        $name = $_POST["name"];
        $phone = $_POST["phone"];
        $password = password_hash($_POST["password"], PASSWORD_DEFAULT);
        $role = $_POST['role'];

        if(isset($_POST['specialization'])){
            $spec = $_POST['specialization'];
        }

        if(isset($_POST['medication'])){
            $med = $_POST['medication'];
        }

        $add_user_query = $mysqli->prepare("INSERT INTO users (Username, Full_Name, Phone_Number, Password, Role) VALUES (?, ?, ?, ?, ?)");
        $add_user_query->bind_param("ssiss", $username, $name, $phone, $password, $role);
        $user_done = $add_user_query->execute();
        $userId = $mysqli->insert_id;

        if($role === "doctor"){
            $add_doctor_query = $mysqli->prepare("INSERT INTO doctors (UserID, Specialization) VALUES (?, ?)");
            $add_doctor_query->bind_param("is", $userId, $spec);
            $doctor_done = $add_doctor_query->execute();
        }

        if($role === "patient"){
            $add_patient_query = $mysqli->prepare("INSERT INTO patients (UserID, Medical_HistoryID) VALUES (?, ?)");
            $add_patient_query->bind_param("ii", $userId, $med);
            $patient_done = $add_patient_query->execute();
        }

        if($role === "admin"){
            $add_admin_query = $mysqli->prepare("INSERT INTO admins (UserID) VALUES (?)");
            $add_admin_query->bind_param("i", $userId);
            $admin_done = $add_admin_query->execute();
        }

        
    } catch (\Throwable $th) {
        throw $th;
    }

    if (($user_done && $doctor_done) || ($user_done && $patient_done) || ($user_done && $admin_done)) {
        echo json_encode("User added successfully.");
    } else {
        echo json_encode("Error Adding User");
    }
}
