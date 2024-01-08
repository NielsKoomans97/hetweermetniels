<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div class="content <?= substr($_SERVER['REQUEST_URI'],1,strlen($_SERVER['REQUEST_URI'])); ?>">
        <nav class="main-menu">
            <a href="/">Home</a>
            <a href="/simulcast">Simulcasting</a>
        </nav>