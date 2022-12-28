<?php
include '../../php/dbclass.php';
$mydb = new Database();

if (isset($_POST['username']) && isset($_POST['password']) && isset($_POST['isAdmin'])) {
    $user = $_POST['username'];
    $pass = $_POST['password'];
    $table = $_POST['isAdmin'] == 0 ? "customer" : "admin";

    $query = "SELECT * FROM " . $table . " WHERE username = '" . $user . "' AND password = '" . sha1($pass) . "'";

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
}