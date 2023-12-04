<?php

use Firebase\JWT\JWT;

include("connection.php");

$sec_key = 'your_secret_key';

$postData = file_get_contents('php://input');
$data = json_decode($postData, true);

// Use $data array instead of $_POST
$username = $_POST['username'];
$password = $_POST['password'];

$query = $mysqli->prepare('select Username,Password,Role from users where Username=?');
$query->bind_param('s', $username);
$query->execute();
$query->store_result();
$num_rows = $query->num_rows;
$query->bind_result($username, $password_got, $role);
$query->fetch();


$response = [];
if ($num_rows == 0 || $password != $password_got) {
    $response['status'] = 'user not found';
    echo json_encode($response);
} else {
    if ($password == $password_got) {

        // Create a token payload 
        $tokenPayload = [
            'username' => $username,
            'password' => $password,
            'role' => $role,
        ];

        $token = JWT::encode($tokenPayload , $sec_key , 'HS256');

        echo json_encode($token);
    }
};
