<?php
include '../../php/dbclass.php';
$mydb = new Database();


$wf = isset($_GET['workfield']) ? $_GET['workfield'] : 0;
$query = '';
switch ($wf) {
    case 0:
        $table = 'laptop';
        break;
    case 1:
        $table = 'cpu';
        break;
    case 2:
        $table = 'gpu';
        break;
    case 3:
        $table = 'ram';
        $mid = $_GET['mid'];
        $generation = $_GET['generation'];
        $writespeed = $_GET['writespeed'];
        $readspeed = $_GET['readspeed'];
        $capacity = $_GET['capacity'];
        $query = "insert into " . $table . " values " . "('" . $mid . "',' " . $generation . "'," . $writespeed . "," . $readspeed . "," . $capacity . ");";
        break;
    case 4:
        $table = 'storage';
        break;
    default:
        $table = 'laptop';
        break;
}


$query = "insert into " . $table . " values " . "('" . $username . "',' " . $firstname . "','" . $lastname . "','" . $email . "','" . $password . "','" . $phone . "','" . $dateofbirth . "','" . $city . "','" . $street . "','" . $housenumber . "','" . $cartid . "','" . $wishlistid . "');";


$mydb->connect();
$result = $mydb->query($query);


$respond = [["Found" => 0]];

while ($row = $result->fetch_assoc()) {
    $respond[0]["Found"] = 1;
    array_push($respond, $row);
}

$mydb->freeResult();
$mydb->disconnect();

echo json_encode($respond);
return json_encode($respond);