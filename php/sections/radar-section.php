<section id="radar">
    <div class="container flex-column" id="radar-container">
        <div class="col grid" id="radar-selector">
            <select id="radar-options">
                <optgroup label="Neerslag - BeNeLux">
                    <option data-version="v3" data-type="RadarMapRain5mNL" data-24u="RadarMapRainNL">Regen</option>
                    <option data-version="v3" data-type="RadarMapSnow5mNL" data-24u="RadarMapSnowNL">Sneeuw</option>
                    <option data-version="v3" data-type="RadarMapLightning5mNL" data-24u="RadarMapLightningNL">Onweer</option>
                    <option data-version="v3" data-type="RadarMapHail5mNL" data-24u="RadarMapHailNL">Hagel</option>
                </optgroup>
                <optgroup label="Neerslag - Europa">
                    <option data-version="v2" data-country="EU" data-type="RadarMapCloudEU" data-24u="RadarMapCloudEU">Onweer</option>
                </optgroup>
            </select>
            <i class="fa-solid fa-clock"></i>
            <select id="radar-times">
                <optgroup label="Verleden">
                    <option data-timetype="history" value="24">6u</option>
                    <option data-timetype="history" value="48">9u</option>
                    <option data-timetype="history" value="1">1u</option>
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
            <i class="fa-solid fa-angles-right"></i>
            <select id="radar-speed">
                <option value="200">10x</option>
                <option value="500">5x</option>
                <option value="1000">1x</option>
            </select>
        </div>
    </div>
</section>