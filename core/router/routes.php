<?php

require_once 'router.php';
$core_path = '' . $_SERVER['DOCUMENT_ROOT'] . '/../core';

get('/', function () {
    CreateView('index', true);
});

get('/simulcast', function () {
    CreateView('simulcast', false);
});

post('/get-radar', $core_path . '/data/download.php');
post('/save-manifest', $core_path . '/data/save_manifest.php');

function CreateView($name, $showHeader)
{
    $view_path = $_SERVER['DOCUMENT_ROOT'] . '/views';

    require_once '../functions.php';

    if ($showHeader) {
        require_once $view_path . '/partials/header.view.php';
    } else {
        require_once $view_path . '/partials/header.nonav.view.php';
    }

    require_once $view_path . '/' . $name . '.view.php';

    require_once $view_path . '/partials/footer.view.php';
}
