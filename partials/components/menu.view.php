<?php
$sqlCreds = new SqlCredentials('localhost', 'hetweermetniels', 'root', '');
$sqlClient = new SqlClient($sqlCreds);
$menuItems = $sqlClient->Select('menu-items');
$icon = $sqlClient->Select('config', ['PropertyName', 'PropertyValue'], ['PropertyName' => 'SiteLogo'])[0]['PropertyValue'];
?>

<section class="nav-section">
    <div class="container">
        <a href="/" class="site-logo-link"><img src="<?= $icon ?>" id="site-logo"></a>
        <nav>
            <?php foreach ($menuItems as $menuItem) { ?>
                <a class="nav-button" href="<?= $menuItem['link'] ?>"><?= $menuItem['name'] ?></a>
            <?php } ?>
        </nav>
    </div>
</section>
