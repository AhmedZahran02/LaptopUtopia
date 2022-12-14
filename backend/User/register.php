<?php
include '../../php/dbclass.php';
$mydb = new Database();


$table = $_GET['isAdmin'] == 0 ? "customer" : "admin";
$username = $_GET['username'];
$firstname = $_GET['firstname'];
$lastname = $_GET['lastname'];
$email = $_GET['email'];
$password = $_GET['password'];
$phone = $_GET['phone'];
$dateofbirth = $_GET['dateofbirth'];
$city = $_GET['city'];
$street = $_GET['street'];
$housenumber = $_GET['housenumber'];
$cartid = $_GET['cartid'];
$wishlistid = $_GET['wishlistid'];


    /*
    [{"Found":1},{"username":"MoA","firstname":"Mohammed","lastname":"Adel Mohammed",
        "email":"Email@email.com","password":"1234","phone":"1155877465","dateofbirth":"2022-12-06",
        "city":"Giza","street":"addd","housenumber":"10","cartid":"1","wishlistid":"1"}] 
    */
    
    
    
    
    $query = "insert into ". $table. " values "."('".$username."',' ".$firstname."','".$lastname."','".$email."','".$password."','".$phone."','".$dateofbirth."','".$city."','".$street."','".$housenumber."','".$cartid."','".$wishlistid."');";


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
    
