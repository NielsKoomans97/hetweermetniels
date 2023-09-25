<?php include 'header.php'; ?>
<div class="content" id="index">
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
                        <h4 id="warning-code">Code Geel</h4>
                        <h5 id="warning-description">Klik hier voor meer info</h5>
                    </div>
                </a>
                <a href="" class="nav-button" id="more-info-button">
                    <h4>Voorspellingen</h4>
                    <i class="fa-solid fa-calendar-days"></i>
                </a>
            </div>
        </div>
    </section>
    <section id="smaller-radar">
        <div class="container">
            <div class="col" id="radar-config">
                <select id="radar-type">
                    <optgroup label="Benelux">
                        <option data-version="3" data-type="RadarMapRain" label="Regen"></option>
                        <option data-version="3" data-type="RadarMapLightning" label="Onweer"></option>
                    </optgroup>
                </select>
                <i class="fa-solid fa-clock"></i>
                <select id="radar-history">
                    <optgroup label="Verleden">
                        <option value="12" label="-1u"></option>
                        <option value="48" label="-6u"></option>
                    </optgroup>
                    <optgroup label="Toekomst">
                        <option value="32" label="+8u"></option>
                    </optgroup>
                </select>
            </div>
            <img id="radar-image" data-version="3">
            <div class="col" id="radar-controls">
                <button id="radar-playpause"><i class="fa-solid fa-play"></i></button>
                <h5 id="radar-time">00:00</h5>
                <input id="radar-position" type="range" max="100">
                <i class="fa-solid fa-forward-fast"></i>
                <select id="radar-speed">
                    <option label="10x"></option>
                    <option label="5x"></option>
                    <option label="2x"></option>
                    <option label="1x"></option>
                </select>
            </div>
        </div>
    </section>
</div>