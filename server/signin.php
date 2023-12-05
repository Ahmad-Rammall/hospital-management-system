<?php

use Firebase\JWT\JWT;

include("connection.php");

$sec_key = 'my_secret_key';

$username = $_POST['username'];
$password = $_POST['password'];

$query = $mysqli->prepare('select UserID,Username,Password,Role from users where Username=?');
$query->bind_param('s', $username);
$query->execute();
$query->store_result();
$num_rows = $query->num_rows;
$query->bind_result($userId, $username, $password_got, $role);
$query->fetch();

$pass_verified = password_verify($password, $password_got);
$response = [];

$expTime = time() + 3600;

if ($num_rows == 0 || !$pass_verified) {
    $response['status'] = 'user not found';
    echo json_encode($response);
} else {

    switch ($role) {
        case 'patient':
            $get_patient_Id = $mysqli->prepare('select PatientID from patients where patients.UserID = ?');
            $get_patient_Id->bind_param('i', $userId);
            $get_patient_Id->execute();
            $get_patient_Id->store_result();
            $get_patient_Id->bind_result($patientId);
            $get_patient_Id->fetch();

            $tokenPayload = [
                'patientId' => $patientId,
                'username' => $username,
                'password' => $password_got,
                'role' => $role,
                'exp' => $expTime
            ];
            break;

        case 'doctor':
            $get_doctor_Id = $mysqli->prepare('select DoctorID from doctors where doctors.UserID = ?');
            $get_doctor_Id->bind_param('i', $userId);
            $get_doctor_Id->execute();
            $get_doctor_Id->store_result();
            $get_doctor_Id->bind_result($doctorId);
            $get_doctor_Id->fetch();

            $tokenPayload = [
                'doctorId' => $doctorId,
                'username' => $username,
                'password' => $password_got,
                'role' => $role,
                'exp' => $expTime
            ];
            break;

        default:
            $tokenPayload = [
                'username' => $username,
                'password' => $password_got,
                'role' => $role,
                'exp' => $expTime
            ];
            break;
    }

    $token = JWT::encode($tokenPayload, $sec_key, 'HS256');
    echo json_encode($token);
};