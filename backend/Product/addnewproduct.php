<?php
include '../../php/dbclass.php';
$mydb = new Database();


$wf = isset($_POST['workfield']) ? $_POST['workfield'] : 10;
$mydb->connect();
switch ($wf) {
    case 0:
        $wf = 0;
        break;
    case 1:
        $wf = 1;
        break;
    case 2:
        $wf = 2;
        break;
    case 3:
        $wf = 3;
        break;
    case 4:
        $wf = 4;
        break;
    default:
        $wf = -1;
        break;
}

if (
    isset($_POST['mid']) && isset($_POST['brandname']) && isset($_POST['body']) && isset($_POST['title'])
    && isset($_POST['price']) && isset($_POST['quantity']) && isset($_POST['imagesurls']) && isset($_POST['discount']) && $wf != -1
) {

    $mid = $_POST['mid'];
    $brandname = $_POST['brandname'];
    $body = $_POST['body'];
    $title = $_POST['title'];
    $price = $_POST['price'];
    $quantity = $_POST['quantity'];
    $imagesurls = $_POST['imagesurls'];
    $discount = $_POST['discount'];

    $query = "INSERT INTO
    `product` (
        `mid`,
        `brandname`,
        `workfield`,
        `body`,
        `title`,
        `price`,
        `quantity`,
        `imageurls`,
        `discount`
    )
VALUES (
        '" . $mid . "',
        '" . $brandname . "',
        " . $wf . ",
        '" . $body . "',
        '" . $title . "',
        " . $price . ",
        " . $quantity . ",
        '" . $imagesurls . "',
        " . $discount . "
    );";

    $result = $mydb->query($query);

    $respond = [["done" => 0]];

    while ($row = $result->fetch_assoc()) {
        $respond[0]["done"] = 1;
        array_push($respond, $row);
    }

    $mydb->freeResult();
    $mydb->disconnect();

    echo json_encode($respond);
    return json_encode($respond);
}