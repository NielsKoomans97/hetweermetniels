<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="css/style.css" rel="stylesheet">
    <script src="js/main.js" type="module" defer></script>
    <script src="https://kit.fontawesome.com/9efe11bfbd.js" crossorigin="anonymous"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
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
