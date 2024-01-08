<?php

require_once 'router.php';

get('/', function () {
    CreatePage('index', true);
});

get('/simulcast', function () {
    CreatePage('simulcast', false);
});

function CreatePage($path, $useHeaderFooter)
{
    $base_path = '../public';

    if ($useHeaderFooter == true) {
        require_once $base_path . '/views/partials/header.view.php';
    }

    require_once $base_path . '/views/' . $path . '.view.php';

    if ($useHeaderFooter == true) {
        require_once $base_path . '/views/partials/footer.view.php';
    }
}
