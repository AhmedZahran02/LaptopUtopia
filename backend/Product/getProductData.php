<?php
include '../../php/dbclass.php';
$mydb = new Database();

if (isset($_GET['mid']) && isset($_GET['workfield'])) {
    $mid = $_GET['mid'];
    $workField = $_GET['workfield'];
    $mydb->connect();

    if ($workField == 0) {
        $query = "SELECT lab.mid,lab.brandname,lab.body,lab.title,lab.price,lab.quantity,lab.imageurls,lab.discount,laptop.modelname,laptop.os,laptop.displaytype,laptop.fingerprint,laptop.weight,laptop.webcam,laptop.webcamquality,laptop.displayhz,laptop.batterycapacity,laptop.ports,laptop.touchscreen 
        ,c.brandname as cpubrand,cpu.subbrand as cpusubbrand,cpu.brandmodifier as cpubrandmodifier,cpu.skunumber as cpuskunumber,cpu.numberofcores as cpunumberofcores,cpu.numberofthreads as cpunumberofthreads,cpu.clockspeed as cpuclockspeed,cpu.cache as cpucache
        ,g.brandname as gpubrand,gpu.subbrand as gpusubbrand,gpu.brandmodifier as gpubrandmodifier,gpu.skunumber as gpuskunumber,gpu.vram as gpuvram,gpu.generation as gpugeneration
        ,r.brandname as rambrand,ram.generation as ramgeneration,ram.writespeed as ramwritespeed,ram.readspeed as ramreadspeed,ram.capacity as ramcapacity
        ,s.brandname as storagebrand,storage.type as storagetype,storage.color as storagecolor,storage.writespeed as storagewritespeed,storage.readspeed as storagereadspeed,storage.capacity as storagecapacity
         FROM laptop , product as lab ,product as c,product as g,product as r,product as s,cpu,gpu,ram,storage WHERE lab.mid = '" . $mid . "' " . "and laptop.mid = lab.mid and laptop.cpuid = cpu.mid and laptop.gpuid = gpu.mid and laptop.ramid = ram.mid and laptop.storageid = storage.mid and cpu.mid=c.mid and gpu.mid=g.mid and ram.mid=r.mid and storage.mid=s.mid";
    } else if ($workField == 1) {
        $query = "SELECT * FROM cpu , product WHERE product.mid = " . $mid . "and cpu.mid = product.mid";
    } else if ($workField == 2) {
        $query = "SELECT * FROM gpu , product WHERE product.mid = " . $mid  . "and gpu.mid = product.mid";
    } else if ($workField == 3) {
        $query = "SELECT * FROM ram , product WHERE product.mid = " . $mid . "and ram.mid = product.mid";
    } else if ($workField == 4) {
        $query = "SELECT * FROM storage , product WHERE product.mid = " . $mid . "and storage.mid = product.mid";
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