<section id="menu">
    <div class="container flex-column">
        <div class="col-12" id="logo">
            <div class="col d-flex flex-column align-items-center">
                <img src="assets/logo.png">
                <h5>Het weer met Niels</h5>
            </div>
        </div>
        <div class="col-12" id="main-nav">
            <nav>
                <?= CreateLink("fa-solid fa-house-chimney", "index.php?page=index", "", "index", "Thuispagina", ""); ?>
                <?= CreateLink("fa-solid fa-chart-area", "index.php?page=models", "", "models", "Weermodellen", ""); ?>
                <?= CreateLink("fa-solid fa-user-gear", "index.php?page=settings", "", "settings", "Instellingen", ""); ?>
                <?= CreateLink("fa-solid fa-cloud-bolt", "index.php?page=other-sites", "", "other-sites", "Andere websites", ""); ?>
            </nav>
        </div>
        <div class="col-12" id="secondary-nav">
            <h5>Andere items</h5>
            <nav>
                <?= CreateMenuItem("https://cdn.buienradar.nl/resources/images/favicon.png", "https://buienradar.nl", "", "Buienradar"); ?>
                <?= CreateMenuItem("https://www.onweer-online.nl/favicon.ico", "https://onweer-online.nl", "", "Onweer-online"); ?>
                <?= CreateMenuItem("https://primary.jwwb.nl/public/k/k/y/temp-frvufhxnzegthaceduoj/blikseminslag80922-2-1.jpg", "https://www.woutervanbernebeek.nl/weermodel", "", "Wouter van Bernebeek"); ?>
                <?= CreateMenuItem("https://www.estofex.org/icon.ico", "https://estofex.org", "", "Estofex"); ?>
                <?= CreateMenuItem("https://st.wetteronline.de/dr/1.1.497/images/logo/favicon.ico", "https://wetteronline.de", "", "Wetteronline"); ?>
                <?= CreateMenuItem("https://www.lightningmaps.org/Images/app_icon_shadow.png", "https://lightningmaps.org", "", "Lightningmaps"); ?>
                <?= CreateMenuItem("https://map.blitzortung.org/Icons/favicon.ico", "https://map.blitzortung.org/#1.32/0/8", "", "Blitzortung"); ?>
            </nav>
        </div>
    </div>
</section>