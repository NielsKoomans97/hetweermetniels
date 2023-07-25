<?php

function LoadPage($path)
{
    $uri = $path;

    switch ($uri) {
        case "index":
            return require("php/pages/index.php");

        case "models":
            return require("php/pages/models.php");

        case "settings":
            return require("php/pages/settings.php");
    }
}

?>

