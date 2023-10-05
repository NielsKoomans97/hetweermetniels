import { CookieManager } from "./cookies.js";
import { Cookie } from "./cookies.js";
import { SavedLocation } from "./savedlocation.js";

export class WeatherManager {
    Locations = [];

    constructor() {
        this.DefaultLocation = new SavedLocation();
    }

    async LoadConfig() {
        const cookieMan = new CookieManager();
        if (!cookieMan.HasCookie('locations')) {
            let locations = [];
            var newLoc = new SavedLocation('De Bilt', 'NL', 2757783, 6260);
            newLoc.Default = true;

            locations.push(newLoc);

            cookieMan.SaveCookie(new Cookie('locations', JSON.stringify(locations)));
        }

        this.Locations = SavedLocation.GetLocations();

        if (this.Locations.length > 1) {
            this.Locations.forEach(location => {
                if (location.Default == true) {
                    this.DefaultLocation = location;
                }
            });
        }
        else {
            this.DefaultLocation = this.Locations[0];
        }

        if (this.HasElement('observations-widget')) {
            await this.RefreshObservations();
        }

        if (this.HasElement('forecast-days')) {
            await this.RefreshForecast();
        }

        if (this.HasElement('more-information')){
            await this.RefreshAnnouncementPill();
        }
    }

    async RefreshAnnouncementPill(){
        const warning_code = document.getElementById('warning-code');
        const warning_description = document.getElementById('warning-description');
        const data = await fetch('https://data.buienradar.nl/1.0/announcements/apps');
        const json = await data.json();

        const warnings = json['warnings']['locations'];

        if (warnings.length > 0){
            warning_description.innerText = `Voor ${warnings.length} provincies`;
        }
        else{
            warning_description.innerText = '';
        }

        switch(json['warnings']['color']){
            case 'YELLOW': warning_code.innerText = `Code Geel`; break;
            case 'GREEN': warning_code.innerText = 'Geen waarschuwingen'; break;
            case 'RED': warning_code.innerText = 'Code Rood'; break;
            case 'ORANGE': warning_code.innerText = 'Code Oranje'; break;
        }
    }

    async Search(query) {
        const locations_list = document.getElementById('locations-list');
        const data = await fetch(`https://location.buienradar.nl/1.1/location/search?query=${query}`);
        const json = await data.json();

        if (json.length > 0) {
            json.forEach(element => {
                let locationItem = document.createElement('button');
                locationItem.className = 'nav-button';
                locationItem.setAttribute('data-json', JSON.stringify(element));
                locationItem.addEventListener('click', async (event) => {
                    const target = event.target;

                    this.DefaultLocation = SavedLocation.ParseSearch(JSON.parse(target.getAttribute('data-json')));

                    if (this.HasElement('observations-widget')) {
                        await this.RefreshObservations();
                    }

                    if (this.HasElement('forecast-days')) {
                        await this.RefreshForecast();
                    }

                    if (this.HasElement('more-information')){
                        await this.RefreshAnnouncementPill();
                    }

                    locations_list.setAttribute('data-visible', 'collapsed');
                });

                let locationName = document.createElement('p');
                locationName.className = 'location-name';
                locationName.innerText = element['name'];
                locationItem.appendChild(locationName);

                let locationFoad = document.createElement('p');
                locationFoad.className = 'location-foad';
                locationFoad.innerText = element['countrycode'];
                locationItem.appendChild(locationFoad);

                locations_list.appendChild(locationItem);
            });

            locations_list.setAttribute('data-visible', 'visible');
        }
    }

    async GetObservationData() {
        const data = await fetch(`https://observations.buienradar.nl/1.0/actual/weatherstation/${this.DefaultLocation.StationId}`);
        const json = await data.json();

        return json;
    }

