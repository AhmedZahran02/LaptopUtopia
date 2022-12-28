<?php

include '../../php/dbclass.php';
$mydb = new Database();

$mydb->connect();

if (isset($_POST['id'])) {

    $mydb->connect();

    $id = $_POST['id'];

    $query = "DELETE FROM complaint WHERE id='" . $id . "'";

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