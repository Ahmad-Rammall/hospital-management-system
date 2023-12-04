<?php
include("connection.php");

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
    try {
        $json_data = file_get_contents("php://input");
        $data = json_decode( $json_data, true );

        $username = $data["username"];
        $name = $data["name"];
        $phone = $data["phone"];
        $spec = $data["specialization"];
        $password = password_hash($data["password"], PASSWORD_DEFAULT);

        $add_user_query = $mysqli->prepare("INSERT INTO users (Username, Full_Name, Phone_Number, Password, Role) VALUES (?, ?, ?, ?, 'doctor')");
        $add_user_query->bind_param("ssis", $username, $name, $phone, $password);
        $user_done = $add_user_query->execute();
        $userId = $mysqli->insert_id;

        $add_doctor_query = $mysqli->prepare("INSERT INTO doctors (UserID, Specialization) VALUES (?, ?)");
        $add_doctor_query->bind_param("is", $userId, $spec);
        $doctor_done = $add_doctor_query->execute();
    } catch (\Throwable $th) {
        throw $th;
    }

    if ($user_done && $doctor_done) {
        echo json_encode("User added successfully.");
    } else {
        echo json_encode("Error Adding Doctor");
    }
}
