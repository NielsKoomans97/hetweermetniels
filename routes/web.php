<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/radar', function() {
    return view('radarimaging');
});

Route::get('/obs/{id}', function($id){
    $text = file_get_contents('https://observations.buienradar.nl/1.0/actual/weatherstation/' . $id);

    return $text;
});
