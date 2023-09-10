<section id="progtemps">
    <div class="container">
        <div class="col d-flex flex-column">
            <h3>Progtemps en kaarten <b>HarmonieV40</b> van <a href="https://woutervanbernebeek.nl">Wouter van Bernebeek</a></h3>
            <h5><i>Kaarten afkomstig van Wilfred Janssen</i></h5>
            <iframe src="https://dev.weercijfers.nl/harmonie/widget/progtemp-small" id="progtemps-embed"
                frameborder="0"></iframe>
        </div>
    </div>
</section>
<section id="charts">
    <div class="container flex-column">
        <div class="col grid" id="charts-selector">
            <select id="chart-options">
                <optgroup label="Temperature">
                    <option value="temperature2m_0">Temperatuur op 2 meter hoogte</option>
                </optgroup>
                <optgroup label="Moisture">
                    <option value="dewpoint2m_0">Dauwpuntstemperatuur</option>
                    <option value="humidity_0">Relatieve vochtigheid</option>
                </optgroup>
                <optgroup label="Boundary Layer">
                    <option value="visibility_0">Zicht in meters</option>
                </optgroup>
                <optgroup label="Cloud Cover">
                    <option value="lowclouds_0">Lage bewolking</option>
                    <option value="midclouds_0">Middelbare bewolking</option>
                    <option value="highclouds_0">Hoge bewolking</option>
                    <option value="totalclouds_0">Totale bewolking</option>
                    <option value="cloudbase_0">Wolkenhoogte (voet/ft)</option>
                </optgroup>
                <optgroup label="Precipitation">
                    <option value="simradar_0">Gesimuleerde radarbeelden</option>
                    <option value="hourlyprecip_0">Uurlijkse neerslaghoeveelheid (mm/u)</option>
                    <option value="cumulativeprecipitation_0">Totale neerslaghoeveelheid (mm)</option>
                    <option value="hourlysnowfall_0">Uurlijkse sneeuwval (cm/u)</option>
                    <option value="snowdepth_0">Sneeuwdikte (cm)</option>
                    <option value="pcptype_0">Neerslagtype</option>
                </optgroup>
                <optgroup label="Wind and Pressure">
                    <option value="wind10m_0">Luchtdruk op zeeniveau + windkracht in beaufort</option>
                    <option value="wind10m_kt_0">Luchtdruk op zeeniveau + windkracht in knopen</option>
                    <option value="windgust10m_0">Luchtdruk op zeeniveau + windstoten op 10 meter hoogte</option>
                </optgroup>
            </select>
        </div>
        <div class="col" id="charts-image">
            <img id="chart-image">
        </div>
        <div class="col grid" id="charts-controls">
            <input type="range" max="48" value="0" id="chart-slider">
        </div>
    </div>
</section>
