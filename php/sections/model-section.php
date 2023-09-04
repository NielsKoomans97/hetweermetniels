<section id="progtemps">
    <div class="container">
        <div class="col d-flex flex-column">
            <h3>Progtemps en kaarten <b>HarmonieV40</b> van <a href="https://woutervanbernebeek.nl">Wouter van Bernebeek</a></h3>
            <iframe src="https://dev.weercijfers.nl/harmonie/widget/progtemp-small" id="progtemps-embed"
                frameborder="0"></iframe>
        </div>
    </div>
</section>
<section id="charts">
    <div class="container flex-column">
        <div class="col grid">
            <select id="chart-options">
                <optgroup label="Temperature">
                    <option value="temperature2m_0">Temperature 2m</option>
                </optgroup>
                <optgroup label="Moisture">
                    <option value="dewpoint2m_0">Dewpoint 2m</option>
                    <option value="humidity_0">Relative Humidiy 2m</option>
                </optgroup>
                <optgroup label="Boundary Layer">
                    <option value="visibility_0">Horizontal Visibility</option>
                </optgroup>
                <optgroup label="Cloud Cover">
                    <option value="lowclouds_0">Low Cloud Cover</option>
                    <option value="midclouds_0">Mid Level Cloud Cover</option>
                    <option value="highclouds_0">High Cloud Cover</option>
                    <option value="totalclouds_0">Total Cloud Cover</option>
                    <option value="cloudbase_0">Cloud Base Height</option>
                </optgroup>
                <optgroup label="Precipitation">
                    <option value="simradar_0">Simulated Radar Reflectivity</option>
                    <option value="hourlyprecip_0">Hourly Precipitation Amount</option>
                    <option value="cumulativeprecipitation_0">Accumulated Precipitation</option>
                    <option value="hourlysnowfall_0">Hourly Snowfall Depth</option>
                    <option value="snowdepth_0">Snow Depth</option>
                    <option value="pcptype_0">Precipitation Type</option>
                </optgroup>
                <optgroup label="Wind and Pressure">
                    <option value="wind10m_0">Mean Sea Level Pressure and 10m Wind Force</option>
                    <option value="wind10m_kt_0">Mean Sea Level Pressure and 10m Wind Speed</option>
                    <option value="windgust10m_0">Mean Sea Level Pressure and 10m Wind Gust Speed</option>
                </optgroup>
            </select>
        </div>
        <div class="col">
            <img id="chart-image">
        </div>
        <div class="col grid">
            <input type="range" max="100" value="0" id="chart-slider">
        </div>
    </div>
</section>
