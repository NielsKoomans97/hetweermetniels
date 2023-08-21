<section id="menu">
    <div class="container flex-column">
        <div class="col-12 d-flex" id="logo">
            <div id="logo-inner" class="col d-flex flex-column align-items-center">
                <img src="assets/logo.png">
                <h5>Het weer met Niels</h5>
            </div>
        </div>
        <div class="col-12" id="main-nav">
            <nav>
                <?= CreateLink("fa-solid fa-house-chimney", "index.php", "", "index", "Thuispagina", ""); ?>
                <?= CreateLink("fa-solid fa-chart-area", "models.php", "", "models", "Weermodellen", ""); ?>
                <?= CreateLink("fa-solid fa-user-gear", "settings.php", "", "settings", "Instellingen", ""); ?>
            </nav>
        </div>
        <div class="col-12" id="secondary-nav">
            <h5>Andere items</h5>
            <nav>
                <?= CreateImgLink("https://cdn.buienradar.nl/resources/images/favicon.png", "https://buienradar.nl", "", "Buienradar"); ?>
                <?= CreateImgLink("https://www.onweer-online.nl/favicon.ico", "https://onweer-online.nl", "", "Onweer-online"); ?>
                <?= CreateImgLink("https://primary.jwwb.nl/public/k/k/y/temp-frvufhxnzegthaceduoj/blikseminslag80922-2-1.jpg", "https://www.woutervanbernebeek.nl/weermodel", "", "Wouter van Bernebeek"); ?>
                <?= CreateImgLink("https://www.estofex.org/icon.ico", "https://estofex.org", "", "Estofex"); ?>
                <?= CreateImgLink("https://st.wetteronline.de/dr/1.1.497/images/logo/favicon.ico", "https://wetteronline.de", "", "Wetteronline"); ?>
                <?= CreateImgLink("https://www.lightningmaps.org/Images/app_icon_shadow.png", "https://lightningmaps.org", "", "Lightningmaps"); ?>
                <?= CreateImgLink("https://map.blitzortung.org/Icons/favicon.ico", "https://map.blitzortung.org/#1.32/0/8", "", "Blitzortung"); ?>
            </nav>
        </div>
    </div>
</section>