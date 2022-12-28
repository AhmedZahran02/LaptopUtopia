<?php
include '../../php/dbclass.php';
$mydb = new Database();


$wf = isset($_POST['workfield']) ? $_POST['workfield'] : 0;
$query = '';
switch ($wf) {
    case 0:
        $table = 'laptop';
        $mid = $_POST['mid'];
        $modelname = $_POST['modelname'];
        $os = $_POST['os'];
        $displaytype = $_POST['displaytype'];
        $fingerprint = $_POST['fingerprint'];
        $weight = $_POST['wheight'];
        $webcam = $_POST['webcam'];
        $webcamquality = $_POST['webcamquality'];
        $displayhz = $_POST['displayhz'];
        $batterycapacity = $_POST['ports'];
        $ports = $_POST['ports'];
        $touchscreen = $_POST['touchscreen'];
        $cpuid = $_POST['cpuid'];
        $gpuid = $_POST['gpuid'];
        $storageid = $_POST['storageid'];
        $ramid    = $_POST['ramid'];

        $query = "update laptop set " . "mid='" . $mid . "',modelname='" . $modelname . "',os='" . $os . "',displaytype='" . $displaytype .
            "',fingerprint=" . $fingerprint . ", weight=" . $weight .
            ",webcam=" . $webcam . ",webcamquality=" . $webcamquality . ",displayhz=" . $displayhz . ",batterycapacity=" . $batterycapacity . ",ports='" . $ports .
            "',touchscreen=" . $touchscreen . ",cpuid='" . $cpuid . "',gpuid='" . $gpuid . "',storageid='" . $storageid . "',ramid='" . $ramid .
            " where mid ='" . $mid . "'";

        break;
    case 1:
        $table = 'cpu';
        $mid = $_POST['mid'];
        $subbrand = $_POST['subbrand'];
        $brandmodifier = $_POST['brandmodifier'];
        $skunumber = $_POST['skunumber'];
        $numberofcores = $_POST['numberofcores'];
        $numberofthreads = $_POST['numberofthreads'];
        $clockspeed = $_POST['clockspeed'];
        $cache = $_POST['cache'];

        $query = "update cpu set " . "mid='" . $mid . "', subbrand='" . $subbrand . "', brandmodifier='" . $brandmodifier .
            "', skunumber='" . $skunumber . "', numberofcores=" . $numberofcores .
            ",numberofthreads=" . $numberofthreads . ",clockspeed=" . $clockspeed . ",cache=" . $cache . " " .
            "where mid ='" . $mid . "'";

        break;
    case 2:
        $table = 'gpu';
        $mid = $_POST['mid'];
        $subbrand = $_POST['subbrand'];
        $brandmodifier = $_POST['brandmodifier'];
        $skunumber = $_POST['skunumber'];
        $vram = $_POST['vram'];
        $generation = $_POST['generation'];

        $query = "update gpu set " . "mid='" . $mid . "',subbrand='" . $subbrand . "',brandmodifier='" . $brandmodifier .
            "',skunumber='" . $skunumber . "',generation='" . $generation .
            "',vram=" . $vram .
            " where mid ='" . $mid . "'";

        break;
    case 3:
        $table = 'ram';
        $mid = $_POST['mid'];
        $generation = $_POST['generation'];
        $writespeed = $_POST['writespeed'];
        $reedspeed = $_POST['reedspeed'];
        $capacity = $_POST['capaciry'];

        $query = "update ram set " . "mid='" . $mid . "',generation='" . $generation . "',writespeed=" . $writespeed .
            ",reedspeed=" . $reedspeed . ",capacity=" . $capacity .
            " where mid ='" . $mid . "'";


        break;
    case 4:
        $table = 'storage';
        $mid = $_POST['mid'];
        $type = $_POST['type'];
        $color = $_POST['color'];
        $writespeed = $_POST['writespeed'];
        $reedspeed = $_POST['reedspeed'];
        $capacity = $_POST['capacity'];
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