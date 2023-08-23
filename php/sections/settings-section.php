<section id="settings">
    <div class="container flex-column">
        <h5 class="title">Hoeveel dagen vooruit wilt u voorspellingen?</h5>
        <fieldset>
            <div class="col flex-row">
                <input type="radio" value="3 dagen" id="3-days" name="3-days">
                <label for="3-days">3 dagen</label>
            </div>
            <div class="col flex-row">
                <input type="radio" value="7 dagen" id="7-days" name="7-days">
                <label for="7-days">7 dagen</label>
            </div>
            <div class="col flex-row">
                <input type="radio" value="14 dagen" id="14-days" name="14-days">
                <label for="14-days">14 dagen</label>
            </div>
        </fieldset>
    </div>
    <div class="container flex-column">
        <div class="col">
            <h5 class="title">Opgeslagen locaties</h5>
        </div>
        <div class="col grid" id="locations">

        </div>
    </div>
    <div class="container flex-column flex-grow padding-bottom">
        <h5 class="title">Locaties zoeken</h5>
        <div class="col grid" id="top-bar">
            <input type="text" placeholder="Vul hier uw zoekopdracht in" id="search-query">
            <?= CreateIconButton('fa-solid fa-magnifying-glass', '', 'search-button', 'Zoeken', '') ?>
        </div>
        <div class="col grid" id="results">

        </div>
    </div>
</section>
