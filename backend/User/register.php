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
$startedworkat = $_POST['startedworkat'];

if ($_POST['isAdmin'] == 0) {
    $query = "insert into " . $table . " values " . "('" . $username . "',' " . $firstname . "','" . $lastname . "','" . $email . "','" . sha1($password) . "','" . $phone . "','" . $dateofbirth . "','" . $city . "','" . $street . "','" . $housenumber . "','" . $cartid . "','" . $wishlistid . "');";
} else {
    $query = "insert into " . $table . " values " . "('" . $username . "',' " . $firstname . "','" . $lastname . "','" . $email . "','" . sha1($password) . "','" . $phone . "','" . $dateofbirth . "','" . $startedworkat . "',0);";
}

$mydb->connect();

$result = $mydb->query($query);

$respond = [["inserted" => 0]];

if ($result == true) {
    $respond[0]["inserted"] = 1;
}

$mydb->freeResult();
$mydb->disconnect();

echo json_encode($respond);
return json_encode($respond);