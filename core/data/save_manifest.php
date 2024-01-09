<?php

$json = $_POST['manifest'];
$type = $_POST['type'];

$base_path = $_SERVER['DOCUMENT_ROOT'] . '/../data/' . $type;
$json_path = $base_path.'/'.$type.'.json';

file_put_contents($json_path, $json);

echo $json;
