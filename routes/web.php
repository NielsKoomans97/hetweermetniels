<?php

use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;
use App\Http\Helpers\RadarData;
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

Route::get('/', [HomeController::class, 'index']);

Route::get('/radar', function () {
    return view('radarimaging');
});

Route::get('/obs/{id}', function ($id) {
    $text = file_get_contents('https://observations.buienradar.nl/1.0/actual/weatherstation/' . $id);

    return $text;
});

Route::get('/radar/weerplaza/{type}', function ($type) {
    return RadarData::SyncData('weerplaza', $type);
});


Route::get('/radar/buienradar/{type}/{version}/{history}/{forecast}', function ($type, $version, $history, $forecast) {
    return RadarData::SyncData('buienradar', $type, ['version' => $version, 'history' => $history, 'forecast' => $forecast]);
});
