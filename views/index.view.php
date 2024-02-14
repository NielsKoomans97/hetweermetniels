<?php

$sqlCreds = new SqlCredentials('localhost', 'hetweermetniels', 'root', '');
$sqlClient = new SqlClient($sqlCreds);

$posts = $sqlClient->Select('registrations');

var_dump($posts);
