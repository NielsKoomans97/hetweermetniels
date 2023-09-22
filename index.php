<?php include 'header.php'; ?>
<section id="search-bar">
    <div class="container">
        <div class="col text-input">
            <input type="text" id="search-query" nane="search-query" placeholder="Typ hier uw zoekopdracht">
            <button id="search" class="nav-button"><i class="fa-solid fa-magnifying-glass"></i></button>
        </div>
    </div>
</section>
<section id="observations">
    <div class="container d-flex flex-row">
        <img id="icon">
        <div class="col" id="observations-widget">
            <h2 id="temperature"></h2>
            <div class="col">
                <i class="fas fa-umbrella"></i>
                <h4 id="precipitation"></h4>
            </div>
            <div class="col">
                <i class="fas fa-arrow-up" id="wind-direction"></i>
                <h4 id="wind-speed"></h4>
            </div>
        </div>
    </div>
</section>
<section id="more-info">
    <div class="container">
        <div class="col" id="more-information">
            <i class="fas fa-warning"></i>
            <div class="col">
                <h5 id="warning-code"></h5>
                <h6 id="warning-description"></h6>
            </div>
            <h5>Meer informatie</h5>
            <i class="fa-solid fa-square-arrow-up-right"></i>
        </div>
    </div>
</section>
