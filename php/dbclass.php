<?php

header('Header-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Origin: *');
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
    public  function __construct($userName = "laptopia", $password = "laptopia", $hostName = "db4free.net:3306", $database = "laptopia")
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
        return $this->result = mysqli_query($this->connect, $query);
    }
    public function freeResult()
    {
        if ($this->result != null) {
            mysqli_free_result($this->result);
        }
    }
    public function disconnect()
    {
        mysqli_close($this->connect);
    }
}