import { CookieManager } from "./cookies.js";
import { Cookie } from "./cookies.js";

export class SavedLocation {
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

        result.Default = value['Default'];

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

    SetDefault() {
        const cookieMan = new CookieManager();
        const locations = SavedLocation.GetLocations();

        locations.forEach(location => {
            if (location.LocationId == this.LocationId){
                location.Default = true;
            }
            else{
                location.Default = false;
            }
        })

        cookieMan.SaveCookie(new Cookie('locations', JSON.stringify(locations)));
    }

    PopulateLocationItems() {

    }
}
