<?php
include '../../php/dbclass.php';
$mydb = new Database();

if (isset($_POST['username'])) {

    $firstname = $_POST['firstname'];
    $lastname = $_POST['lastname'];
    $password = $_POST['password'];
    $phone = $_POST['phone'];
    $city = $_POST['city'];
    $street = $_POST['street'];
    $housenumber = $_POST['housenumber'];

    $query = "update customer set firstname = '" . $username . "', lastname='" . $lastname . "', password='" . sha1($password) . "', phone='" . $phone . "', city= '" . $city . "', street='" . $street . "',housenumber=" . $housenumber . " where usename ='" . $username . "';";

    $mydb->connect();

    $result = $mydb->query($query);

    $respond = [["updated" => 0]];

    if ($result == true) {
        $respond[0]["updated"] = 1;
    }

    $mydb->freeResult();
    $mydb->disconnect();

    echo json_encode($respond);
    return json_encode($respond);
}