<?php

$type = $_POST['type'];
$base_path = $_SERVER['DOCUMENT_ROOT'] . '/data/' . $type;

if (is_dir($base_path)){
    $files = glob($base_path.'/*');
    foreach($files as $file){
        if (is_file($file)){
            unlink($file);
        }
    }
}
