<?php

    require_once 'router.php';
    $view_path = $_SERVER['DOCUMENT_ROOT'] . '/views';

    get('/', function() {
        CreateView('index', true);
    });

    get('/simulcast', function() {
        CreateView('simulcast', false);
    });

    function CreateView($name, $showHeader){
        $view_path = $_SERVER['DOCUMENT_ROOT'] . '/views';

        require_once '../functions.php';
        
        if ($showHeader){
            require_once $view_path . '/partials/header.view.php';
        }
        else{
            require_once $view_path . '/partials/header.nonav.view.php';
        }

        require_once $view_path . '/' . $name . '.view.php';

        require_once $view_path . '/partials/footer.view.php';
    }
?>
