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
$image = $_POST['image'];



$mydb->connect();

if ($_POST['isAdmin'] == 0) {
    
    
$city = $_POST['city'];
$street = $_POST['street'];
$housenumber = $_POST['housenumber'];



$query = "INSERT INTO cart VALUES (null,0,'". date("Y-n-j") ."')";

$result = $mydb->query($query);

$query = "SELECT last_insert_id()";

$result = $mydb->query(($query));

$cartid = $result->fetch_assoc()['last_insert_id()'];

$query = "INSERT INTO wishlist VALUES (null,'". date("Y-n-j") ."')";

$result = $mydb->query($query);

$query = "SELECT last_insert_id()";

$result = $mydb->query(($query));

$wishlistid = $result->fetch_assoc()['last_insert_id()'];




    
    $query = "insert into " . $table . " values " . "('" . $username . "',' " . $firstname . "','" . $lastname . "','" . $email . "','" . sha1($password) . "','" . $phone . "','" . $dateofbirth . "','" . $city . "','" . $street . "','" . $housenumber . "','" . $cartid . "','" . $wishlistid . "');";
} else {
    
$startedworkat = $_POST['startedworkat'];
    
    $query = "insert into " . $table . " values " . "('" . $username . "','" . $firstname . "','" . $lastname . "','" . $email . "','" . sha1($password) . "','" . $phone . "','" . $dateofbirth . "','" . $startedworkat . "',0,'".$image."')";
}


$result = $mydb->query($query);

$respond = [["inserted" => 0]];

if ($result == true) {
    $respond[0]["inserted"] = 1;
}

$mydb->disconnect();

echo json_encode($respond);
return json_encode($respond);