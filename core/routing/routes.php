<?php

require_once 'router.php';
require_once 'core/tools/functions.php';

get('/', function () {
    view('index', [], false);
});

get('/$path', function ($path) {
    view($path, [], false);
});
