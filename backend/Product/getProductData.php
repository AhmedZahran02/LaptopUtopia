<?php
include '../../php/dbclass.php';
$mydb = new Database();

if (isset($_GET['mid']) && isset($_GET['workfield'])) {
    $mid = $_GET['mid'];
    $workField = $_GET['workfield'];
    $mydb->connect();

    if ($workField == 0) {
        $query = "SELECT lab.mid as `MID`,lab.brandname as `Brand Name`,lab.body as `Body`,lab.title as `Title`,lab.price as `Price`,lab.quantity as `Quantity`,lab.imageurls,lab.discount,laptop.modelname as `Model Name`,laptop.os as `OS`,laptop.displaytype as `Display Type`,laptop.fingerprint as `Fingerprint`,laptop.weight as `Weight`,laptop.webcam as `Webcam`,laptop.webcamquality as `Webcam Quality`,laptop.displayhz as `Display HZ`,laptop.batterycapacity as `Battery Capacity`,laptop.ports as `Ports`,laptop.touchscreen as `Touch Screen` 
        ,c.brandname  as `CPU Brand`,cpu.subbrand  as `CPU Sub Brand`,cpu.brandmodifier  as `CPU Brand Modifier`,cpu.skunumber as `CPU SKU Number`,cpu.numberofcores  as `CPU Number of Cores`,cpu.numberofthreads  as `CPU Number of Threads`,cpu.clockspeed  as `CPU Clock Speed`,cpu.cache  as `CPU Cache`
        ,g.brandname  as `GPU Brand`,gpu.subbrand  as `GPU Sub Brand`,gpu.brandmodifier as `GPU Brand Modifier`,gpu.skunumber  as `GPU SKU Number`,gpu.vram  as `GPU Vram`,gpu.generation as `GPU Generation`
        ,r.brandname  as `RAM Brand`,ram.generation  as `RAM Generation`,ram.writespeed  as `RAM Write Speed`,ram.readspeed  as `RAM Read Speed`,ram.capacity  as `RAM Capacity`
        ,s.brandname  as `Storage Capacity`,storage.type  as `Storage Type`,storage.color  as `Storage Type`,storage.writespeed  as `Storage Write Speed`,storage.readspeed  as `Storage Read Speed`,storage.capacity  as `Storage Capacity`
         FROM laptop , product as lab ,product as c,product as g,product as r,product as s,cpu,gpu,ram,storage WHERE lab.mid = '" . $mid . "' " . "and laptop.mid = lab.mid and laptop.cpuid = cpu.mid and laptop.gpuid = gpu.mid and laptop.ramid = ram.mid and laptop.storageid = storage.mid and cpu.mid=c.mid and gpu.mid=g.mid and ram.mid=r.mid and storage.mid=s.mid";
    } else if ($workField == 1) {
        $query = "SELECT * FROM cpu , product WHERE product.mid = '" . $mid . "' and cpu.mid = product.mid";
    } else if ($workField == 2) {
        $query = "SELECT * FROM gpu , product WHERE product.mid = '" . $mid  . "' and gpu.mid = product.mid";
    } else if ($workField == 3) {
        $query = "SELECT * FROM ram , product WHERE product.mid = '" . $mid . "' and ram.mid = product.mid";
    } else if ($workField == 4) {
        $query = "SELECT * FROM storage , product WHERE product.mid = '" . $mid . "' and storage.mid = product.mid";
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