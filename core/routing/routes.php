<?php

require_once 'core/tools/functions.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/vendor/autoload.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/core/data/SqlClient.php';

use Pecee\SimpleRouter\SimpleRouter;
use Pecee\Http\Request;

SimpleRouter::get('/', function () {
    view('index', false);
});

SimpleRouter::get('/data/observations/{id}', function ($id) {
    $text = file_get_contents('https://observations.buienradar.nl/1.0/actual/weatherstation/' . $id);

    return $text;
});

SimpleRouter::get('/data/radar/{id}', function ($id) {
    $text = file_get_contents('https://cluster.api.meteoplaza.com/v3/nowcast/tiles/' . $id . '');
    $json = json_decode($text);
    $resultJson = [];

    $path = $_SERVER['DOCUMENT_ROOT'] . '/assets/radar/' . $id;
    if (!is_dir($path)) {
        mkdir($path);
    }

    foreach ($json as $item) {
        $itemPath = $path . '/' . $item->layername . '.png';
        $externPath = '/assets/radar/' . $id . '/' . $item->layername . '.png';
        $niceTime = $item->nicetime;

        if (file_put_contents($itemPath, file_get_contents('https://cluster.api.meteoplaza.com/v3/nowcast/tiles/' . $id . '/' . $item->layername))) {
            $resultJson[] =
                [
                    'path' => $externPath,
                    'time' => $niceTime,
                ];
        }
    }

    return json_encode($resultJson);
});

SimpleRouter::get('/not-found', function () {
    view('404', false);
});

SimpleRouter::error(function (Request $request, \Exception $exception) {

    switch ($exception->getCode()) {
            // Page not found
        case 404:
            SimpleRouter::response()->redirect('/not-found');
            // Forbidden
        case 403:
            SimpleRouter::response()->redirect('/forbidden');
    }
});

SimpleRouter::start();
