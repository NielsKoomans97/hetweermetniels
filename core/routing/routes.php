<?php

require_once 'router.php';
require_once 'core/tools/functions.php';

get('/', function () {
    view('index', [], false);
});

any('*', function () {
    var_dump('<pre>',$_SERVER);
    // view($path, [], false);
});
