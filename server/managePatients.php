<?php
include("connection.php");

header('Access-Control-Allow-Origin: *');

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $query = $mysqli->prepare('select users.UserID ,patients.PatientID, users.Username , users.Full_Name , users.Phone_Number , patients.Medical_History , users.Password from users,patients where users.UserID=patients.UserID');
    $query->execute();
    $query->store_result();
    $num_rows = $query->num_rows;
    $query->bind_result($userId, $patientId, $username, $name, $phone, $med, $password);

    $patients = [];

    while ($query->fetch()) {
        $patient = [
            'UserID' => $userId,
            'PatientID' => $doctorId,
            'UserName' => $username,
            'Name' => $name,
            'Phone' => $phone,
            'Medical_Hist' => $med,
            'Password' => $password
        ];

        $patients[] = $patient;
    }

    $response = [];

    if ($num_rows == 0) {
        $response['status'] = 'No Patients';
        echo json_encode($response);
    } else {
        echo json_encode($patients, JSON_PRETTY_PRINT);
    }
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    try {
        $username = $_POST["username"];
        $name = $_POST["name"];
        $phone = $_POST["phone"];
        $med = $_POST["med"];
        $password = password_hash($_POST["password"], PASSWORD_DEFAULT);

        $add_user_query = $mysqli->prepare("INSERT INTO users (Username, Full_Name, Phone_Number,Password,Role) VALUES ('$username', '$name',$phone, '$password' , 'doctor')");

        $user_done = $add_user_query->execute();
        $userId = $mysqli->insert_id;

        $add_patient_query = $mysqli->prepare("INSERT INTO patients (UserID ,Medical_History) VALUES ($userId,'$med')");
        $patient_done = $add_patient_query->execute();
    } catch (\Throwable $th) {
        throw $th;
    }

    if ($user_done && $patient_done) {
        echo json_encode("User added successfully.");
    } else {
        echo json_encode("Error Adding Doctor");
    }
}