    async RefreshObservations() {
        const icon = document.getElementById('icon');
        const temperature = document.getElementById('temperature');
        const precipitation = document.getElementById('precipitation');
        const windDirection = document.getElementById('wind-direction');
        const windSpeed = document.getElementById('wind-speed');
        const input = document.getElementById('search-query');
        const json = await this.GetObservationData();

        icon.setAttribute('src', `https://cdn.buienradar.nl/resources/images/icons/weather/116x116/${json['iconcode']}.png`);
        temperature.innerText = `${json['temperature']}°`;
        precipitation.innerText = `${json['precipitationmm']} mm`;
        windSpeed.innerText = `${json['windspeedBft']} bft`;
        windDirection.setAttribute('style', `transform: rotate(${parseInt(json['winddirectiondegrees'])}deg);`);
        input.value = `${json['stationname']}`;
    }

    async GetForecastData() {
        const data = await fetch(`https://forecast.buienradar.nl/2.0/forecast/${this.DefaultLocation.LocationId}`);
        const json = await data.json();

        return json;
    }

    async RefreshForecast() {
        const forecast_days = document.getElementById('forecast-days');
        const data = await this.GetForecastData();
        const days = data['days'];

        days.forEach(day => {
            BuildDay(forecast_days, day);
        });

        function BuildDay(root, day){
            const forecast_day = document.createElement('div');
            forecast_day.className = 'forecast-day';

            const info_container = document.createElement('div');
            info_container.classList.add('col', 'info-container');

            BuildIconItem(forecast_day, day);

            BuildDateItem(info_container, day);
            BuildTempItem(info_container, day);
            BuildWindItem(info_container, day);
            BuildPrecipItem(info_container, day);

            forecast_day.appendChild(info_container);
            root.appendChild(forecast_day);
        }

        function BuildDateItem(root, day){
            const dayStrings = ['Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag', 'Zondag', ];
            var date = new Date(Date.parse(day['date']));
            var day = dayStrings[date.getDay()];

            const dateItem = document.createElement('p');
            dateItem.className = 'forecast-date';
            dateItem.innerText = `${day} ${date.getDate()} - ${date.getUTCMonth()}`;

            root.appendChild(dateItem);
        }

        function BuildTempItem(root, day){
            const tempContainer = document.createElement('div');
            tempContainer.classList.add('col', 'forecast-temps');

            const high = document.createElement('p');
            high.className = 'temp-high';
            high.innerText = `${day['maxtemp']}°`;
            tempContainer.appendChild(high);

            const low = document.createElement('p');
            low.className = 'temp-low';
            low.innerText = `${day['mintemp']}°`;
            tempContainer.appendChild(low);

            root.appendChild(tempContainer);
        }

        function BuildIconItem(root, day){
            var iconItem = document.createElement('img');

            iconItem.setAttribute('src', `https://cdn.buienradar.nl/resources/images/icons/weather/116x116/${day['iconcode']}.png`);
            iconItem.className = 'forecast-icon';

            root.appendChild(iconItem);
        }

        function BuildWindItem(root, day){
            const windContainer = document.createElement('div');
            windContainer.classList.add('col', 'forecast-wind');

            const windIcon = document.createElement('i');
            windIcon.classList.add('fa-solid', 'fa-arrow-up');

            const windDir = parseInt(day['winddirectiondegrees']);

            windIcon.setAttribute('style', `transform: rotate(${(windDir)}deg);`);
            windContainer.appendChild(windIcon);

            const windSpeed = document.createElement('p');
            windSpeed.className = 'wind-speed';
            windSpeed.innerText = day['windspeed'];
            windContainer.appendChild(windSpeed);

            root.appendChild(windContainer);
        }

        function BuildPrecipItem(root, day){
            const precipContainer = document.createElement('div');
            precipContainer.classList.add('col', 'forecast-precipitation');

            const precipIcon = document.createElement('i');
            precipIcon.classList.add('fas','fa-droplet');
            precipContainer.appendChild(precipIcon);

            const precipAmount = document.createElement('p');
            precipAmount.className = 'precipitation';
            precipAmount.innerText = `${day['precipitationmm']} mm`
            precipContainer.appendChild(precipAmount);

            root.appendChild(precipContainer);
        }
    }

    HasElement(element) {
        const el = document.getElementById(element);

        return el != null;
    }
}

