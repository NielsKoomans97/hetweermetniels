<section id="menu">
    <div class="container flex-column">
        <div class="col-12" id="logo">
            <div class="col d-flex flex-column align-items-center">
                <img src="assets/logo.png">
                <h5>Het weer met Niels</h5>
            </div>
        </div>
        <div class="col-12" id="nav">
            <nav>
                <?= CreateMenuItem("fa-solid fa-house-chimney","index.php?page=index", "", "index", "Thuispagina", ""); ?>
                <?= CreateMenuItem("fa-solid fa-chart-area", "index.php?page=models", "", "models", "Weermodellen", ""); ?>
                <?= CreateMenuItem("fa-solid fa-user-gear", "index.php?page=settings", "", "settings", "Instellingen", ""); ?>
                <?= CreateMenuItem("fa-solid fa-cloud-bolt", "index.php?page=other-sites", "", "other-sites", "Andere websites", ""); ?>
            </nav>
        </div>
    </div>
</section>
