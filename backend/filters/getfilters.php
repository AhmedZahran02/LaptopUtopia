<?php
include '../../php/dbclass.php';
$mydb = new Database();


$wf = isset($_POST['workfield']) ? $_POST['workfield'] : 10;

$mydb->connect();
$respond = [];
switch ($wf) {
    case 0:
        $query = "SELECT name FROM brand WHERE workfield = " . $wf . ";";
        //echo $query;
        $result = $mydb->query($query);
        $respond["brand"] = [];
        while ($row = $result->fetch_assoc()) {
            array_push($respond['brand'], $row['name']);
        }
        //---
        $query = "SELECT distinct displaytype FROM laptop ;";
        //echo $query;
        $result = $mydb->query($query);
        $respond["displaytype"] = [];
        while ($row = $result->fetch_assoc()) {
            array_push($respond['displaytype'], $row['displaytype']);
        }
        //---
        $query = "SELECT distinct webcamquality FROM laptop ;";
        //echo $query;
        $result = $mydb->query($query);
        $respond["webcamquality"] = [];
        while ($row = $result->fetch_assoc()) {
            array_push($respond['webcamquality'], $row['webcamquality']);
        }
        //---
        $query = "SELECT distinct os FROM laptop ;";
        //echo $query;
        $result = $mydb->query($query);
        $respond["os"] = [];
        while ($row = $result->fetch_assoc()) {
            array_push($respond['os'], $row['os']);
        }
        //---
        $query = "SELECT distinct displayhz FROM laptop ;";
        //echo $query;
        $result = $mydb->query($query);
        $respond["displayhz"] = [];
        while ($row = $result->fetch_assoc()) {
            array_push($respond['displayhz'], $row['displayhz']);
        }
        //---
        $query = "SELECT distinct batterycapacity FROM laptop ;";
        //echo $query;
        $result = $mydb->query($query);
        $respond["batterycapacity"] = [];
        while ($row = $result->fetch_assoc()) {
            array_push($respond['batterycapacity'], $row['batterycapacity']);
        }
        //--
        $query = "SELECT name FROM brand WHERE workfield = 1;";
        //echo $query;
        $result = $mydb->query($query);
        $respond["cpubrand"] = [];
        while ($row = $result->fetch_assoc()) {
            array_push($respond['cpubrand'], $row['name']);
        }
        //---
        if (isset($_POST['cpubrand'])) {
            $query = "select distinct subbrand,brandmodifier,skunumber from cpu,product where product.mid=cpu.mid and product.brandname in (";
            $array = $_POST['cpubrand'];
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
        //--
        $query = "SELECT name FROM brand WHERE workfield = 2;";
        //echo $query;
        $result = $mydb->query($query);
        $respond["gpubrand"] = [];
        while ($row = $result->fetch_assoc()) {
            array_push($respond['gpubrand'], $row['name']);
        }
        //---
        if (isset($_POST['gpubrand'])) {
            $query = "select distinct subbrand,brandmodifier,skunumber from gpu,product where product.mid=gpu.mid and product.brandname in (";
            $array = $_POST['gpubrand'];
            foreach ($array as $value) {
                $query = $query . "'" . $value . "',";
            }
            $query = rtrim($query, ", ");
            $query = $query . ");";
        } else {
            $query = "select distinct subbrand,brandmodifier,skunumber from gpu ;";
        }
        // echo $query;
        $result = $mydb->query($query);
        //var_dump($result);
        $respond["gpuname"] = [];
        while ($row = $result->fetch_assoc()) {
            array_push($respond['gpuname'], $row);
        }
        //--
        $query = "SELECT name FROM brand WHERE workfield = 3;";
        //echo $query;
        $result = $mydb->query($query);
        $respond["rambrand"] = [];
        while ($row = $result->fetch_assoc()) {
            array_push($respond['rambrand'], $row['name']);
        }
        //---
        $query = "SELECT distinct capacity FROM ram ;";
        //echo $query;
        $result = $mydb->query($query);
        $respond["ramcapacity"] = [];
        while ($row = $result->fetch_assoc()) {
            array_push($respond['ramcapacity'], $row['capacity']);
        }
        //---
        $query = "SELECT distinct generation FROM ram ;";
        //echo $query;
        $result = $mydb->query($query);
        $respond["ramgeneration"] = [];

        while ($row = $result->fetch_assoc()) {
            array_push($respond['ramgeneration'], $row['generation']);
        }
        //--
        $query = "SELECT name FROM brand WHERE workfield = 3;";
        //echo $query;
        $result = $mydb->query($query);
        $respond["storagebrand"] = [];
        while ($row = $result->fetch_assoc()) {
            array_push($respond['storagebrand'], $row['name']);
        }
        //---
        $query = "SELECT distinct capacity FROM storage ;";
        //echo $query;
        $result = $mydb->query($query);
        $respond["storagecapacity"] = [];
        while ($row = $result->fetch_assoc()) {
            array_push($respond['storagecapacity'], $row['capacity']);
        }
        //---

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
        if (isset($_POST['brand'])) {
            $query = "select distinct subbrand,brandmodifier,skunumber from cpu,product where product.mid=cpu.mid and product.brandname in (";
            $array = $_POST['brand'];
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
        $query = "SELECT name FROM brand WHERE workfield = " . $wf . ";";
        //echo $query;
        $result = $mydb->query($query);
        $respond["brand"] = [];
        while ($row = $result->fetch_assoc()) {
            array_push($respond['brand'], $row['name']);
        }
        //---
        $query = "SELECT distinct vram FROM gpu ;";
        //echo $query;
        $result = $mydb->query($query);
        $respond["vram"] = [];

        while ($row = $result->fetch_assoc()) {
            array_push($respond['vram'], $row['vram']);
        }
        //---
        $query = "SELECT distinct generation FROM gpu ;";
        //echo $query;
        $result = $mydb->query($query);
        $respond["generation"] = [];
        while ($row = $result->fetch_assoc()) {
            array_push($respond['generation'], $row['generation']);
        }
        //---
        if (isset($_POST['brand'])) {
            $query = "select distinct subbrand,brandmodifier,skunumber from gpu,product where product.mid=gpu.mid and product.brandname in (";
            $array = $_POST['brand'];
            foreach ($array as $value) {
                $query = $query . "'" . $value . "',";
            }
            $query = rtrim($query, ", ");
            $query = $query . ");";
        } else {
            $query = "select distinct subbrand,brandmodifier,skunumber from gpu ;";
        }
        // echo $query;
        $result = $mydb->query($query);
        //var_dump($result);
        $respond["gpuname"] = [];
        while ($row = $result->fetch_assoc()) {
            array_push($respond['gpuname'], $row);
        }
        //---
        break;
    case 3:
        $query = "SELECT name FROM brand WHERE workfield = " . $wf . ";";
        //echo $query;
        $result = $mydb->query($query);
        $respond["brand"] = [];
        while ($row = $result->fetch_assoc()) {
            array_push($respond['brand'], $row['name']);
        }
        //---
        $query = "SELECT distinct generation FROM ram ;";
        //echo $query;
        $result = $mydb->query($query);
        $respond["generation"] = [];

        while ($row = $result->fetch_assoc()) {
            array_push($respond['generation'], $row['generation']);
        }
        //---
        $query = "SELECT distinct writespeed FROM ram ;";
        //echo $query;
        $result = $mydb->query($query);
        $respond["writespeed"] = [];
        while ($row = $result->fetch_assoc()) {
            array_push($respond['writespeed'], $row['writespeed']);
        }
        //---
        $query = "SELECT distinct readspeed FROM ram ;";
        //echo $query;
        $result = $mydb->query($query);
        $respond["readspeed"] = [];
        while ($row = $result->fetch_assoc()) {
            array_push($respond['readspeed'], $row['readspeed']);
        }
        //---
        $query = "SELECT distinct capacity FROM ram ;";
        //echo $query;
        $result = $mydb->query($query);
        $respond["capacity"] = [];
        while ($row = $result->fetch_assoc()) {
            array_push($respond['capacity'], $row['capacity']);
        }
        break;
    case 4:
        $query = "SELECT name FROM brand WHERE workfield = " . $wf . ";";
        //echo $query;
        $result = $mydb->query($query);
        $respond["brand"] = [];
        while ($row = $result->fetch_assoc()) {
            array_push($respond['brand'], $row['name']);
        }
        //---
        $query = "SELECT distinct color FROM storage ;";
        //echo $query;
        $result = $mydb->query($query);
        $respond["color"] = [];

        while ($row = $result->fetch_assoc()) {
            array_push($respond['color'], $row['color']);
        }
        //---
        $query = "SELECT distinct writespeed FROM storage ;";
        //echo $query;
        $result = $mydb->query($query);
        $respond["writespeed"] = [];
        while ($row = $result->fetch_assoc()) {
            array_push($respond['writespeed'], $row['writespeed']);
        }
        //---
        $query = "SELECT distinct readspeed FROM storage ;";
        //echo $query;
        $result = $mydb->query($query);
        $respond["readspeed"] = [];
        while ($row = $result->fetch_assoc()) {
            array_push($respond['readspeed'], $row['readspeed']);
        }
        //---
        $query = "SELECT distinct capacity FROM storage ;";
        //echo $query;
        $result = $mydb->query($query);
        $respond["capacity"] = [];
        while ($row = $result->fetch_assoc()) {
            array_push($respond['capacity'], $row['capacity']);
        }
        //---
        $query = "SELECT distinct type FROM storage ;";
        //echo $query;
        $result = $mydb->query($query);
        $respond["type"] = [];
        while ($row = $result->fetch_assoc()) {
            array_push($respond['type'], $row['type']);
        }
        break;
    default:
        $respond[0]["Found"] = 0;
        break;
}

$mydb->freeResult();
$mydb->disconnect();

echo json_encode($respond);
return json_encode($respond);