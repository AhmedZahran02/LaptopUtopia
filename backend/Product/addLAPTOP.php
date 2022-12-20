<?php
include '../../php/dbclass.php';
$mydb = new Database();

if (
    isset($_POST['mid']) && isset($_POST['modelname']) && isset($_POST['os']) && isset($_POST['displaytype'])
    && isset($_POST['fingerprint']) && isset($_POST['wheight']) && isset($_POST['webcam']) && isset($_POST['webcamquality'])
    && isset($_POST['displayhz']) && isset($_POST['ports']) && isset($_POST['touchscreen']) && isset($_POST['cpuid'])
    && isset($_POST['gpuid']) && isset($_POST['storageid']) && isset($_POST['ramid'])
) {


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


    $mydb->connect();

    /*
      	1	mid Primary	varchar(50)
	2	modelname	varchar(255)	
	3	os	varchar(255)	
	4	displaytype	varchar(255)	
	5	fingerprint	bit(1)
	6	weight	float			
	7	webcam	bit(1)
	8	webcamquality	int(11)			
	9	displayhz	int(11)
	10	batterycapacity	int(11)
	11	ports	varchar(500)	
	12	touchscreen	bit(1)
	13	cpuid Index	varchar(50)	
	14	gpuid Index	varchar(50)	
	15	storageid Index	varchar(50)
	16	ramid Index	varchar(50)	

       * 
       */

    $query = "insert into laptop values " . "('" . $mid . "',' " . $modelname . "','" . $os . "','" . $displaytype . "'," . $fingerprint . ", " . $weight .
        "," . $webcam . "," . $webcamquality . "," . $displayhz . "," . $batterycapacity . ",' " . $ports . "'," .
        $touchscreen . ",' " . $cpuid . "',' " . $gpuid . "',' " . $storageid . "','" . $ramid . "');";

    //echo $query;
    $result = $mydb->query($query);

    $respond = [["done" => 0]];

    if ($result == true) {
        $respond[0]["done"] = 1;
    }

    $mydb->disconnect();

    echo json_encode($respond);
    return json_encode($respond);
}