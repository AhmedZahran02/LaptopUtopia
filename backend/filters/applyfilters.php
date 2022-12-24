<?php
include '../../php/dbclass.php';
$mydb = new Database();


$wf = isset($_POST['workfield']) ? $_POST['workfield'] : 10;

$mydb->connect();
$respond = [];
switch ($wf) {
    case 0:
        $query = "SELECT * FROM product, laptop, cpu, gpu, ram, storage where product.workfield = " . $wf . " and product.mid=laptop.mid and laptop.cpuid=cpu.mid and laptop.gpuid=gpu.mid and laptop.ramid=ram.mid and laptop.storageid=storage.mid";
        $brand = [];
        if (isset($_POST['brand'])) {
            $brand = $_POST['brand'];
            if (count($brand) > 0) {
                $query = $query . " and brandname in (";
                foreach ($brand as $b) {
                    $query = $query . "'" . $b . "', ";
                }
                $query = rtrim($query, ", ");
                $query = $query . ")";
            }
        }

        $displaytype = [];
        if (isset($_POST['displaytype'])) {
            $displaytype = $_POST['displaytype'];
            if (count($displaytype) > 0) {
                $query = $query . " and displaytype in (";
                foreach ($displaytype as $b) {
                    $query = $query . "'" . $b . "', ";
                }
                $query = rtrim($query, ", ");
                $query = $query . ")";
            }
        }

        $webcamquality = [];
        if (isset($_POST['webcamquality'])) {
            $webcamquality = $_POST['webcamquality'];
            if (count($webcamquality) > 0) {
                $query = $query . " and webcamquality in (";
                foreach ($webcamquality as $b) {
                    $query = $query . $b . ", ";
                }
                $query = rtrim($query, ", ");
                $query = $query . ")";
            }
        }

        $os = [];
        if (isset($_POST['os'])) {
            $os = $_POST['os'];
            if (count($os) > 0) {
                $query = $query . " and os in (";
                foreach ($os as $b) {
                    $query = $query . "'" . $b . "', ";
                }
                $query = rtrim($query, ", ");
                $query = $query . ")";
            }
        }

        $displayhz = [];
        if (isset($_POST['displayhz'])) {
            $displayhz = $_POST['displayhz'];
            if (count($displayhz) > 0) {
                $query = $query . " and displayhz in (";
                foreach ($displayhz as $b) {
                    $query = $query . $b . ", ";
                }
                $query = rtrim($query, ", ");
                $query = $query . ")";
            }
        }

        $batterycapacity = [];
        if (isset($_POST['batterycapacity'])) {
            $batterycapacity = $_POST['batterycapacity'];
            if (count($batterycapacity) > 0) {
                $query = $query . " and batterycapacity in (";
                foreach ($batterycapacity as $b) {
                    $query = $query . $b . ", ";
                }
                $query = rtrim($query, ", ");
                $query = $query . ")";
            }
        }

        $cpuname = [];

        if (isset($_POST['cpuname'])) {
            $cpuname = $_POST['cpuname'];
            if (count($cpuname) > 0) {

                $query = $query . " and cpu.subbrand in (";
                foreach ($cpuname as $b) {
                    $ar = explode(" ", $b);
                    $query = $query . "'" . $ar[0] . "', ";
                }
                $query = rtrim($query, ", ");
                $query = $query . ")";

                $query = $query . " and cpu.brandmodifier in (";
                foreach ($cpuname as $b) {
                    $ar = explode(" ", $b);
                    $query = $query . "'" . $ar[1] . "', ";
                }
                $query = rtrim($query, ", ");
                $query = $query . ")";

                $query = $query . " and cpu.skunumber in (";
                foreach ($cpuname as $b) {
                    $ar = explode(" ", $b);
                    $query = $query . "'" . $ar[2] . "', ";
                }
                $query = rtrim($query, ", ");
                $query = $query . ")";
            }
        }

        $gpuname = [];

        if (isset($_POST['gpuname'])) {
            $gpuname = $_POST['gpuname'];
            if (count($gpuname) > 0) {

                $query = $query . " and gpu.subbrand in (";
                foreach ($gpuname as $b) {
                    $ar = explode(" ", $b);
                    $query = $query . "'" . $ar[0] . "', ";
                }
                $query = rtrim($query, ", ");
                $query = $query . ")";

                $query = $query . " and gpu.brandmodifier in (";
                foreach ($gpuname as $b) {
                    $ar = explode(" ", $b);
                    $query = $query . "'" . $ar[1] . "', ";
                }
                $query = rtrim($query, ", ");
                $query = $query . ")";

                $query = $query . " and gpu.skunumber in (";
                foreach ($gpuname as $b) {
                    $ar = explode(" ", $b);
                    $query = $query . "'" . $ar[2] . "', ";
                }
                $query = rtrim($query, ", ");
                $query = $query . ")";
            }
        }

        $ramcapacity = [];
        if (isset($_POST['ramcapacity'])) {
            $ramcapacity = $_POST['ramcapacity'];
            if (count($ramcapacity) > 0) {
                $query = $query . " and ram.capacity in (";
                foreach ($ramcapacity as $b) {
                    $query = $query . $b . ", ";
                }
                $query = rtrim($query, ", ");
                $query = $query . ")";
            }
        }

        $ramgeneration = [];
        if (isset($_POST['ramgeneration'])) {
            $ramgeneration = $_POST['ramgeneration'];
            if (count($ramgeneration) > 0) {
                $query = $query . " and ram.generation in (";
                foreach ($ramgeneration as $b) {
                    $query = $query . "'" . $b . "', ";
                }
                $query = rtrim($query, ", ");
                $query = $query . ")";
            }
        }

        $storagecapacity = [];
        if (isset($_POST['storagecapacity'])) {
            $storagecapacity = $_POST['storagecapacity'];
            if (count($storagecapacity) > 0) {
                $query = $query . " and storage.capacity in (";
                foreach ($storagecapacity as $b) {
                    $query = $query . $b . ", ";
                }
                $query = rtrim($query, ", ");
                $query = $query . ")";
            }
        }

        echo $query;
        break;
    case 1:
        $query = "SELECT * FROM product, cpu where product.workfield = " . $wf . " and product.mid=cpu.mid";
        $brand = [];
        if (isset($_POST['brand'])) {
            $brand = $_POST['brand'];
            if (count($brand) > 0) {
                $query = $query . " and brandname in (";
                foreach ($brand as $b) {
                    $query = $query . "'" . $b . "', ";
                }
                $query = rtrim($query, ", ");
                $query = $query . ")";
            }
        }

        $numberofcores = [];
        if (isset($_POST['numberofcores'])) {
            $numberofcores = $_POST['numberofcores'];
            if (count($numberofcores) > 0) {
                $query = $query . " and numberofcores in (";
                foreach ($numberofcores as $b) {
                    $query = $query . $b . ", ";
                }
                $query = rtrim($query, ", ");
                $query = $query . ")";
            }
        }

        $numberofthreads = [];
        if (isset($_POST['numberofthreads'])) {
            $numberofthreads = $_POST['numberofthreads'];
            if (count($numberofthreads) > 0) {
                $query = $query . " and numberofthreads in (";
                foreach ($numberofthreads as $b) {
                    $query = $query . $b . ", ";
                }
                $query = rtrim($query, ", ");
                $query = $query . ")";
            }
        }

        $clockspeed = [];
        if (isset($_POST['clockspeed'])) {
            $clockspeed = $_POST['clockspeed'];
            if (count($clockspeed) > 0) {
                $query = $query . " and clockspeed in (";
                foreach ($clockspeed as $b) {
                    $query = $query . $b . ", ";
                }
                $query = rtrim($query, ", ");
                $query = $query . ")";
            }
        }

        $cache = [];
        if (isset($_POST['cache'])) {
            $cache = $_POST['cache'];
            if (count($cache) > 0) {
                $query = $query . " and cache in (";
                foreach ($cache as $b) {
                    $query = $query . $b . ", ";
                }
                $query = rtrim($query, ", ");
                $query = $query . ")";
            }
        }

        $cpuname = [];

        if (isset($_POST['cpuname'])) {
            $cpuname = $_POST['cpuname'];
            if (count($cpuname) > 0) {

                $query = $query . " and subbrand in (";
                foreach ($cpuname as $b) {
                    $ar = explode(" ", $b);
                    $query = $query . "'" . $ar[0] . "', ";
                }
                $query = rtrim($query, ", ");
                $query = $query . ")";

                $query = $query . " and brandmodifier in (";
                foreach ($cpuname as $b) {
                    $ar = explode(" ", $b);
                    $query = $query . "'" . $ar[1] . "', ";
                }
                $query = rtrim($query, ", ");
                $query = $query . ")";

                $query = $query . " and skunumber in (";
                foreach ($cpuname as $b) {
                    $ar = explode(" ", $b);
                    $query = $query . "'" . $ar[2] . "', ";
                }
                $query = rtrim($query, ", ");
                $query = $query . ")";
            }
        }
        echo $query;
        break;
    case 2:
        $query = "SELECT * FROM product, gpu where product.workfield = " . $wf . " and product.mid=gpu.mid";
        $brand = [];
        if (isset($_POST['brand'])) {
            $brand = $_POST['brand'];
            if (count($brand) > 0) {
                $query = $query . " and brandname in (";
                foreach ($brand as $b) {
                    $query = $query . "'" . $b . "', ";
                }
                $query = rtrim($query, ", ");
                $query = $query . ")";
            }
        }

        $generation = [];
        if (isset($_POST['generation'])) {
            $generation = $_POST['generation'];
            if (count($generation) > 0) {
                $query = $query . " and generation in (";
                foreach ($generation as $b) {
                    $query = $query . "'" . $b . "', ";
                }
                $query = rtrim($query, ", ");
                $query = $query . ")";
            }
        }

        $vram = [];
        if (isset($_POST['vram'])) {
            $vram = $_POST['vram'];
            if (count($vram) > 0) {
                $query = $query . " and vram in (";
                foreach ($vram as $b) {
                    $query = $query . $b . ", ";
                }
                $query = rtrim($query, ", ");
                $query = $query . ")";
            }
        }

        $gpuname = [];

        if (isset($_POST['gpuname'])) {
            $gpuname = $_POST['gpuname'];
            if (count($gpuname) > 0) {

                $query = $query . " and subbrand in (";
                foreach ($gpuname as $b) {
                    $ar = explode(" ", $b);
                    $query = $query . "'" . $ar[0] . "', ";
                }
                $query = rtrim($query, ", ");
                $query = $query . ")";

                $query = $query . " and brandmodifier in (";
                foreach ($gpuname as $b) {
                    $ar = explode(" ", $b);
                    $query = $query . "'" . $ar[1] . "', ";
                }
                $query = rtrim($query, ", ");
                $query = $query . ")";

                $query = $query . " and skunumber in (";
                foreach ($gpuname as $b) {
                    $ar = explode(" ", $b);
                    $query = $query . "'" . $ar[2] . "', ";
                }
                $query = rtrim($query, ", ");
                $query = $query . ")";
            }
        }
        echo $query;
        break;
    case 3:
        $query = "SELECT * FROM product, ram where product.workfield = " . $wf . " and product.mid=ram.mid";
        $brand = [];
        if (isset($_POST['brand'])) {
            $brand = $_POST['brand'];
            if (count($brand) > 0) {
                $query = $query . " and brandname in (";
                foreach ($brand as $b) {
                    $query = $query . "'" . $b . "', ";
                }
                $query = rtrim($query, ", ");
                $query = $query . ")";
            }
        }

        $generation = [];
        if (isset($_POST['generation'])) {
            $generation = $_POST['generation'];
            if (count($generation) > 0) {
                $query = $query . " and generation in (";
                foreach ($generation as $b) {
                    $query = $query . "'" . $b . "', ";
                }
                $query = rtrim($query, ", ");
                $query = $query . ")";
            }
        }

        $writespeed = [];
        if (isset($_POST['writespeed'])) {
            $writespeed = $_POST['writespeed'];
            if (count($writespeed) > 0) {
                $query = $query . " and writespeed in (";
                foreach ($writespeed as $b) {
                    $query = $query . $b . ", ";
                }
                $query = rtrim($query, ", ");
                $query = $query . ")";
            }
        }

        $readspeed = [];
        if (isset($_POST['readspeed'])) {
            $readspeed = $_POST['readspeed'];
            if (count($readspeed) > 0) {
                $query = $query . " and readspeed in (";
                foreach ($readspeed as $b) {
                    $query = $query . $b . ", ";
                }
                $query = rtrim($query, ", ");
                $query = $query . ")";
            }
        }

        $capacity = [];
        if (isset($_POST['capacity'])) {
            $capacity = $_POST['capacity'];
            if (count($capacity) > 0) {
                $query = $query . " and capacity in (";
                foreach ($capacity as $b) {
                    $query = $query . $b . ", ";
                }
                $query = rtrim($query, ", ");
                $query = $query . ")";
            }
        }
        echo $query;
        break;
    case 4:
        $query = "SELECT * FROM product, storage where product.workfield = " . $wf . " and product.mid=storage.mid";
        $brand = [];
        if (isset($_POST['brand'])) {
            $brand = $_POST['brand'];
            if (count($brand) > 0) {
                $query = $query . " and brandname in (";
                foreach ($brand as $b) {
                    $query = $query . "'" . $b . "', ";
                }
                $query = rtrim($query, ", ");
                $query = $query . ")";
            }
        }

        $color = [];
        if (isset($_POST['color'])) {
            $color = $_POST['color'];
            if (count($color) > 0) {
                $query = $query . " and color in (";
                foreach ($color as $b) {
                    $query = $query . "'" . $b . "', ";
                }
                $query = rtrim($query, ", ");
                $query = $query . ")";
            }
        }

        $writespeed = [];
        if (isset($_POST['writespeed'])) {
            $writespeed = $_POST['writespeed'];
            if (count($writespeed) > 0) {
                $query = $query . " and writespeed in (";
                foreach ($writespeed as $b) {
                    $query = $query . $b . ", ";
                }
                $query = rtrim($query, ", ");
                $query = $query . ")";
            }
        }

        $readspeed = [];
        if (isset($_POST['readspeed'])) {
            $readspeed = $_POST['readspeed'];
            if (count($readspeed) > 0) {
                $query = $query . " and readspeed in (";
                foreach ($readspeed as $b) {
                    $query = $query . $b . ", ";
                }
                $query = rtrim($query, ", ");
                $query = $query . ")";
            }
        }

        $capacity = [];
        if (isset($_POST['capacity'])) {
            $capacity = $_POST['capacity'];
            if (count($capacity) > 0) {
                $query = $query . " and capacity in (";
                foreach ($capacity as $b) {
                    $query = $query . $b . ", ";
                }
                $query = rtrim($query, ", ");
                $query = $query . ")";
            }
        }

        $type = [];
        if (isset($_POST['type'])) {
            $type = $_POST['type'];
            if (count($type) > 0) {
                $query = $query . " and type in (";
                foreach ($type as $b) {
                    $query = $query . "'" . $b . "', ";
                }
                $query = rtrim($query, ", ");
                $query = $query . ");";
            }
        }
        echo $query;
        break;
    default:
        $respond[0]["Found"] = 0;
        break;
}

$mydb->freeResult();
$mydb->disconnect();

// echo json_encode($respond);
return json_encode($respond);