<?php include 'header.php'; ?>
<div class="content" id="forecasts">

    <section id="daily-forecast">
        <div class="container" id="daily">
            <div class="col groupbox">
                <div class="col groupbox-bar">
                    <h4>Weerbericht</h4>
                    <button data-flipped="normal" class="nav-button expand"><i class="fas fa-arrow-down"></i></button>
                </div>
                <div class="col groupbox-content" data-visible="collapsed">
                    <div class="weather-report" id="weather-report" data-scroll>
                    </div>
                    <div class="col content-scroller">
                        <button class="scroll-up" class="nav-button">
                            <i class="fa-solid fa-arrow-up"></i>
                        </button>
                        <button class="scroll-down" class="nav-button">
                            <i class="fa-solid fa-arrow-down"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="col groupbox">
                <div class="col groupbox-bar">
                    <h4>Voorspellingen</h4>
                    <button data-flipped="flipped" class="nav-button expand"><i class="fas fa-arrow-down"></i></button>
                </div>
                <div class="col groupbox-content" data-visible="expanded">
                    <div class="col" id="forecast-days" data-scroll>

                    </div>
                    <div class="col content-scroller">
                        <button class="scroll-up" class="nav-button">
                            <i class="fa-solid fa-arrow-up"></i>
                        </button>
                        <button class="scroll-down" class="nav-button">
                            <i class="fa-solid fa-arrow-down"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>

    </section>
</div>
