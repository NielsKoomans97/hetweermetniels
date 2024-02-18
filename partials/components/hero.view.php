<?php

$sqlCreds = new SqlCredentials('localhost', 'hetweermetniels', 'root', '');
$sqlClient = new SqlClient($sqlCreds);

$values = $sqlClient->Select('config', ['PropertyName', 'PropertyValue'], ['PropertyName' => 'HeroImage']);
$backgroundImage = $values[0]['PropertyValue'];

?>

<section class="hero-section">
    <img src="<?= $backgroundImage ?>" id="hero-bg">
    <div class="mask-layer"></div>
    <div class="container">
        <div class="col-md-6">
            <?= component('spotlight') ?>
            <a href="/meer-info">Geef mij meer</a>
        </div>
    </div>
</section>
