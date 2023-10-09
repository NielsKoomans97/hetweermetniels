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

        if (this.HasElement('more-information')) {
            await this.RefreshAnnouncementPill();
        }

        if (this.HasElement('weather-report')){
            await this.GetWeatherReport('nl');
        }
    }

    async GetWeatherReport(country){
        const data = await fetch(`https://data.buienradar.nl/1.1/content/weatherreport/${country}/false`)
        const json = await data.json();

        const body = json['body'];
        const reportEl = document.getElementById('weather-report');
        reportEl.innerHTML = body;
    }

    async RefreshAnnouncementPill() {
        const warning_code = document.getElementById('warning-code');
        const warning_description = document.getElementById('warning-description');
        const data = await fetch('https://data.buienradar.nl/1.0/announcements/apps');
        const json = await data.json();

        const warnings = json['warnings']['locations'];

        switch (json['warnings']['color']) {
            case 'YELLOW': warning_code.innerText = `Code Geel`; break;
            case 'GREEN': warning_code.innerText = 'Geen waarschuwingen'; break;
            case 'RED': warning_code.innerText = 'Code Rood'; break;
            case 'ORANGE': warning_code.innerText = 'Code Oranje'; break;
        }

        if (warnings.length > 0) {
            warning_code.innerText = 'Er zijn waarschuwing(en)'
            warning_description.innerText = `Voor ${warnings.length} provincies`;
        }
        else {
            warning_description.innerText = '';
        }
    }

    async Search(query) {
        const locations_list = document.getElementById('locations-list');
        const data = await fetch(`https://location.buienradar.nl/1.1/location/search?query=${query}`);
        const json = await data.json();

        this.ClearAll(locations_list);

        if (json.length > 0) {
            json.forEach(element => {
                let locationItem = document.createElement('button');
                locationItem.className = 'nav-button location-item';
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

                    if (this.HasElement('more-information')) {
                        await this.RefreshAnnouncementPill();
                    }

                    if (this.HasElement('weather-report')){
                        await this.GetWeatherReport('nl');
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

    ClearAll(element) {
        var delChild = element.lastChild;
        while (delChild) {
            element.removeChild(delChild);
            delChild = element.lastChild;
        }
    }

    async Select() {
        const locations_list = document.getElementById('saved-locations-list');
        const locations = SavedLocation.GetLocations();

        this.ClearAll(locations_list);

        if (locations.length > 0) {
            locations.forEach(element => {
                let locationItem = document.createElement('button');
                locationItem.className = 'nav-button';
                locationItem.setAttribute('data-json', JSON.stringify(element));
                locationItem.addEventListener('click', async (event) => {
                    const target = event.target;

                    this.DefaultLocation = SavedLocation.Parse(JSON.parse(target.getAttribute('data-json')));
                    this.DefaultLocation.SetDefault();

                    if (this.HasElement('observations-widget')) {
                        await this.RefreshObservations();
                    }

                    if (this.HasElement('forecast-days')) {
                        await this.RefreshForecast();
                    }

                    if (this.HasElement('more-information')) {
                        await this.RefreshAnnouncementPill();
                    }

                    locations_list.setAttribute('data-visible', 'collapsed');
                });

                let locationName = document.createElement('p');
                locationName.className = 'location-name';
                locationName.innerText = element['Name'];
                locationItem.appendChild(locationName);

                let locationFoad = document.createElement('p');
                locationFoad.className = 'location-foad';
                locationFoad.innerText = element['Country'];
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

        function GetDate(dateString){
            return new Date(Date.parse(dateString));
        }

        function BuildDay(root, day) {
            const forecast_day = document.createElement('div');
            forecast_day.className = 'forecast-day';

            const info_container = document.createElement('div');
            info_container.classList.add('col', 'info-container');

            BuildIconItem(forecast_day, day);

            BuildDateItem(info_container, day);
            BuildTempItem(info_container, day);
            BuildPrecipWindItem(info_container, day);
            BuildAstronomyItem(info_container, day);

            forecast_day.appendChild(info_container);
            root.appendChild(forecast_day);
        }

        function BuildDateItem(root, day) {
            const dayStrings = ['Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag', 'Zondag',];
            var date = GetDate(day['datetime']);
            var day = dayStrings[date.getDay()];

            const dateContainer = document.createElement('div');
            dateContainer.className = 'forecast-date';

            const dateItem = document.createElement('p');
            dateItem.className = 'date-string';
            dateItem.innerText = `${day}`;
            dateContainer.appendChild(dateItem);

            const dateNr = document.createElement('p');
            dateNr.className = 'date-number';
            dateNr.innerText = `${date.getDate()} - ${date.getUTCMonth()}`
            dateContainer.appendChild(dateNr);

            root.appendChild(dateContainer);
        }

        function BuildAstronomyItem(root, day){
            const container = document.createElement('div');
            container.classList.add('col', 'forecast-data');
            container.id = 'forecast-astronomy';

            const sunriseIcon = document.createElement('i');
            sunriseIcon.classList.add('fa-solid','fa-sun');
            container.appendChild(sunriseIcon);

            const sunrise = document.createElement('p');
            const sunriseTime = GetDate(day['sunrise']);
            sunrise.className = 'sunrise';
            sunrise.innerText = `${fixInt(sunriseTime.getHours())}:${fixInt(sunriseTime.getMinutes())}`;
            container.appendChild(sunrise);

            const sunsetIcon = document.createElement('i');
            sunsetIcon.classList.add('fa-solid', 'fa-moon');
            container.appendChild(sunsetIcon);

            const sunset = document.createElement('p');
            const sunsetTime = GetDate(day['sunset']);
            sunset.className = 'sunset';
            sunset.innerText = `${fixInt(sunsetTime.getHours())}:${fixInt(sunsetTime.getMinutes())}`;
            container.appendChild(sunset);

            root.appendChild(container);
        }

        function BuildPrecipWindItem(root, day){
            const container = document.createElement('div');
            container.classList.add('col', 'forecast-data');
            container.id = 'forecast-atmosphere';

            const windIcon = document.createElement('i');
            windIcon.classList.add('fa-solid', 'fa-arrow-down');

            const windDir = parseInt(day['winddirectiondegrees']);

            windIcon.setAttribute('style', `transform: rotate(${(windDir)}deg);`);
            container.appendChild(windIcon);

            const windSpeed = document.createElement('p');
            windSpeed.className = 'wind-speed';
            windSpeed.innerText = day['windspeed'];
            container.appendChild(windSpeed);

            const precipIcon = document.createElement('i');
            precipIcon.classList.add('fas', 'fa-droplet');
            container.appendChild(precipIcon);

            const precipAmount = document.createElement('p');
            precipAmount.className = 'precipitation';
            precipAmount.innerText = `${day['precipitationmm']} mm`
            container.appendChild(precipAmount);

            root.appendChild(container);``
        }

        function BuildTempItem(root, day) {
            const tempContainer = document.createElement('div');
            tempContainer.classList.add('col', 'forecast-data');
            tempContainer.id = 'forecast-temperature';

            const highIcon = document.createElement('i');
            highIcon.classList.add('fa-solid', 'fa-arrow-up');
            tempContainer.appendChild(highIcon);

            const high = document.createElement('p');
            high.className = 'temp-high';
            high.innerText = `${day['maxtemp']}°`;
            tempContainer.appendChild(high);

            const lowIcon = document.createElement('i');
            lowIcon.classList.add('fa-solid', 'fa-arrow-down');
            tempContainer.appendChild(lowIcon);

            const low = document.createElement('p');
            low.className = 'temp-low';
            low.innerText = `${day['mintemp']}°`;
            tempContainer.appendChild(low);

            root.appendChild(tempContainer);
        }

        function BuildIconItem(root, day) {
            var iconItem = document.createElement('img');

            iconItem.setAttribute('src', `https://cdn.buienradar.nl/resources/images/icons/weather/116x116/${day['iconcode']}.png`);
            iconItem.className = 'forecast-icon';

            root.appendChild(iconItem);
        }

        function BuildWindItem(root, day) {
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

        function BuildPrecipItem(root, day) {
            const precipContainer = document.createElement('div');
            precipContainer.classList.add('col', 'forecast-precipitation');

            const precipIcon = document.createElement('i');
            precipIcon.classList.add('fas', 'fa-droplet');
            precipContainer.appendChild(precipIcon);

            const precipAmount = document.createElement('p');
            precipAmount.className = 'precipitation';
            precipAmount.innerText = `${day['precipitationmm']} mm`
            precipContainer.appendChild(precipAmount);

            root.appendChild(precipContainer);
        }

        function fixInt(nr){
            if (nr < 10){
                return `0${nr}`;
            }

            return `${nr}`;
        }
    }

    HasElement(element) {
        const el = document.getElementById(element);

        return el != null;
    }
}

