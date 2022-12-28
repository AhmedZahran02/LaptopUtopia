<?php
include '../../php/dbclass.php';
$mydb = new Database();



$wf = isset($_POST['workfield']) ? $_POST['workfield'] : -1;

if ($wf == -1) {
    return null;
} else {
    if (isset($_POST['brandname'])) {
        $mydb->connect();

        $name = $_POST['brandname'];
        $query = "delete name FROM brand WHERE workfield = " . $wf . " and name = '" . $name . ";";

        //echo $query;
        $result = $mydb->query($query);

        $respond = [["done" => 0]];

        if ($result == true) {
            $respond[0]["done"] = 1;
        }

        $mydb->disconnect();

        echo json_encode($respond);
        return json_encode($respond);
    } else {
        return null;
    }
}