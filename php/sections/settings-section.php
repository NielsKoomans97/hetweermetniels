<section id="settings">
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