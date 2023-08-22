<section id="observations">
    <div class="container flex-column">
        <div class="col" id="location-selector">
            <select id="stations"></select>
        </div>
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
                    <i class="fa-solid fa-umbrella"></i>
                    <h6 id="observation-humid"></h6>
                </div>
                <div>
                    <i class="fa-solid fa-droplet"></i>
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
        <div class="col grid" id="forecast">
            <div class="forecast-day"></div>
            <div class="forecast-day"></div>
            <div class="forecast-day"></div>
        </div>

    </div>
    <div class="container flex-column flex-grow padding-bottom overflow-hidden">
        <br>
        <h3>Vandaag</h3>
        <div class="col" id="hourly-forecast">

        </div>
    </div>
</section>