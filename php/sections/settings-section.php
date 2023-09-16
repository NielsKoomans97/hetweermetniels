<section id="settings">
    <div class="container flex-column">
        <h3 class="title"><b>Hoeveel dagen vooruit wilt u voorspellingen?</b></h3>
        <fieldset>
            <div>
                <input type="radio" id="3days" name="forecast-count" value="3 dagen" checked />
                <label for="3days">3 dagen</label>
            </div>

            <div>
                <input type="radio" id="7days" name="forecast-count" value="7 dagen" />
                <label for="7days">7 dagen</label>
            </div>

            <div>
                <input type="radio" id="14days" name="forecast-count" value="14 dagen" />
                <label for="14days">14 dagen</label>
            </div>
        </fieldset>
    </div>
    <div class="container flex-column">
        <div class="col">
            <h3 class="title"><b>Opgeslagen locatie</b></h3>
        </div>
        <div class="col grid" id="locations">

        </div>
    </div>
    <div class="container flex-column flex-grow padding-bottom">
        <h3 class="title"><b>Locaties zoeken</b></h3>
        <div class="col grid" id="top-bar">
            <input type="text" placeholder="Vul hier uw zoekopdracht in" id="search-query">
            <button id="search-button"><i class="fa-solid fa-magnifying-glass"></i>Zoeken</button>
        </div>
        <div class="col grid" id="results">

        </div>
    </div>
</section>
