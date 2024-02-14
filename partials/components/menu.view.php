<?php
$sqlCreds = new SqlCredentials('localhost', 'hetweermetniels', 'root', '');
$sqlClient = new SqlClient($sqlCreds);
$menuItems = $sqlClient->Select('menu-items');
?>

<section class="nav-section">
    <div class="container">
        <nav>
            <?php foreach ($menuItems as $menuItem) { ?>
                <a href="<?= $menuItem['link'] ?>"><?= $menuItem['name'] ?></a>
            <?php } ?>
        </nav>
    </div>
</section>
