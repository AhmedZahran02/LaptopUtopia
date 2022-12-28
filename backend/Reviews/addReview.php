<?php
include '../../php/dbclass.php';
$mydb = new Database();


$mydb->connect();


$X = $_POST;


if(!isset($X['mid']) && !isset($X['username']) && !isset($X['comment']) && !isset($X['rating'])) return;


$mid = $X['mid'];
$username = $X['username'];
$comment = $X['comment'];
$rating = $X['rating'];


$query = "INSERT INTO review VALUES ('". $username . "', '" . $mid . "', '" .  date("Y-n-j") . "', '" . $comment. "', " . $rating . ")";

$result = $mydb->query($query);


$respond = ["Done" => $result];

echo json_encode($respond);

$mydb->disconnect();

return json_encode($respond);