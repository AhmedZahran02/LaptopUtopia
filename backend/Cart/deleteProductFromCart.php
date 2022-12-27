<?php

use LDAP\Result;

include '../../php/dbclass.php';
$mydb = new Database();

if($_GET['username']) {

    // not final and need update like wishlist
    $username = $_GET['username'];
    $mid = $_GET['mid'];

    $mydb->connect();


    $usercartid = $mydb->get_cartid_from_username($username);

    $query = "DELETE FROM cartitem WHERE productid = '" . $mid ."' and id = " . $usercartid . ";" ;


    $result = $mydb->query($query);

    $respond = [];
    
    if($result->num_rows > 0)
    {   
        while ($row = $result->fetch_assoc()) {
            array_push($respond, $row);
        }
    }


    //echo $result;

    $respond = json_encode($respond);

    echo $respond;

    $mydb->freeResult();
    $mydb->disconnect();

    return $respond;
}