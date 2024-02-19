<?php

require_once 'core/tools/functions.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/vendor/autoload.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/core/data/SqlClient.php';

use Pecee\SimpleRouter\SimpleRouter;
use Pecee\Http\Request;

SimpleRouter::get('/', function () {
    view('index', false);
});

SimpleRouter::get('/data/observations/{id}', function($id){
     $text = file_get_contents('https://observations.buienradar.nl/1.0/actual/weatherstation/'. $id);

     return $text;
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
