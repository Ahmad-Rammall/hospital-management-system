<?php

use Firebase\JWT\JWT;

include("connection.php");

$sec_key = 'my_secret_key';

$username = $_POST['username'];
$password = $_POST['password'];

$query = $mysqli->prepare('select Username,Password,Role from users where Username=?');
$query->bind_param('s', $username);
$query->execute();
$query->store_result();
$num_rows = $query->num_rows;
$query->bind_result($username, $password_got, $role);
$query->fetch();

$pass_not_verified = password_verify($password, $password_got);
$response = [];

$expTime = time() + 60;

if ($num_rows == 0 || $pass_not_verified) {
    $response['status'] = 'user not found';
    echo json_encode($response);
} else {

    // Create a token payload 
    $tokenPayload = [
        'username' => $username,
        'password' => $password,
        'role' => $role,
        'exp' => $expTime
    ];

    $token = JWT::encode($tokenPayload, $sec_key, 'HS256');

    echo json_encode($token);
};
