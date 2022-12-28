<?php
include '../../php/dbclass.php';
$mydb = new Database();


$x = $_GET;

if (!isset($x['username'])) return;

$mydb->connect();

$username = $x['username'];

$cartid = $mydb->get_cartid_from_username($username);

$products = [];

/*===================================================================================================================*/
/* Getting Products in cart and its quantity */
$query = "SELECT product.mid, cartitem.quantity,product.quantity as q FROM product,cartitem WHERE product.mid = cartitem.productid AND cartitem.id = " . $cartid . ";";

$result = $mydb->query($query);

$mid = [];

while ($row = $result->fetch_assoc()) {
    if ($row['quantity'] <= $row['q']) {
        array_push($products, $row);
    } else {
        $result[0]['outofstock'] = $row['mid'];
        echo $result;
        return $result;
    }
}

/*===================================================================================================================*/
/** Cart Total Price */

$query = "SELECT currentprice from cart WHERE id = " . $cartid;

$result = $mydb->query($query);

$ttlPrice = $result->fetch_assoc()['currentprice'];


/*===================================================================================================================*/
/** Inserting New Order */
$query = "INSERT INTO orders VALUES (null,'" . $username . "'," . $ttlPrice . ",'" . date("Y-n-j") . "',0);";


$result = $mydb->query($query);

$query = "SELECT last_insert_id()";

$result = $mydb->query(($query));

$orderid = $result->fetch_assoc()['last_insert_id()'];


/*===================================================================================================================*/
/** Inserting Products in orderitem table */

$respond = ["Done" => true];

for ($i = 0; $i < count($products); $i++) {

    $mid = $products[$i]['mid'];
    $quantity = $products[$i]['quantity'];


    $query = "INSERT INTO orderitem VALUES (" . $orderid . ", '" . $mid . "', " . $quantity . ")";

    $result = $mydb->query($query);

    $respond["Done"] = $respond["Done"] && $result;

    $query = "UPDATE product SET quantity = quantity - " . $quantity . " WHERE mid = '" . $mid . "';";

    $mydb->query($query);
}



echo json_encode($respond);

$mydb->disconnect();
return;