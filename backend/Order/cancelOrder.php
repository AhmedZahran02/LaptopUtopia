<?php
include '../../php/dbclass.php';
$mydb = new Database();

if (isset($_GET['id'])) {
    $id = $_GET['id'];
    $mydb->connect();

    $query = "DELETE * FROM orders WHERE id = " . $id . ";";
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