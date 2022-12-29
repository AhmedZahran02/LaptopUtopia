<?php
include '../../php/dbclass.php';
$mydb = new Database();

if (isset($_POST['mid']) && isset($_POST['workfield'])) {
    $mid = $_POST['mid'];
    $workField = $_POST['workfield'];
    $mydb->connect();


    if ($workField == 0) {
        $query = "SELECT lab.mid as `MID`,lab.brandname as `Brand Name`,laptop.modelname as `Model Name`,laptop.os as `OS`,laptop.displaytype as `Display Type`,laptop.fingerprint as `Fingerprint`,laptop.weight as `Weight`,laptop.webcam as `Webcam`,laptop.webcamquality as `Webcam Quality`,laptop.displayhz as `Display HZ`,laptop.batterycapacity as `Battery Capacity`,laptop.ports as `Ports`,laptop.touchscreen as `Touch Screen` 
            ,c.brandname  as `CPU Brand`,cpu.subbrand  as `CPU Sub Brand`,cpu.brandmodifier  as `CPU Brand Modifier`,cpu.skunumber as `CPU SKU Number`,cpu.numberofcores  as `CPU Number of Cores`,cpu.numberofthreads  as `CPU Number of Threads`,cpu.clockspeed  as `CPU Clock Speed`,cpu.cache  as `CPU Cache`
            ,g.brandname  as `GPU Brand`,gpu.subbrand  as `GPU Sub Brand`,gpu.brandmodifier as `GPU Brand Modifier`,gpu.skunumber  as `GPU SKU Number`,gpu.vram  as `GPU Vram`,gpu.generation as `GPU Generation`
            ,r.brandname  as `RAM Brand`,ram.generation  as `RAM Generation`,ram.writespeed  as `RAM Write Speed`,ram.readspeed  as `RAM Read Speed`,ram.capacity  as `RAM Capacity`
            ,s.brandname  as `Storage Capacity`,storage.type  as `Storage Type`,storage.color  as `Storage Type`,storage.writespeed  as `Storage Write Speed`,storage.readspeed  as `Storage Read Speed`,storage.capacity  as `Storage Capacity`
            ,lab.body,lab.title,lab.price,lab.quantity,lab.imageurls,lab.discount 
             FROM laptop , product as lab ,product as c,product as g,product as r,product as s,cpu,gpu,ram,storage WHERE lab.mid in (";
        $array = $_POST['mid'];
        foreach ($array as $value) {
            $query = $query . "'" . $value . "',";
        }
        $query = rtrim($query, ", ");
        $query = $query . ")";
        $query = $query . " " . "and laptop.mid = lab.mid and laptop.cpuid = cpu.mid and laptop.gpuid = gpu.mid and laptop.ramid = ram.mid and laptop.storageid = storage.mid and cpu.mid=c.mid and gpu.mid=g.mid and ram.mid=r.mid and storage.mid=s.mid";
    } else if ($workField == 1) {
        $query = "SELECT  cpu.mid  as `MID`,c.brandname  as `Brand`,cpu.subbrand  as `Sub Brand`,cpu.brandmodifier  as `Brand Modifier`,cpu.skunumber as `SKU Number`,cpu.numberofcores  as `Number of Cores`,cpu.numberofthreads  as `Number of Threads`,cpu.clockspeed  as `Clock Speed`,cpu.cache  as `Cache`,c.body,c.title,c.price,c.quantity,c.imageurls,c.discount FROM cpu , product as c WHERE c.mid in (";
        $array = $_POST['mid'];
        foreach ($array as $value) {
            $query = $query . "'" . $value . "',";
        }
        $query = rtrim($query, ", ");
        $query = $query . ")";
        $query = $query . " and cpu.mid = c.mid";
    } else if ($workField == 2) {
        $query = "SELECT gpu.mid  as `MID`,g.brandname  as `Brand`,gpu.subbrand  as `Sub Brand`,gpu.brandmodifier  as `Brand Modifier`,gpu.skunumber as `SKU Number`,gpu.generation  as `Generation`,gpu.vram  as `Vram`,g.body,g.title,g.price,g.quantity,g.imageurls,g.discount FROM gpu , product as g WHERE g.mid in (";
        $array = $_POST['mid'];
        foreach ($array as $value) {
            $query = $query . "'" . $value . "',";
        }
        $query = rtrim($query, ", ");
        $query = $query . ")";
        $query = $query . " and gpu.mid = g.mid";
    } else if ($workField == 3) {
        $query = "SELECT ram.mid  as `MID`,r.brandname  as `Brand`,ram.generation  as `Generation`,ram.writespeed  as `Write Speed`,ram.readspeed  as `Read Speed`,ram.capacity  as `Capacity`,r.body,r.title,r.price,r.quantity,r.imageurls,r.discount FROM ram , product as r WHERE r.mid in (";
        $array = $_POST['mid'];
        foreach ($array as $value) {
            $query = $query . "'" . $value . "',";
        }
        $query = rtrim($query, ", ");
        $query = $query . ")";
        $query = $query . " and ram.mid = r.mid";
    } else if ($workField == 4) {
        $query = "SELECT storage.mid  as `MID`,s.brandname  as `Brand`,storage.type  as `Type`,storage.writespeed  as `Write Speed`,storage.readspeed  as `Read Speed`,storage.capacity  as `Capacity`,storage.color  as `Color`,s.body,s.title,s.price,s.quantity,s.imageurls,s.discount FROM storage , product as s WHERE s.mid in (";
        $array = $_POST['mid'];
        foreach ($array as $value) {
            $query = $query . "'" . $value . "',";
        }
        $query = rtrim($query, ", ");
        $query = $query . ")";
        $query = $query . " and storage.mid = s.mid";
    }

    // echo $query;
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