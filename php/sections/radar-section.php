<section id="radar">
    <div class="container flex-column" id="radar-container">
        <div class="col grid" id="radar-selector">
            <select id="radar-options">
                <optgroup label="Neerslag">
                    <option data-version="v3" data-type="RadarMapRain5mNL">Regen</option>
                    <option data-version="v3" data-type="RadarMapSnow5mNL">Sneeuw</option>
                    <option data-version="v3" data-type="RadarMapLightning5mNL">Onweer</option>
                    <option data-version="v3" data-type="RadarMapHail5mNL">Hagel</option>
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
            <select id="radar-speed">
                <option value="200">10x</option>
                <option value="500">5x</option>
                <option value="1000">1x</option>
            </select>
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