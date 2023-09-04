
const stations = document.getElementById('stations');
const chart_frame =document.getElementById('progtemps-embed');

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

if (chart_frame != null){
    // var frame = frames['progtemps-embed'].document;
    var head = chart_frame.getElementsByTagName('head');
    console.log(chart_frame.contentDocument);

    var css_link = document.createElement('link');
    css_link.rel = 'stylesheet';
    css_link.href = 'http://hetweermetniels.nl/css/style.css';
    css_link.type = 'text/css';

    head.appendChild(css_link);
}

if (stations != null) {
    stations.addEventListener('change', () => {
        LoadData();
    });

    Launch();
}

