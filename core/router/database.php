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

function randHash($len = 64)
{
    return substr(hash('sha256', openssl_random_pseudo_bytes(20)), -$len);
}

function Register($userName, $email, $passWord)
{
    try {
        $conn = Connect();

        $hashedPassword = substr(password_hash($passWord, 'argon2i'), 0, 32);
        $registrationCode = randHash(16);
        $registrationTime = date('Y-m-d H:m:s');

        $query = "INSERT INTO `registrations` (`id`, `username`, `email`, `password`, `registration_code`, `registration_time`) VALUES (NULL,'" . $userName . "','" . $email . "','" . $hashedPassword . "','" . $registrationCode . "','" . $registrationTime . "');";
        $statement = $conn->query($query);
        $statement->execute();

        $emailContent = 'Dit is jouw activatie-email. Klik op de onderstaande link om de registratie te voltooien. <a href="http://hetweermetniels.test/register/process/'.$registrationCode.'"></a>';

        mail($email, 'Activatielink Hetweermetniels', $emailContent);
    } catch (PDOException $e) {
        var_dump('<pre>', $e);
        die();
    }
}

function Activate($registrationCode)
{
    try {
        $conn = Connect();

        $query = "INSERT INTO `users` (`username`, `password`, `email`) SELECT username, email, password FROM `registrations` WHERE registration_code='".$registrationCode."';";
        $statement = $conn->query($query);
        $statement->execute();

        header('Location: /');
    } catch (PDOException $e) {
        var_dump('<pre>', $e);
        die();
    }
}
