<?php
include '../../php/dbclass.php';
$mydb = new Database();


$wf = isset($_GET['workfield']) ? $_GET['workfield'] : 0;

$mydb->connect();
$respond = [];
switch ($wf) {
    case 0:
        break;
    case 1:
        $query = "SELECT name FROM brand WHERE workfield = " . $wf . ";";
        //echo $query;
        $result = $mydb->query($query);
        $respond["brand"] = [];
        while ($row = $result->fetch_assoc()) {
            array_push($respond['brand'], $row['name']);
        }
        //---
        $query = "SELECT distinct numberofcores FROM cpu ;";
        //echo $query;
        $result = $mydb->query($query);
        $respond["numberofcores"] = [];

        while ($row = $result->fetch_assoc()) {
            array_push($respond['numberofcores'], $row['numberofcores']);
        }
        //---
        $query = "SELECT distinct numberofthreads FROM cpu ;";
        //echo $query;
        $result = $mydb->query($query);
        $respond["numberofthreads"] = [];
        while ($row = $result->fetch_assoc()) {
            array_push($respond['numberofthreads'], $row['numberofthreads']);
        }
        //---
        $query = "SELECT distinct clockspeed FROM cpu ;";
        //echo $query;
        $result = $mydb->query($query);
        $respond["clockspeed"] = [];
        while ($row = $result->fetch_assoc()) {
            array_push($respond['clockspeed'], $row['clockspeed']);
        }
        //---
        $query = "SELECT distinct cache FROM cpu ;";
        //echo $query;
        $result = $mydb->query($query);
        $respond["cache"] = [];
        while ($row = $result->fetch_assoc()) {
            array_push($respond['cache'], $row['cache']);
        }
        //---
        if (isset($_GET['brand'])) {
            $query = "select distinct subbrand,brandmodifier,skunumber from cpu,product where product.mid=cpu.mid and product.brandname in (";
            $array = $_GET['brand'];
            foreach ($array as $value) {
                $query = $query . "'" . $value . "',";
            }
            $query = rtrim($query, ", ");
            $query = $query . ");";
        } else {
            $query = "select distinct subbrand,brandmodifier,skunumber from cpu ;";
        }
        // echo $query;
        $result = $mydb->query($query);
        //var_dump($result);
        $respond["cpuname"] = [];
        while ($row = $result->fetch_assoc()) {
            array_push($respond['cpuname'], $row);
        }
        //---
        break;
    case 2:
        break;
    case 3:
        break;
    case 4:
        break;
    default:
        $wf = 0;
        break;
}

$mydb->freeResult();
$mydb->disconnect();

echo json_encode($respond);
return json_encode($respond);