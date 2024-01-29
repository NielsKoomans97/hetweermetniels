<?php
require_once 'router.php';
require_once 'database.php';

$core_path = $_SERVER['DOCUMENT_ROOT'] . '/core';

get('/', function () {
    $params['posts'] = FetchPosts();

    CreateView('index', false, $params, true);
});

get('/simulcast', function () {
    CreateView('simulcast', false, [], false);
});

get('/posts', function () {


});

post('/get-radar', $core_path . '/data/download.php');

function CreateView($name, $requireAdmin, $params, $showHeader)
{
    $view_path = $_SERVER['DOCUMENT_ROOT'] . '/views';
    $core_path = $_SERVER['DOCUMENT_ROOT'] . '/core';

    if ($requireAdmin == true) {
        if (!isset($_SESSION['ID']) || empty($_SESSION['ID'])) {
            echo 'You are not logged in';
            die();
        }
    }

    require_once 'functions.php';

    if ($showHeader) {
        require_once $view_path . '/partials/header.view.php';
    } else {
        require_once $view_path . '/partials/header.nonav.view.php';
    }

    require_once $view_path . '/' . $name . '.view.php';

    require_once $view_path . '/partials/footer.view.php';
}
