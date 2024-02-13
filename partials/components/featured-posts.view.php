<?php
$database = new Database('localhost', 'hetweermetniels', 'root', '');
$posts = $database->FetchPosts();

?>

<div class="container">
    <div class="d-flex flex-row">
        <?php

        var_dump('<pre>', $posts);

        foreach ($posts as $post) {
            var_dump($post);
        }
        ?>
    </div>
</div>
