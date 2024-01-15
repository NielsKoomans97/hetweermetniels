<?php

$host = $_GET['host'];

if ($host == 'buienradar') {
    $type = $_POST['TYPE'];
    $url = $_POST['URL'];
    $base_path = $_SERVER['DOCUMENT_ROOT'] . '/data/' . $type;

    if (!is_dir($base_path)) {
        mkdir($base_path);
    }

    if (is_dir($base_path)) {
        $files = glob($base_path . '/*');
        foreach ($files as $file) {
            if (is_file($file)) {
                unlink($file);
            }
        }
    }

    $radarManifest = json_decode(file_get_contents($url));
    $times = $radarManifest->times;
    $i = 0;
    $localManifest[] = '[';

    foreach ($times as $time) {
        $path = $base_path . '/' . basename($time->url);
        $itemJson = '';

        if (file_put_contents($path, file_get_contents($time->url))) {
            $itemJson = '{"time":"' . $time->timestamp . '","path":"' . $path . '"}';
        } else {
            echo '{\"message\":\"Er was een fout opgetreden tijdens het downloaden van een radarbeeld\",\"object\":\"' . var_dump($_POST) . '\"}';
        }
        if ($i == count($times) - 1) {
            $itemJson .= '';
        } else {
            $itemJson .= ',';
        }
        $i++;

        $localManifest[] = $itemJson;
    }

    $localManifest[] = ']';

    $manifestPath = $base_path . '/' . $type . '.json';

    file_put_contents($manifestPath, $localManifest);
} else if ($host == 'weerplaza') {
    $type = 'Observations';
    $url = 'https://cluster.api.meteoplaza.com/v3/nowcast/tiles/radarnl-observations';
    $base_path = $_SERVER['DOCUMENT_ROOT'] . '/data/' . $type;

    if (!is_dir($base_path)) {
        mkdir($base_path);
    }

    if (is_dir($base_path)) {
        $files = glob($base_path . '/*');
        foreach ($files as $file) {
            if (is_file($file)) {
                unlink($file);
            }
        }
    }

    $radarManifest = json_decode(file_get_contents($url));
    $localManifest[] = '[';
    $i = 0;

    foreach ($radarManifest as $time) {
        $path = $base_path . '/' . basename($time->layername) . '.png';
        $itemJson = '';

        if (file_put_contents($path, file_get_contents($url . '/' . $time->layername))) {
            $itemJson = '{"time":"' . $time->nicetime . '","path":"' . $path . '"}';
        } else {
            echo '{\"message\":\"Er was een fout opgetreden tijdens het downloaden van een radarbeeld\",\"object\":\"' . var_dump($_POST) . '\"}';
        }

        if ($i == count($radarManifest) - 1) {
            $itemJson .= '';
        } else {
            $itemJson .= ',';
        }
        $i++;

        $localManifest[] = $itemJson;
    }

    $localManifest[] = ']';

    $manifestPath = $base_path . '/' . $type . '.json';

    file_put_contents($manifestPath, $localManifest);
}


