<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="css/style.css" rel="stylesheet">
    <script src="js/main.js" type="module" defer></script>
    <script src="https://kit.fontawesome.com/9efe11bfbd.js" crossorigin="anonymous"></script>
</head>

<body>
    <div class="content <?php
                        $path = substr($_SERVER['REQUEST_URI'], 1, strlen($_SERVER['REQUEST_URI']));
                        if (empty($path)) {
                            echo 'index';
                        } else {
                            echo $path;
                        }
                        ?>">

        <nav class="main-menu">
            <a href="/">Home</a>
            <a href="/simulcast">Simulcasting</a>
        </nav>