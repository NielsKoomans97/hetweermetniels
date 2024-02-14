<?php

function view($name, $params, $admin, $include_header = true)
{
    $document_root = $_SERVER['DOCUMENT_ROOT'];

    if ($admin) {
        if (!isset($_SESSION['id']) && !empty($_SESSION['id'])) {
            header('Location: /login');
            die();
        }

        $document_root .= '/admin';
    }

    $file_name = $document_root . '/views/' . $name . '.view.php';

    if (!is_file($file_name)) {
        header('Location: /404');
        die();
    }

    if ($include_header) {
        $header_path = $document_root . '/partials/header.view.php';
        require_once $header_path;
    }

    require_once $document_root . '/core/data/sql.php';


    require_once $file_name;

    require_once $document_root . '/partials/footer.view.php';
}

function component($name, $params)
{
    $document_root = $_SERVER['DOCUMENT_ROOT'];

    require_once $document_root . '/partials/components/' . $name . '.view.php';
}
