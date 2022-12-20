<?php
include '../../php/dbclass.php';
$mydb = new Database();
$mydb->connect();

$wf = isset($_POST['workfield']) ? $_POST['workfield'] : 10;

switch ($wf) {
    case 0:
        $wf = 0;
        break;
    case 1:
        $wf = 1;
        break;
    case 2:
        $wf = 2;
        break;
    case 3:
        $wf = 3;
        break;
    case 4:
        $wf = 4;
        break;
    default:
        $wf = -1;
        break;
}

if (isset($_POST['name']) && $wf != -1) {

    $brandname = $_POST['name'];

    $query = "INSERT INTO `brand`(`name`, `workfield`) VALUES (
        '" . $brandname . "',
        " . $wf . "
    );";
    //echo $query;
    $result = $mydb->query($query);
    $respond = [["done" => 0]];

    if ($result == true) {
        $respond[0]["done"] = 1;
    }

    $mydb->disconnect();

    echo json_encode($respond);
    return json_encode($respond);
}