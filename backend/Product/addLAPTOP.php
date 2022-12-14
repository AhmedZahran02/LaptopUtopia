<?php
include '../../php/dbclass.php';
$mydb = new Database();

if (isset($_GET['mid']) && isset($_GET['modelname'])&& isset($_GET['os'])&& isset($_GET['displaytype'])
&& isset($_GET['fingerprint'])&& isset($_GET['wheight'])&& isset($_GET['webcam'])&& isset($_GET['webcamquality'])
&& isset($_GET['displayhz'])&& isset($_GET['ports'])&& isset($_GET['touchscreen'])&& isset($_GET['cpuid'])
&& isset($_GET['gpuid'])&& isset($_GET['storageid'])&& isset($_GET['ramid'])) {
    

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
    $ramid	= $_GET['ramid'];
    

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

    $query = "insert into laptop values "."('".$mid."',' ".$modelname."','".$os."','".$displaytype."',".$fingerprint.", ".$weight.
    ",".$webcam.",".$webcamquality.",".$displayhz.",".$batterycapacity.",' ".$ports."',".
    $touchscreen.",' ".$cpuid."',' ".$gpuid."',' ".$storageid."','".$ramid."');";

    //echo $query;
    $result = $mydb->query($query);

    $respond = [];

    while ($row = $result->fetch_assoc()) {
        array_push($respond, $row);
    }

    $respond = json_encode($respond);

    echo $respond;
    $mydb->freeResult();
    $mydb->disconnect();

    return $respond;
}