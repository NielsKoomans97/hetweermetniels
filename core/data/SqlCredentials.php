<?php

class SqlCredentials
{
    public string $Host;
    public string $DatabaseName;
    public string $Username;
    public string $Password;

    public function __construct($host_, $databaseName_, $username_, $password_)
    {
        $this->Host = $host_;
        $this->DatabaseName = $databaseName_;
        $this->Username = $username_;
        $this->Password = $password_;
    }
}
