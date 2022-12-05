<?php

header('Header-Type: application/json');
header('Access-Control-Allow-OriginL *');
class Database
{
    private $userName;
    private $password;
    private $hostName;
    private $database;
    private $connect;
    private $result;
    public function setUserName($userName = "root")
    {
        $this->userName = $userName;
    }
    public function setPassword($password = "")
    {
        $this->password = $password;
    }
    public function setHostName($hostName = "localhost")
    {
        $this->hostName = $hostName;
    }
    public function setDatabase($database = "")
    {
        $this->database = $database;
    }
    public  function __construct($userName = "root", $password = "", $hostName = "localhost", $database = "laptopia")
    {
        $this->setUserName($userName);
        $this->setPassword($password);
        $this->setHostName($hostName);
        $this->setDatabase($database);
    }
    public function connect()
    {
        $this->connect = mysqli_connect($this->hostName, $this->userName, $this->password, $this->database);
        if ($this->connect->connect_errno) {
            die("Failed to connect to MySQL: " . $this->connect->connect_error);
        }
    }
    public function query($query)
    {
        if ($this->result = mysqli_query($this->connect, $query)) {
            return $this->result;
        } else {
            return null;
        }
    }
    public function freeResult()
    {
        mysqli_free_result($this->result);
    }
    public function disconnect()
    {
        mysqli_close($this->connect);
    }
}