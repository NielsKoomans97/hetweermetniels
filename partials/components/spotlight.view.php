<?php
$sqlCreds = new SqlCredentials('localhost', 'hetweermetniels', 'root', '');
$sqlClient = new SqlClient($sqlCreds);

$posts = $sqlClient->Select('posts', [], ['post_spotlight' => 1])[0];
?>

<div class="container">
    <div class="d-flex flex-row">
        <?php

        var_dump('<pre>', $posts);
        ?>
    </div>
</div>
