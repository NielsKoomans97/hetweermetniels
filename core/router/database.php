<?php
function FetchPosts()
{
    $db_host = 'localhost';
    $db_name = 'hetweermetniels';
    $db_user = 'root';
    $db_pass = '';

    try {
        $conn = new PDO("mysql:host=$db_host; dbname=$db_name", $db_user, $db_pass);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

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
    $db_host = 'localhost';
    $db_name = 'hetweermetniels';
    $db_user = 'root';
    $db_pass = '';

    try {
        $conn = new PDO("mysql:host=$db_host; dbname=$db_name", $db_user, $db_pass);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

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
    $db_host = 'localhost';
    $db_name = 'hetweermetniels';
    $db_user = 'root';
    $db_pass = '';

    try {
        $conn = new PDO("mysql:host=$db_host; dbname=$db_name", $db_user, $db_pass);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $query = "SELECT * FROM `users` WHERE name=$userName;";
        $statement = $conn->query($query);
        $result = $statement->fetch();

        return $result;
    } catch (PDOException $e) {
        var_dump('<pre>', $e);
        die();
    }
}
