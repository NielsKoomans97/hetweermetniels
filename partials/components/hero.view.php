<?php

$sqlCreds = new SqlCredentials('localhost', 'hetweermetniels', 'root', '');
$sqlClient = new SqlClient($sqlCreds);

$values = $sqlClient->Select(
    'config',
    ['PropertyName', 'PropertyValue'],
    [
        'PropertyName=\'HeroImage\''
    ]
);
$backgroundImage = $values[0]['PropertyValue'];
$posts = $sqlClient->Select(
    'posts',
    [],
    [
        'post_spotlight=\'1\''
    ]
)[0];
?>

<section class="hero-section">
    <img src="<?= $backgroundImage ?>" id="hero-bg">
    <div class="mask-layer"></div>
    <div class="container">
        <div class="col-md-10 col-lg-8 col-xl-7 col-xxl-6 col" id="spotlight-container">
            <p class="spotlight-label">Spotlight</p>
            <div class="image-container">
                <img src="<?= $posts['post_image']; ?>" class="image">
            </div>
            <p class="title"><?= $posts['post_title']; ?></p>
            <p class="description"><?= substr($posts['post_content'], 0, 105); ?>...</p>
            <a href="/meer-info">Lees verder</a>
        </div>

        <div class="col-lg-5 col-xl-4" id="sm-radar-container">
            <img class="country-map-layer" src="/assets/Radar-1050-v2.jpg">
            <img class="country-border-layer" src="/assets/Radar-1050-borders-v2.png">
            <img class="radar-layer">
            <div class="meta-container">
                <p class="meta-time"></p>
                <p class="meta-name"></p>
            </div>
        </div>
    </div>
</section>
