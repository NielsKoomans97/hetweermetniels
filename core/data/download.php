<?php

$type = $_POST['type'];
$url = $_POST['url'];

$root = $_SERVER['DOCUMENT_ROOT'];
$base_path = $root . '/data/' . $type;
$localDoc_path = $base_path . '/' . $type . '.json';

if (is_dir($base_path)) {
    $files = glob($base_path . '/*');
    foreach ($files as $file) {
        if (is_file($file)) {
            unlink($file);
        }
    }
} else {
    mkdir($base_path);
}

$doc = file_get_contents($url);
$json = json_decode($doc);
$localDoc = '[';

if (str_contains($url, 'meteoplaza')) {
    $base_url = 'https://cluster.api.meteoplaza.com/v3/nowcast/tiles/' . $type;
    $index = 0;

    foreach ($json as $time) {
        $timeUrl = $base_url . '/' . $time->layername;
        $localPath = $base_path . '/' . $time->layername . '.png';
        $externalPath = '/data/' . $type . '/' . $time->layername . '.png';
        $externalPathNotFound = '/data/Static/notfound.png';

        $timeJson = '';

        if (file_put_contents($localPath, file_get_contents($timeUrl))) {
            $timeJson = '{"time":"' . $time->timestamp . '","path":"' . $externalPath . '"}';
        }
        else{
            $timeJson = '{"time":"' . $time->timestamp . '","path":"' . $externalPathNotFound . '"}';
        }

        if ($index < count($json) - 1) {
            $timeJson .= ',';
        }

        $index++;
        $localDoc .= $timeJson;
    }
} else {
    $times = $json->times;
    $index = 0;

    foreach ($times as $time) {
        $timeUrl = $time->url;
        $localPath = $base_path . '/' . basename($time->url);
        $externalPath = '/data/' . $type . '/' . basename($time->url);
        $timeJson = '';

        if (file_put_contents($localPath, file_get_contents($timeUrl))) {
            $timeJson = '{"time":"' . $time->timestamp . '","path":"' . $externalPath . '"}';
        }

        if ($index < count($times) - 1) {
            $timeJson .= ',';
        }

        $index++;
        $localDoc .= $timeJson;
    }
}

$localDoc .= ']';

file_put_contents($localDoc_path, $localDoc);
