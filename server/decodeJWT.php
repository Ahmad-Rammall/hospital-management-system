<?php
require_once 'vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

function decodeJWTs($token)
{
    $sec_key = 'my_secret_key';
    try {
        JWT::decode($token, new Key($sec_key, 'HS256'));
        return true;
    } catch (Exception $e) {
        return false;
    }
}