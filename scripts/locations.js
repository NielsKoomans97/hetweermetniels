//#region backend
class LocationItem {
    constructor(locationid, stationid) {
        this.LocationId = locationid;
        this.StationId = stationid;
    }
}

function ListLocations() {
    let locations = [];

    console.log(GetCookie('locations'));
    let database = JSON.parse(GetCookie('locations').Value);

    for (let item of database) {
        locations.push(new LocationItem(item['LocationId'], item['StationId']));
    }

    return locations;
}

function SaveLocation(locationid, stationid) {
    let database = null;

    if (HasCookie('locations')) {
        database = JSON.parse(GetCookie('locations').Value);
    }
    else {
        database = [];
    }

    let item = new LocationItem(locationid, stationid);

    database.push(item);

    SaveCookie(new Cookie('locations', JSON.stringify(database)));
}

function RemoveAllLocations(){
    if (HasCookie('locations')){
        SaveCookie(new Cookie('locations',''));
    }
}
//#endregion

