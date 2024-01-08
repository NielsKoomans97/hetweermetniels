<?php

$uri = $_GET['uri'];

die($uri);

$path = basename($uri);

if (file_put_contents($path, file_get_contents($uri))) {
    echo $path;
}

echo 'Download not successfull';
