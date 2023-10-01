import { CookieManager } from "./cookies.js";
import { ObservationsWidget } from "./observations.js";

export class Locations {
    manager = new CookieManager();
    observationsWidget = new ObservationsWidget(6530);

    constructor() {

    }

    async PopulateLocationsList(query) {
        const locations_list = document.getElementById('locations-list');
        const data = await fetch(`https://location.buienradar.nl/1.1/location/search?query=${query}`);
        const json = await data.json();

        if (json.length > 0) {
            json.forEach(element => {
                let locationItem = document.createElement('button');
                locationItem.innerText = element['name'];
                locationItem.className = 'nav-button';
                locationItem.setAttribute('data-id', element['id']);
                locationItem.setAttribute('data-stationid', element['weatherstationid']);
                locationItem.addEventListener('click', async (event) => {
                    const target = event.target;
                    const stationId = target.getAttribute('data-stationid');

                    this.observationsWidget = new ObservationsWidget(stationId);
                    await this.observationsWidget.Refresh();

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
}
