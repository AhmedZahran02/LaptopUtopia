<?php
include '../../php/dbclass.php';
$mydb = new Database();

$mydb->connect();

$wf = isset($_POST['workfield']) ? $_POST['workfield'] : -1;

if ($wf == -1) {
    $mydb->disconnect();

    return null;
} else {
    $query = "SELECT name FROM brand WHERE workfield = " . $wf . ";";
    //echo $query;
    $result = $mydb->query($query);

    $respond = [];

    while ($row = $result->fetch_assoc()) {
        array_push($respond, $row['name']);
    }

    $respond = json_encode($respond);

    echo $respond;
    $mydb->freeResult();
    $mydb->disconnect();

    return $respond;
}