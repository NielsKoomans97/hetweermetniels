<?php include 'header.php'; ?>
<div class="content" id="forecasts">

    <section id="daily-forecast">
        <div class="container" id="daily">
            <div class="col groupbox">
                <div class="col groupbox-bar">
                    <h4>Weerbericht</h4>
                    <button class="nav-button expand"><i class="fas fa-arrow-down"></i></button>
                </div>
                <div class="col groupbox-content" data-visible="collapsed">
                    <div class="weather-report" id="weather-report">
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="col groupbox">
                <div class="col groupbox-bar">
                    <h4>Voorspellingen</h4>
                    <button class="nav-button expand"><i class="fas fa-arrow-down"></i></button>
                </div>
                <div class="col groupbox-content" data-visible="collapsed">
                    <div class="col" id="forecast-days">

                    </div>
                    <div class="col" id="forecast-scroller">

                    </div>
                </div>
            </div>
        </div>

    </section>
</div>
