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

get('/admin/edit/$id', function ($id) {
    if (isset($_SESSION['id'])) {
        $param['post'] = FetchPost($id);

        CreateView('editor', true, $param, true);
    }
    else{
        header("Location: /login?message=U was niet ingelogd");
    }
});

get('/login', function(){
    CreateView('login', false, [], true);
});

get('/register', function(){
    CreateView('register', false, [], true);
});

post('/get-radar', $core_path . '/data/download.php');

function CreateView($name, $requireAdmin, $params, $showHeader)
{
    $view_path = $_SERVER['DOCUMENT_ROOT'] . '/views';
    $core_path = $_SERVER['DOCUMENT_ROOT'] . '/core';

    require_once 'functions.php';

    if ($showHeader) {
        require_once $view_path . '/partials/header.view.php';
    } else {
        require_once $view_path . '/partials/header.nonav.view.php';
    }

    if ($requireAdmin == true) {
        $view_path .= '/admin';
    }

    require_once $view_path . '/' . $name . '.view.php';

    $view_path = $_SERVER['DOCUMENT_ROOT'] . '/views';

    require_once $view_path . '/partials/footer.view.php';
}
