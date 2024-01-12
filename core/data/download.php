<?php

$time = json_decode($_POST['time']);
$type = $_POST['type'];

if (!empty($time)) {
    $uri = $time->url;
    $base_path = $_SERVER['DOCUMENT_ROOT'] . '/data/' . $type;

    if (!is_dir($base_path)){
        mkdir($base_path);
    }
    else{
        $files = scandir($base_path);
        foreach($files as $file){
            if (is_file($file)){
                unlink($file);
            }
        }
    }

    $path = $base_path . '/' . basename($uri);

    if (file_put_contents($path, file_get_contents($uri))) {
        echo '{"time":"' . $time->timestamp . '","path":"' . $path . '"}';
    } else {
        echo '{\"message\":\"Er was een fout opgetreden tijdens het downloaden van een radarbeeld\",\"object\":\"' . var_dump($_POST) . '\"}';
    }
} else {
    echo '{\"message\":\"Er was een fout opgetreden tijdens het downloaden van een radarbeeld\",\"object\":\"' . var_dump($_POST) . '\"}';

    echo var_dump($time);
}
