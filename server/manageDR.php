<?php
include("connection.php");

header('Access-Control-Allow-Origin: *');

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $query = $mysqli->prepare('select users.UserID ,doctors.DoctorID, users.Username , users.Full_Name , users.Phone_Number , doctors.specialization , users.Password from users,doctors where users.UserID=doctors.UserID');
    $query->execute();
    $query->store_result();
    $num_rows = $query->num_rows;
    $query->bind_result($userId, $doctorId, $username, $name, $phone, $spec, $password);

    $doctors = [];

    while ($query->fetch()) {
        $doctor = [
            'UserID' => $userId,
            'DoctorID' => $doctorId,
            'UserName' => $username,
            'Name' => $name,
            'Phone' => $phone,
            'Spec' => $spec,
            'Password' => $password
        ];

        $doctors[] = $doctor;
    }

    $response = [];

    if ($num_rows == 0) {
        $response['status'] = 'No Doctors';
        echo json_encode($response);
    } else {
        echo json_encode($doctors, JSON_PRETTY_PRINT);
    }
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["username"];
    $name = $_POST["name"];
    $phone = $_POST["phone"];
    $spec = $_POST["specialization"];
    $password = password_hash($_POST["password"], PASSWORD_DEFAULT);

    $sql_add = "INSERT INTO users (username, email, password) VALUES ('$username', '$email', '$password')";

    if ($conn->query($sql_add) === TRUE) {
        echo json_encode("User added successfully.");
    } else {
        echo json_encode("Error: " . $sql_add . "<br>" . $conn->error);
    }
}
