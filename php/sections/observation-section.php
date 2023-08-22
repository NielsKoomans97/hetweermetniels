<section id="observations">
    <div class="container flex-column">
        <h5>Locatie</h5>
        <div class="col d-flex flex-row" id="location-selector">
            <select id="stations"></select>
            <a id="add-location" href="settings.php"><i class="fa-solid fa-user-gear"></i></a>
        </div>
        <br>
        <h5>Actuele gegevens</h5>
        <div class="col" id="observations">
            <div class="col grid">
                <div>
                    <h2 id="observation-temp"></h2>
                </div>
                <div>
                    <i class="fa-solid fa-hand-dots"></i>
                    <h6 id="observation-feel"></h6>
                </div>
                <div>
                    <i class="fa-solid fa-arrow-down"></i>
                    <h6 id="observation-wind"></h6>
                </div>
                <div>
                    <i class="fa-solid fa-droplet"></i>
                    <h6 id="observation-humid"></h6>
                </div>
                <div>
                    <i class="fa-solid fa-umbrella"></i>
                    <h6 id="observation-rainamt"></h6>
                </div>
                <div>
                    <i class="fa-solid fa-gauge"></i>
                    <h6 id="observation-pressure"></h6>
                </div>
            </div>
            <img id="observation-icon">
        </div>

    </div>
    <div class="container flex-column">
        <br>
        <h5>Voorspellingen</h5>
        <div class="col grid" id="forecast">
            <div class="forecast-day"></div>
            <div class="forecast-day"></div>
            <div class="forecast-day"></div>
            <div class="forecast-day"></div>
            <div class="forecast-day"></div>
            <div class="forecast-day"></div>
            <div class="forecast-day"></div>
            <div class="forecast-day"></div>
            <div class="forecast-day"></div>
            <div class="forecast-day"></div>
            <div class="forecast-day"></div>
            <div class="forecast-day"></div>
            <div class="forecast-day"></div>
        </div>

    </div>
    <div class="container flex-column flex-grow padding-bottom overflow-hidden">
        <br>
        <h5>Vandaag</h5>
        <div class="col" id="hourly-forecast">

        </div>
    </div>
</section>