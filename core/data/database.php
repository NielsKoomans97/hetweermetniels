<?php
require_once 'models/user.php';

class Database
{
    public $host;
    public $prefix;
    public $username;
    public $password;

    public PDO $conn;
    public Table $Users;
    public Table $Posts;

    public function __construct($host_, $prefix_, $username_, $password_)
    {
        $this->host = $host_;
        $this->prefix = $prefix_;
        $this->username = $username_;
        $this->password = $password_;

        $this->conn = new PDO("mysql:host=$this->host; dbname=$this->prefix", $this->username, $this->password);
        $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $this->Users = new Table($this->conn, 'users');
        $this->Posts = new Table($this->conn, 'posts');
    }
}

class Table
{
    public $conn;

    public $tableName;

    public function  __construct($conn_, $tableName_)
    {
        $this->conn = $conn_;
        $this->tableName = $tableName_;
    }
    public function list()
    {
        $query = "SELECT * FROM `" . $this->tableName . "`";
        $statement = $this->conn->query($query);
        $result = $statement->fetchAll(PDO::FETCH_ASSOC);

        $users = [];
        foreach ($result as $item) {
            $users[] = (User)new SqlObject($item);
        }

        return $users;
    }

    public function update($condition, $params)
    {
        $query = "UPDATE `" . $this->tableName . "` SET " . $this->buildParamString($params) . " WHERE " . $condition . "";
    }

    function buildParamString($params)
    {
        $paramString = '';
        $index = 0;

        foreach ($params as $param) {
            $paramString .= `$param=$params[$param]`;

            if ($index != count($params)) {
                $paramString .= ', ';
            }

            $index++;
        }

        return $paramString;
    }
}
