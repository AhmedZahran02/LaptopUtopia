<?php

include '../../php/dbclass.php';
$mydb = new Database();

$mydb->connect();

if (!isset($_POST['customerid']) || !isset($_POST['customerid']))
{
    $respond = [["Error" => "Set POST Attributes"]];
    echo json_encode($respond);
    return json_encode($respond);
}

$customerid = $_POST['customerid'];
$question = $_POST['question'];

try
{
$query = "INSERT INTO complaint VALUES ('".$customerid."',null,'".date("Y-n-j") ."','". $question. "',null)";
$result = $mydb->query($query);
}
catch(Exception $err)
{
    $err = $err->getMessage();
    $respond = [["Done" => 0],["Error" => $err]];
    echo json_encode($respond);
    return json_encode($respond);
}


$respond = [["Done" => 0]];

if ($result == 1) {
    $respond[0]["Done"] = 1;
}



$respond = json_encode($respond);

$mydb->disconnect();
echo $respond;
return $respond;
