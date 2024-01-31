<?php
function Connect()
{
    $db_host = 'localhost';
    $db_name = 'hetweermetniels';
    $db_user = 'root';
    $db_pass = '';

    $conn = new PDO("mysql:host=$db_host; dbname=$db_name", $db_user, $db_pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    return $conn;
}

function FetchPosts()
{
    try {
        $conn = Connect();

        $query = "SELECT * FROM `posts`;";
        $statement = $conn->query($query);
        $result = $statement->fetchAll(PDO::FETCH_ASSOC);

        return $result;
    } catch (PDOException $e) {
        var_dump('<pre>', $e);
        die();
    }
}

function FetchPost($id)
{
    try {
        $conn = Connect();

        $query = "SELECT * FROM `posts` WHERE id=$id;";
        $statement = $conn->query($query);
        $result = $statement->fetchAll(PDO::FETCH_ASSOC);

        return $result;
    } catch (PDOException $e) {
        var_dump('<pre>', $e);
        die();
    }
}

function Login($userName, $passWord)
{
    try {
        $conn = Connect();

        $query = "SELECT * FROM `users` WHERE name=$userName;";
        $statement = $conn->query($query);
        $result = $statement->fetch();

        $password = $result['pass'];
        if (password_verify($passWord, $password)) {
            return $result;
        } else {
            return false;
        }
    } catch (PDOException $e) {
        var_dump('<pre>', $e);
        die();
    }
}

function SendRegistrationMail($userName){
    
}

function Register($userName, $email, $passWord)
{
    
}