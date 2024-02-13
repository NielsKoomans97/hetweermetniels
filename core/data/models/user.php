<?php

require_once 'object.php';

class User extends SqlObject
{
    public $id;
    public $username;
    public $password;
    public $email;

    public function Verify($pass)
    {
        return password_verify($pass, $this->password);
    }

    public function __construct($userObj)
    {

        $this->id = $userObj['id'];
        $this->username = $userObj['username'];
        $this->password = $userObj['password'];
        $this->email = $userObj['email'];
    }
}

?>
