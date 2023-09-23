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
    <div class="container">
        <img id="icon">
        <div class="col" id="observations-widget">
            <h2 id="temperature"></h2>
            <div class="col" id="col-precip">
                <i class="fas fa-umbrella"></i>
                <h4 id="precipitation"></h4>
            </div>
            <div class="col" id="col-wind">
                <i class="fas fa-arrow-down" id="wind-direction"></i>
                <h4 id="wind-speed"></h4>
            </div>
        </div>
    </div>
</section>
<section id="more-info">
    <div class="container">
        <div class="col" id="more-information">

            <a href="" class="nav-button" id="warnings-button">
                <i class="fas fa-warning"></i>
                <div class="col">
                    <h5 id="warning-code">Code Geel</h5>
                    <h6 id="warning-description">Klik hier voor meer info</h6>
                </div>
            </a>
            <a href="" class="nav-button" id="more-info-button">
                <h5>Voorspellingen</h5>
                <i class="fa-solid fa-calendar-days"></i>
            </a>
        </div>
    </div>
</section>
