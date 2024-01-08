<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="public/css/main.css" rel="stylesheet">
    <script src="public/js/main.js" type="module" defer></script>
</head>
<body>
    <div class="content <?= substr($_SERVER['REQUEST_URI'],1,strlen($_SERVER['REQUEST_URI'])); ?>">