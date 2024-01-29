<section id="hero">
    <img class="banner" src="data/Static/weather_JannekeGuenther.jpg">
    <div class="container">
        <h3>Recente berichten</h3>
        <div class="posts-spotlight">
            <?php
            $posts = $params['posts'];

            foreach ($posts as $post) {
                ?>
                <div class="post_spotlight">
                    <img class="post_image" src="<?= $post['post_image']; ?>">
                    <p class="post_title">
                        <?= $post['post_title']; ?>
                    </p>
                    <p class="post_date">
                        <?= $post['post_date']; ?>
                    </p>
                </div>
                <?php
            }
            ?>
        </div>
    </div>
</section>
