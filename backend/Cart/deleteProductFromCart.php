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

    $respond = ["Done"=>$result];

    if ($respond["Done"] == false)
    {
        echo json_encode($respond);
        return;
    }


    $query = "SELECT product.price, cartitem.quantity FROM product , cartitem WHERE cartitem.productid = product.mid AND cartitem.id = " . $usercartid;

    $result = $mydb->query($query)->fetch_assoc();

    if ($result == false)
    {
        $respond = ["Updated" => false];
        echo json_encode($respond);
        return;
    }


    $productPrice = $result['price'];
    $productAmount = $result['quantity'];

    $ttlPrice = $productAmount * $productPrice;


    $query = "UPDATE cart SET currentprice = currentprice - " . $ttlPrice . " WHERE cart.id = " . $usercartid;

    $result = $mydb->query($query);

    if ($result == false)
    {
        $respond = ["Updated" => false];
        echo json_encode($respond);
        return;
    }



    //echo $result;

    $respond = json_encode($respond);

    echo $respond;
    
    $mydb->disconnect();

    return $respond;
}