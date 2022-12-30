<?php
include '../../php/dbclass.php';
$mydb = new Database();

if (isset($_POST['username']) && isset($_POST['isAdmin'])) {
    $table = $_POST['isAdmin'] == 0 ? "customer" : "admin";
    $firstname = $_POST['firstname'];
    $lastname = $_POST['lastname'];
    $password = $_POST['password'];
    $phone = $_POST['phone'];
    $city = $_POST['city'];
    $street = $_POST['street'];
    $housenumber = $_POST['housenumber'];
    $startedworkat = $_POST['startedworkat'];

    if ($_POST['isAdmin'] == 0) {
        $query = "update customer set firstname = '" . $firstname . "', lastname='" . $lastname . "', password='" . sha1($password) . "', phone='" . $phone . "', city= '" . $city . "', street='" . $street . "',housenumber=" . $housenumber . " where usename ='" . $username . "';";
    } else {
        $query = "update admin set firstname = '" . $username . "', lastname='" . $lastname . "', password='" . sha1($password) . "', phone='" . $phone . "', startedworkat='" . $startedworkat . " where usename ='" . $username . "';";
    }

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