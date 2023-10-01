//#region backend
function ListLocations() {
    let locations = [];
    let database = JSON.parse(GetCookie('locations').Value);

    for (let item of database) {
        locations.push(item);
    }

    return locations;
}

function SaveLocation(item) {
    let database = null;

    if (HasCookie('locations')) {
        database = JSON.parse(GetCookie('locations').Value);
    }
    else {
        database = [];
    }

    database.push(item);

    SaveCookie(new Cookie('locations', JSON.stringify(database)));
}

function RemoveAllLocations() {
    if (HasCookie('locations')) {
        SaveCookie(new Cookie('locations', ''));
    }
}

function RemoveLocation(item) {
    const data = JSON.parse(item.getAttribute('data-json'));
    const locations = ListLocations();

    for (let i = 0; i < locations.length; i++) {
        const location = JSON.parse(locations[i]);

        if (location['name'] == data['name']) {
            locations.splice(i, i);
        }
    }

    SaveCookie(new Cookie('locations', JSON.stringify(locations)));
}

function Search(query) {
    let finalResult = fetch(`https://location.buienradar.nl/1.1/location/search?query=${query}`)
        .then((response) => (response.json()))
        .then((data) => {
            let results = [];

            for (let result of data) {
                results.push(result);
            }

            return results;
        });

    return finalResult;
}

async function SaveDefaultLocation() {
    let results = await Search('de bilt');
    let de_bilt = JSON.stringify(results[0]);
    SaveLocation(de_bilt);
}
//#endregion

