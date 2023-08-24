<section id="radar">
    <div class="container flex-column">
        <div class="col grid">
            <select id="radar-options">
                <option data-radar-path="https://cdn.knmi.nl/knmi/map/page/weer/actueel-weer/neerslagradar/WWWRADAR_loop.gif">Neerslag</option>
            </select>
            <img id="radar-image">
        </div>
    </div>
    <div class="container flex-column">
        <div class="col grid" id="announcements">
            <i class="fa-solid fa-warning"></i>
            <span id="warning-title"></span>
            <a href="warnings.php">Meer info</a>
        </div>
        <img id="warnings-today">
    </div>
</section>