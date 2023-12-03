<?php

include("connection.php");

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

$json_data = file_get_contents("php://input");
$data = json_decode( $json_data, true );

$userId = $data["userId"];

$delete_query = $mysqli->prepare("DELETE FROM doctors WHERE UserID = ?");
$delete_query->bind_param("i", $userId);
$delete_done1 = $delete_query->execute();

$delete_query = $mysqli->prepare("DELETE FROM users WHERE UserID = ?");
$delete_query->bind_param("i", $userId);
$delete_done2 = $delete_query->execute();

if($delete_done1 && $delete_done2){
    echo json_encode("User Deleted successfully.");
}
else{
    echo json_encode("Error Deleting Doctor");
}
