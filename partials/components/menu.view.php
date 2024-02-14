<?php
$sqlCreds = new SqlCredentials('localhost', 'hetweermetniels', 'root', '');
$sqlClient = new SqlClient($sqlCreds);

$menuItems = $sqlClient->Select('menu-items');
?>
<section class="nav-section">
    <div class="container">
        <nav>
            <? foreach ($menuItems as $menuItem) { ?>

            <? } ?>
        </nav>
    </div>
</section>
