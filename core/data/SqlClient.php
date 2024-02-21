<?php

require_once 'ISqlClient.php';
require_once 'SqlCredentials.php';

enum BuildMode
{
    case OnlyKeys;
    case OnlyValues;
    case Both;
}

class SqlClient implements ISqlClient
{
    public SqlCredentials $Credentials;
    public PDO $Connection;

    public function __construct($credentials_)
    {
        $this->Credentials = $credentials_;

        $this->Connection = new PDO("mysql:host=" . $this->Credentials->Host . "; dbname=" . $this->Credentials->DatabaseName, $this->Credentials->Username, $this->Credentials->Password);
    }

    private function Execute($query)
    {
        try {
            $statement = $this->Connection->query($query);
            return $statement->execute();
        } catch (PDOException $exc) {
            echo $exc;
            return false;
        }
    }

    private function Fetch($query)
    {
        try {
            $statement = $this->Connection->query($query);
            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $exc) {
            echo $exc;
            return false;
        }
    }

    private function BuildArrayString($array, BuildMode $buildMode = BuildMode::Both)
    {
        $result = '';
        $index = 0;

        foreach ($array as $key => $item) {
            if ($buildMode == BuildMode::Both) {
                $result .= $key . '=\'' . $item . '\'';
            } elseif ($buildMode == BuildMode::OnlyKeys) {
                $result .= $key;
            } else {
                $result .= $item;
            }

            if ($index < (count($array) - 1)) {
                $result .= ', ';
            }

            $index++;
        }

        return $result;
    }

    public function Select($table, $columns = [], $conditions = [])
    {
        $query = "SELECT " . (isset($columns) && !empty($columns) ? $this->BuildArrayString($columns, BuildMode::OnlyValues) : '*') . "
                FROM `" . $table . "`
                " . (!empty($conditions) ? "WHERE " . $this->BuildArrayString($conditions, BuildMode::OnlyValues) . ";" : ";");

        return $this->Fetch($query);
    }

    public function Insert($table, $values, $conditions = [])
    {
        $query = "INSERT INTO " . $table . " (" . $this->BuildArrayString($values, BuildMode::OnlyKeys) . ")
                VALUES (" . $this->BuildArrayString($values, BuildMode::OnlyValues) . ")
                " . (!empty($conditions) ? "WHERE " . $this->BuildArrayString($conditions, BuildMode::OnlyValues) . ";" : ";");

        return $this->Execute($query);
    }

    public function Move($columns, $to, $condition = '')
    {
    }

    public function Delete($condition = '')
    {
    }
}
