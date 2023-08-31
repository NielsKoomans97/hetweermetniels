
const stations = document.getElementById('stations');

function LoadLocations() {
    const database = ListLocations();

    for (let item of database) {
        let option = document.createElement('option');
        option.setAttribute('data-json', item);

        let parsed = JSON.parse(item);
        option.innerText = parsed['name'];

        stations.appendChild(option);
    }

    stations.selectedIndex = 0;
}

function LoadData() {
    var option = stations.options[stations.selectedIndex];
    let json = JSON.parse(option.getAttribute('data-json'));

    GetObservations(json['weatherstationid']);
    GetForecast(json['id']);
    GetWeatherReport('nl');
    GetAnnouncements();
}

async function Launch() {
    if (HasCookie('locations')) {
        LoadLocations();
        LoadData();
    }
    else {
        await SaveDefaultLocation()
            .then(() => {
                LoadLocations();
                LoadData();
            });
    }
}

if (stations != null) {
    stations.addEventListener('change', () => {
        LoadData();
    });

    Launch();
}

