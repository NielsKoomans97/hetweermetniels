<?php

function component($name){
    $view_path = $_SERVER['DOCUMENT_ROOT'] . '/views';
    $comp_path = $view_path . '/components/'. $name . '.view.php';

    if (file_exists($comp_path)){
        require_once $comp_path;
    }
}

?>