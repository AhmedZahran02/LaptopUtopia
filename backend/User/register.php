<?php
include '../../php/dbclass.php';
$mydb = new Database();


$table = $_POST['isAdmin'] == 0 ? "customer" : "admin";
$username = $_POST['username'];
$firstname = $_POST['firstname'];
$lastname = $_POST['lastname'];
$email = $_POST['email'];
$password = $_POST['password'];
$phone = $_POST['phone'];
$dateofbirth = $_POST['dateofbirth'];
$city = $_POST['city'];
$street = $_POST['street'];
$housenumber = $_POST['housenumber'];
$cartid = $_POST['cartid'];
$wishlistid = $_POST['wishlistid'];


/*
    [{"Found":1},{"username":"MoA","firstname":"Mohammed","lastname":"Adel Mohammed",
        "email":"Email@email.com","password":"1234","phone":"1155877465","dateofbirth":"2022-12-06",
        "city":"Giza","street":"addd","housenumber":"10","cartid":"1","wishlistid":"1"}] 
    */



$query = "insert into " . $table . " values " . "('" . $username . "',' " . $firstname . "','" . $lastname . "','" . $email . "','" . sha1($password) . "','" . $phone . "','" . $dateofbirth . "','" . $city . "','" . $street . "','" . $housenumber . "','" . $cartid . "','" . $wishlistid . "');";


$mydb->connect();
$result = $mydb->query($query);


$respond = [];

if ($row = $result->fetch_assoc()) {
    array_push($respond, $row);
}

$mydb->freeResult();
$mydb->disconnect();

echo json_encode($respond);
return json_encode($respond);