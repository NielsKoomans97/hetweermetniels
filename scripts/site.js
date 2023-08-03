
const stations = document.getElementById('stations');

if (HasCookie('locations')){
    const database = ListLocations();

    for(let item of database){
        let option = document.createElement('option');
        option.setAttribute('data-json', item);

        let parsed = JSON.parse(item);
        option.innerText = parsed['name'];
        
        stations.appendChild(option);
    }

    stations.selectedIndex = 0;
}
else{
    var locations = await Search('de bilt');
    SaveLocation(locations[0]);
}

stations.addEventListener('change', () => {
    var option = stations.options[stations.selectedIndex];
    let json = JSON.parse(option.getAttribute('data-json'));

    GetObservations(json['weatherstationid']);
    GetForecast(json['id']);
    GetWeatherReport('nl');
    GetAnnouncements();
});

var option = stations.options[stations.selectedIndex];
let json = JSON.parse(option.getAttribute('data-json'));

GetObservations(json['weatherstationid']);
GetForecast(json['id']);
GetWeatherReport('nl');
GetAnnouncements();
