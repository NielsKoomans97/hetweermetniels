<section id="observations">
    <div class="container flex-column">
        <div class="col" id="observations">
            <div class="col grid">
                <div>
                    <h2 id="observation-temp"></h2>
                </div>
                <div>
                    <i class="fa-solid fa-hand-dots"></i>
                    <h5 id="observation-feel"></h5>
                </div>
                <div>
                    <i class="fa-solid fa-arrow-down"></i>
                    <h5 id="observation-wind"></h5>
                </div>
                <div>
                    <i class="fa-solid fa-umbrella"></i>
                    <h5 id="observation-humid"></h5>
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
        <div class="col" id="location-selector">
            <select id="stations"></select>
        </div>
    </div>
    <div class="container flex-grow padding-bottom overflow-hidden">
        <div class="col" id="hourly-forecast">

        </div>
    </div>
</section>