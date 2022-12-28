<?php
include '../../php/dbclass.php';
$mydb = new Database();



$A = isset($_POST['customerid']);
$A = $A && isset($_POST['question']);
$A = $A && isset($_POST['adminid']);
$A = $A && isset($_POST['answer']);

$mydb->connect();

if ($A == false) {
    $respond = [["Error" => "Set POST Attributes"]];
    echo json_encode($respond);
    return json_encode($respond);
}


$customerid = $_POST['customerid'];
$question = $_POST['question'];
$adminid = $_POST['adminid'];
$answer = $_POST['answer'];


try {
    
    $query = "UPDATE complaint SET adminid = '" . $adminid . "', anwser = '" . $answer . "' WHERE customerid = '" . $customerid . "' AND question = ". '"' . $question . '"';
    
    echo $query;

    $result = $mydb->query($query);
} catch (Exception $err) {
    $err = $err->getMessage();
    $respond = [["Done" => 0], ["Error" => $err]];
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
