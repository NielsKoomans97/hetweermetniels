<div class="container">
    <div class="d-flex flex-column col-12 radar-container">
        <select id="cm_radar">
            <optgroup label="Radars">
                <option value="https://cdn.knmi.nl/knmi/map/page/weer/actueel-weer/neerslagradar/WWWRADAR_loop.gif">Regen</option>
                <option value="https://cdn.knmi.nl/knmi/map/page/weer/actueel-weer/neerslagradar/WWWRADARLGT_loop.gif">Regen + Bliksem</option>
                <option value="https://cdn.knmi.nl/knmi/map/page/weer/actueel-weer/neerslagradar/WWWRADARTMP_loop.gif">Regen + Temperatuur</option>
                <option value="https://cdn.knmi.nl/knmi/map/page/weer/actueel-weer/neerslagradar/WWWRADARWIND_loop.gif">Regen + Wind (m/s)</option>
                <option value="https://cdn.knmi.nl/knmi/map/page/weer/actueel-weer/neerslagradar/WWWRADARBFT_loop.gif">Regen + Wind (bft)</option>
            </optgroup>
            <optgroup label="Waarnemingen">
                <option value="https://cdn.knmi.nl/knmi/map/page/weer/actueel-weer/temperatuur.png">Temperatuur</option>
                <option value="https://cdn.knmi.nl/knmi/map/page/weer/actueel-weer/windsnelheid.png">Windsnelheid (m/s)</option>
                <option value="https://cdn.knmi.nl/knmi/map/page/weer/actueel-weer/windkracht.png">Windsnelheid (bft)</option>
                <option value="https://cdn.knmi.nl/knmi/map/page/weer/actueel-weer/maxwindkm.png">Windstoten (km/h)</option>
                <option value="https://cdn.knmi.nl/knmi/map/page/weer/actueel-weer/zicht.png">Zicht (m)</option>
                <option value="https://cdn.knmi.nl/knmi/map/page/weer/actueel-weer/relvocht.png">Relatieve luchtvochtigheid (%)</option>
            </optgroup>
        </select>
        <img id="knmi-radar" src="https://cdn.knmi.nl/knmi/map/page/weer/actueel-weer/neerslagradar/WWWRADARLGT_loop.gif">
    </div>    
    <script>
        const radar = document.getElementById('knmi-radar');
        const cm = document.getElementById('cm_radar');

        cm.addEventListener('change', () => {
            var option = cm.selectedOptions[0];
            radar.setAttribute('src',option.getAttribute('value'));
        });
    </script>
</div>