<?php
include '../../php/dbclass.php';
$mydb = new Database();


if (!isset($_GET['username'])) return;

$mydb->connect();

$username = $_GET['username'];

$wishlistid = $mydb->get_wishlistid_from_username($username);
$cartid = $mydb->get_cartid_from_username($username);

$queryo = "(SELECT productid FROM wishlistitem WHERE id = " . $wishlistid . ")";

$products = $mydb->query($queryo);

$respond = ["Done" => true, "Exists" => false];

while ($row = $products->fetch_assoc())
{
    try
    {
    $query = "INSERT INTO cartitem VALUES ( " . $cartid . ", '" . $row['productid'] . "', 1)";
    $result = $mydb->query($query);
    } catch(Exception $E)
    {
        $respond = ["Exists" => true, "Done" => false];
        echo json_encode($respond);
        return;
    }
}


echo( json_encode($respond));

$mydb->disconnect();
