<?php
include '../../php/dbclass.php';
$mydb = new Database();


$productid = $_GET['productid'];

$query = "select * from review where productid = " . $productid;


    $mydb->connect();
    $result = $mydb->query($query);
    

    $respond = [];

    if ($row = $result->fetch_assoc())
    {
        array_push($respond, $row);
    }

    $mydb->freeResult();
    $mydb->disconnect();

    echo json_encode($respond);
    return json_encode($respond);
    
