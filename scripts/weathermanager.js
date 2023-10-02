import { CookieManager } from "./cookies.js";
import { Cookie } from "./cookies.js";

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
    }

    async Search(query) {
        const locations_list = document.getElementById('locations-list');
        const data = await fetch(`https://location.buienradar.nl/1.1/location/search?query=${query}`);
        const json = await data.json();

        if (json.length > 0) {
            json.forEach(element => {
                let locationItem = document.createElement('button');
                locationItem.innerText = element['name'];
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

                    locations_list.setAttribute('data-visible', 'collapsed');
                });

                let locationFoad = document.createElement('h4');
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
        input.setAttribute('value', `${json['stationname']}`);
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

        const forecast_table = document.createElement('table');
        const tableHead = document.createElement('thead');
        const tableBody = document.createElement('tbody');

        const dayStrings = ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo', ];

        days.forEach(day => {
            var date = new Date(Date.parse(day['date']));
            var day = dayStrings[date.getDay()];

            var th = document.createElement('th');
            var p = document.createElement('p');
            p.className = 'forecast-date';
            p.innerText = day;
            th.appendChild(p);

            tableHead.appendChild(th);
        });

        forecast_table.appendChild(tableHead);
        forecast_table.appendChild(tableBody);

        forecast_days.appendChild(forecast_table);

        // days.forEach(day => {
        //     BuildDay(forecast_days, day);
        // });

        // function BuildDay(root, data) {
        //     const forecast_day = document.createElement('div');
        //     forecast_day.className = 'forecast-day';

        //     BuildTemp(forecast_day, data);
        //     BuildWind(forecast_day, data);

        //     root.appendChild(forecast_day);
        // }

        // function BuildTemp(root, day) {
        //     const tempContainer = document.createElement('div');
        //     tempContainer.classList.add('col', 'forecast-temp');

        //     const high = document.createElement('p');
        //     high.className = 'temp-high';
        //     high.innerText = day['maxtemp'];
        //     tempContainer.appendChild(high);

        //     const low = document.createElement('p');
        //     low.className = 'temp-low';
        //     low.innerText = day['mintemp'];
        //     tempContainer.appendChild(low);

        //     root.appendChild(tempContainer);
        // }

        // function BuildWind(root, day) {
        //     const windContainer = document.createElement('div');
        //     windContainer.classList.add('col', 'forecast-wind');

        //     const icon = document.createElement('i');
        //     icon.classList.add('fas', 'fa-arrow-up');
        //     icon.setAttribute('style', `transform: rotate(${day['winddirection']}deg);')`);
        //     windContainer.appendChild(icon);

        //     const speed = document.createElement('p');
        //     speed.className = 'wind-speed';
        //     speed.innerText = `${day['windspeedbft']} bft`;
        //     windContainer.appendChild(speed);

        //     root.appendChild(windContainer);
        // }
    }

    HasElement(element) {
        const el = document.getElementById(element);

        return el != null;
    }
}

class SavedLocation {
    Name = '';
    Country = '';
    LocationId = '';
    StationId = '';
    Default = false;

    constructor(name, country, locationId, stationId) {
        this.Name = name;
        this.Country = country;
        this.LocationId = locationId;
        this.StationId = stationId;
    }

    static Parse(value) {
        var result = new SavedLocation(
            value['Name'],
            value['Country'],
            value['LocationId'],
            value['StationId'],
        );

        return result;
    }

    static ParseSearch(value) {
        var result = new SavedLocation(
            value['name'],
            value['countrycode'],
            value['id'],
            value['weatherstationid']
        );

        return result;
    }

    HTML() {
        return `<a station-id="${this.StationId}" location-id="${this.LocationId}" class="nav-button location-item">
                    <p class="location-name">
                        ${this.Name}
                    </p>
                    <p class="location-country">
                        ${this.Country}
                    </p>
                </a>`;
    }

    static GetLocations() {
        const cookieMan = new CookieManager();
        const cookie = cookieMan.GetCookie('locations').Value;
        const json = JSON.parse(cookie);

        let result = [];
        json.forEach(location => {
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
        const locations = SavedLocation.GetLocations();
        const index = this.GetIndex(locations);

        locations.splice(index, 1);

        cookieMan.SaveCookie(new Cookie('locations', JSON.stringify(locations)));
    }

    Save() {
        const cookieMan = new CookieManager();
        const locations = SavedLocation.GetLocations();

        locations.push(this);

        cookieMan.SaveCookie(new Cookie('locations', JSON.stringify(locations)));
    }

    PopulateLocationItems() {

    }
}
