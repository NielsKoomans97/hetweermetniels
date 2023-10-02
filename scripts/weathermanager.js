import { CookieManager } from "./cookies";

export class WeatherManager {
    StationId = '';
    LocationId = '';

    async LoadConfig() {
        const cookies = new CookieManager();

    }

    async Search(query) {

    }

    async GetObservationData() {
        const data = await fetch(`https://observations.buienradar.nl/1.0/actual/weatherstation/${this.StationId}`);
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
        input.setAttribute('value', `${json['stationname']}`);
    }

    async GetForecastData() {
        const data = await fetch(`https://forecast.buienradar.nl/2.0/forecast/${this.LocationId}`);
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

        function BuildDay(root, data) {
            const forecast_day = document.createElement('div');
            forecast_day.className = 'forecast-day';

            BuildTemp(forecast_day, data);
            BuildWind(forecast_day, data);

            root.appendChild(forecast_day);
        }

        function BuildTemp(root, day) {
            const tempContainer = document.createElement('div');
            tempContainer.classList.add('col', 'forecast-temp');

            const high = document.createElement('p');
            high.className = 'temp-high';
            high.innerText = day['maxtemp'];
            tempContainer.appendChild(high);

            const low = document.createElement('p');
            low.className = 'temp-low';
            low.innerText = day['mintemp'];
            tempContainer.appendChild(low);

            root.appendChild(tempContainer);
        }

        function BuildWind(root, day) {
            const windContainer = document.createElement('div');
            windContainer.classList.add('col', 'forecast-wind');

            const icon = document.createElement('i');
            icon.classList.add('fas', 'fa-arrow-up');
            icon.setAttribute('style', `transform: rotate(${day['winddirection']}deg);')`);
            windContainer.appendChild(icon);

            const speed = document.createElement('p');
            speed.className = 'wind-speed';
            speed.innerText = `${day['windspeedbft']} bft`;
            windContainer.appendChild(speed);

            root.appendChild(windContainer);
        }
    }

    HasElement(element) {
        const el = document.getElementById(element);

        return el != null;
    }
}

class SavedLocation {
    LocationId = '';
    StationId = '';
    Default = false;

    constructor(locationId, stationId, defaultLocation) {
        this.LocationId = locationId;
        this.StationId = stationId;
        this.Default = defaultLocation;
    }

    ParseLocation(value) {
        const json = JSON.parse(value);
        this.LocationId = json['location-id'];
        this.StationId = json['station-id'];
        this.Default = json['default'];
    }

    Parse(value) {
        return new SavedLocation(
            value['location-id'],
            value['station-id'],
            value['default']
        )
    }

    GetLocations() {
        const cookieMan = new CookieManager();
        const json = JSON.parse(cookieMan.GetCookie('config'));
        const locations = json['locations'];

        let result = [];
        locations.forEach(location => {
            result.push(this.Parse(location));
        });

        return result;
    }

    GetIndex(locations) {
        for (let i = 0; i < locations.length; i++) {
            const location = locations[i];

            if (location.StationId == this.StationId) {
                return i;
            }
        }
    }

    Remove() {
        const cookieMan = new CookieManager();
        const locations = this.GetLocations();
        const index = this.GetIndex(locations);

        locations.splice(index, 1);

        cookieMan.SaveCookie(new Cookie('config', JSON.stringify(locations)));
    }

    PopulateLocationItems() {

    }
}
