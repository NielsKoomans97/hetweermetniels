<?php

function component($name)
{
    $view_path = $_SERVER['DOCUMENT_ROOT'] . '/views';
    $comp_path = $view_path . '/components/' . $name . '.view.php';

    if (file_exists($comp_path)) {
        require_once $comp_path;
    }
}

function radaritem($host, $type)
{
    echo '  <div class="radar-item" id="' . $type . '">
                <div class="radar-images"></div>
                <img class="background-image">
                <img class="border-layer">
                <div class="time-info-container">
                    <p class="time-heading">Leeg</p>
                    <p class="time-nice">00:00</p>
                    <p class="radar-units"></p>
                </div>
                <img src="' . $host . '" class="logo">
            </div>';
}

function warningoverview()
{
    echo '  <div class="warning-overview">
                <img class="warning-day">
                <div class="alert-list">
                </div>
            </div>';
}

function iframe($src)
{
    echo '<iframe src="' . $src . '"></iframe>';
}
