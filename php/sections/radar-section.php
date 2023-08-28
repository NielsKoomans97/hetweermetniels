<section id="radar">
    <div class="container flex-column" id="radar-container">
        <div class="col grid" id="radar-selector">
            <select id="radar-options">
                <optgroup label="Neerslag">
                    <option data-version="v3" data-type="RadarMapRain5mNL">Regen</option>
                    <option data-version="v3" data-type="RadarMapSnow5mNL">Sneeuw</option>
                </optgroup>
               
            </select>
        </div>
        <div class="col" id="radar-images">
            <img id="radar-image">
        </div>
        <div class="col grid" id="radar-controls">
            <button id="radar-playpause">
                <i class="fas fa-play"></i>
            </button>
            <span id="radar-time">00:00</span>
            <input id="radar-slider" type="range">
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