<?php
include '../../php/dbclass.php';
$mydb = new Database();

if (isset($_GET['username']) && isset($_GET['password']) && isset($_GET['isAdmin']))
{
    $user = $_GET['username'];
    $pass = $_GET['password'];
    $table = $_GET['isAdmin'] == 0 ? "customer" : "admin" ;

    $query = "SELECT * FROM " . $table . " WHERE username = '" . $user . "' AND password = '" . $pass . "'";


    $mydb->connect();
    $result = $mydb->query($query);
    

    $respond = [["Found"=>0]];

    while ($row = $result->fetch_assoc())
    {
        $respond[0]["Found"] = 1;
        array_push($respond, $row);
    }

    $mydb->freeResult();
    $mydb->disconnect();

    echo json_encode($respond);
    return json_encode($respond);
    
}


