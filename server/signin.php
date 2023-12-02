<?php
include("connection.php");

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

$secretKey = 'your_secret_key';

$postData = file_get_contents('php://input');
$data = json_decode($postData, true);

// Use $data array instead of $_POST
$username = $data['username'];
$password = $data['password'];

$query = $mysqli->prepare('select Username,Password,Role from users where Username=?');
$query->bind_param('s', $username);
$query->execute();
$query->store_result();
$num_rows = $query->num_rows;
$query->bind_result($username, $password_got , $role);
$query->fetch();


$response = [];
if ($num_rows == 0 || $password != $password_got) {
    $response['status'] = 'user not found';
    echo json_encode($response);
} else {
    if ($password == $password_got) {
        $response['status'] = 'logged in';
        $response['username'] = $username;
        $response['password'] = $password_got;
        $response['role'] = $role;
        echo json_encode($response);


        // Create a token payload 
        $tokenPayload = [
            'username' => $username,
        ];

        // Encode the payload into a JWT
        $header = base64_encode(json_encode(['alg' => 'HS256', 'typ' => 'JWT']));
        $payload = base64_encode(json_encode($tokenPayload));
        $signature = hash_hmac('sha256', "$header.$payload", $secretKey, true);

        //Generated Token
        $token = "$header.$payload." . base64_encode($signature);
    }
};
