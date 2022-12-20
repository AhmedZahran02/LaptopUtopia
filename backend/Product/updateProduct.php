<?php
include '../../php/dbclass.php';
$mydb = new Database();


$wf = isset($_GET['workfield']) ? $_GET['workfield'] : 0;
$query = '';
switch ($wf) {
    case 0:
        $table = 'laptop';
        $mid = $_GET['mid'];
        $modelname = $_GET['modelname'];
        $os = $_GET['os'];
        $displaytype = $_GET['displaytype'];
        $fingerprint = $_GET['fingerprint'];
        $weight = $_GET['wheight'];
        $webcam = $_GET['webcam'];
        $webcamquality = $_GET['webcamquality'];
        $displayhz = $_GET['displayhz'];
        $batterycapacity = $_GET['ports'];
        $ports = $_GET['ports'];
        $touchscreen = $_GET['touchscreen'];
        $cpuid = $_GET['cpuid'];
        $gpuid = $_GET['gpuid'];
        $storageid = $_GET['storageid'];
        $ramid    = $_GET['ramid'];

        $query = "update laptop set " . "mid='" . $mid . "',modelname='" . $modelname . "',os='" . $os . "',displaytype='" . $displaytype .
            "',fingerprint=" . $fingerprint . ", weight=" . $weight .
            ",webcam=" . $webcam . ",webcamquality=" . $webcamquality . ",displayhz=" . $displayhz . ",batterycapacity=" . $batterycapacity . ",ports='" . $ports .
            "',touchscreen=" . $touchscreen . ",cpuid='" . $cpuid . "',gpuid='" . $gpuid . "',storageid='" . $storageid . "',ramid='" . $ramid .
            " where mid ='" . $mid . "'";

        break;
    case 1:
        $table = 'cpu';
        $mid = $_GET['mid'];
        $subbrand = $_GET['subbrand'];
        $brandmodifier = $_GET['brandmodifier'];
        $skunumber = $_GET['skunumber'];
        $numberofcores = $_GET['numberofcores'];
        $numberofthreads = $_GET['numberofthreads'];
        $clockspeed = $_GET['clockspeed'];
        $cache = $_GET['cache'];

        $query = "update cpu set " . "mid='" . $mid . "', subbrand='" . $subbrand . "', brandmodifier='" . $brandmodifier .
            "', skunumber='" . $skunumber . "', numberofcores=" . $numberofcores .
            ",numberofthreads=" . $numberofthreads . ",clockspeed=" . $clockspeed . ",cache=" . $cache . " " .
            "where mid ='" . $mid . "'";

        break;
    case 2:
        $table = 'gpu';
        $mid = $_GET['mid'];
        $subbrand = $_GET['subbrand'];
        $brandmodifier = $_GET['brandmodifier'];
        $skunumber = $_GET['skunumber'];
        $vram = $_GET['vram'];
        $generation = $_GET['generation'];

        $query = "update gpu set " . "mid='" . $mid . "',subbrand='" . $subbrand . "',brandmodifier='" . $brandmodifier .
            "',skunumber='" . $skunumber . "',generation='" . $generation .
            "',vram=" . $vram .
            " where mid ='" . $mid . "'";

        break;
    case 3:
        $table = 'ram';
        $mid = $_GET['mid'];
        $generation = $_GET['generation'];
        $writespeed = $_GET['writespeed'];
        $reedspeed = $_GET['reedspeed'];
        $capacity = $_GET['capaciry'];

        $query = "update ram set " . "mid='" . $mid . "',generation='" . $generation . "',writespeed=" . $writespeed .
            ",reedspeed=" . $reedspeed . ",capacity=" . $capacity .
            " where mid ='" . $mid . "'";


        break;
    case 4:
        $table = 'storage';
        $mid = $_GET['mid'];
        $type = $_GET['type'];
        $color = $_GET['color'];
        $writespeed = $_GET['writespeed'];
        $reedspeed = $_GET['reedspeed'];
        $capacity = $_GET['capacity'];
        $query = "update storage set " . "mid='" . $mid . "',color='" . $color . "',type='" . $type . "',writespeed=" . $writespeed .
            ",reedspeed=" . $reedspeed . ",capacity=" . $capacity .
            " where mid ='" . $mid . "'";

        break;
    default:
        break;
}



$mydb->connect();
$result = $mydb->query($query);


$respond = [["updated" => 0]];

if ($result == true) {
    $respond[0]["updated"] = 1;
}

$mydb->disconnect();

echo json_encode($respond);
return json_encode($respond);