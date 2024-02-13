<?php

interface ISqlClient
{
    public function Select($columns = '');
    public function Insert($values, $condition = '');
    public function Move($columns, $to, $condition = '');
    public function Delete($condition = '');
}

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
    }

    private function Execute($query)
    {
        try {
            $statement = $this->Connection->query($query);
            return $statement->execute();
        } catch (PDOException $exc) {
            return false;
        }
    }

    private function Fetch($query)
    {
        try {
            $statement = $this->Connection->query($query);
            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $exc) {
            return false;
        }
    }

    private function BuildArrayString($array, BuildMode $buildMode = BuildMode::Both)
    {
        $result = '';
        $index = 0;

        foreach ($array as $item) {
            if ($buildMode == BuildMode::Both) {
                $result .= `$item=$array[$item]`;
            } elseif ($buildMode == BuildMode::OnlyKeys) {
                $result .= `$item`;
            } else {
                $result .= `$array[$item]`;
            }

            if ($index < (count($array) - 1)) {
                $result .= ', ';
            }

            $index++;
        }

        return $result;
    }

    public function Select($columns = [], $conditions = [])
    {
        $query = "SELECT " . $this->BuildArrayString($columns, BuildMode::OnlyKeys) . " 
                FROM `" . $this->Credentials->Table . "` 
                WHERE EXISTS (" . $this->BuildArrayString($conditions) . ");";

        return $this->Fetch($query);
    }

    public function Insert($values, $conditions = [])
    {
        $query = "INSERT INTO " . $this->Credentials->Table . " (" . $this->BuildArrayString($values, BuildMode::OnlyKeys) . ") 
                VALUES (" . $this->BuildArrayString($values, BuildMode::OnlyValues) . ") 
                WHERE (" . $this->BuildArrayString($conditions) . ");";

        return $this->Execute($query);
    }

    public function Move($columns, $to, $condition = '')
    {
    }

    public function Delete($condition = '')
    {
    }
}

class SqlCredentials
{
    public string $Host;
    public string $Table;
    public string $Username;
    public string $Password;

    public function __construct($host_, $table_, $username_, $password_)
    {
        $this->Host = $host_;
        $this->Table = $table_;
        $this->Username = $username_;
        $this->Password = $password_;
    }
}
