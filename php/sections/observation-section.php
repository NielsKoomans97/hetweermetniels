<section id="observations">
    <div class="container flex-column">
        <h6>Locatie</h6>
        <div class="col d-flex flex-row" id="location-selector">
            <select id="stations"></select>
            <a id="add-location" href="settings.php"><i class="fa-solid fa-user-gear"></i></a>
        </div>
        <br>
        <h6>Actuele gegevens</h6>
        <div class="col" id="observations">
            <img id="observation-icon">
            <div class="col grid">
                <div>
                    <h1 id="observation-temp"></h1>
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

        </div>

    </div>
    <div class="container flex-column">
        <br>
        <h6>Voorspellingen</h6>
        <div class="col grid" id="forecast">
        </div>

    </div>
    <div class="container flex-column flex-grow overflow-hidden">
        <br>
        <h6>Vandaag</h6>
        <div class="col grid" id="hourly-forecast">

        </div>
    </div>
</section>
