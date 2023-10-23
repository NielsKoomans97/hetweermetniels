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
        <div class="container">
            <div class="col groupbox">
                <div class="col groupbox-bar">
                    <h4>Weerkaarten</h4>
                    <button data-flipped="normal" class="nav-button expand"><i class="fas fa-arrow-down"></i></button>
                </div>
                <div class="col groupbox-content" data-visible="collapsed">
                    <div class="col" id="forecast-charts">
                        <div class="col" id="chart-options">
                            <select id="chart-type">
                                <optgroup label="Temperature">
                                    <option value="temperature2m">Temperature 2m</option>
                                </optgroup>
                                <optgroup label="Moisture">
                                    <option value="dewpoint2m">Dewpoint 2m</option>
                                    <option value="humidity">Relative Humidiy 2m</option>
                                </optgroup>
                                <optgroup label="Boundary Layer">
                                    <option value="visibility">Horizontal Visibility</option>
                                </optgroup>
                                <optgroup label="Cloud Cover">
                                    <option value="lowclouds">Low Cloud Cover</option>
                                    <option value="midclouds">Mid Level Cloud Cover</option>
                                    <option value="highclouds">High Cloud Cover</option>
                                    <option value="totalclouds">Total Cloud Cover</option>
                                    <option value="cloudbase">Cloud Base Height</option>
                                </optgroup>
                                <optgroup label="Precipitation">
                                    <option value="simradar">Simulated Radar Reflectivity</option>
                                    <option value="hourlyprecip">Hourly Precipitation Amount</option>
                                    <option value="cumulativeprecipitation">Accumulated Precipitation</option>
                                    <option value="hourlysnowfall">Hourly Snowfall Depth</option>
                                    <option value="snowdepth">Snow Depth</option>
                                    <option value="pcptype">Precipitation Type</option>
                                </optgroup>
                                <optgroup label="Wind and Pressure">
                                    <option value="wind10m">Mean Sea Level Pressure and 10m Wind Force</option>
                                    <option value="wind10m_kt">Mean Sea Level Pressure and 10m Wind Speed</option>
                                    <option value="windgust10m">Mean Sea Level Pressure and 10m Wind Gust Speed
                                    </option>
                                </optgroup>
                            </select>
                        </div>
                        <img id="chart-image">
                        <div class="col" id="chart-controls">
                            <button id="previous-chart"><i class="fa-solid fa-arrow-left"></i></button>
                            <button id="next-chart"><i class="fa-solid fa-arrow-right"></i></button>
                            <input id="chart-slider" type="range" max="47">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>
