
const stations = document.getElementById('stations');

if (HasCookie('locations')){
    const database = ListLocations();

    for(let item of database){
        let option = document.createElement('option');
        option.setAttribute('data-locationid',item.LocationId);
        option.setAttribute('data-stationid',item.StationId);
        stations.appendChild(option);
    }

    stations.selectedIndex = 0;
}
else{
   SaveLocation('2757783','6260');
}

SaveLocation('2756800','6350');

stations.addEventListener('change', () => {
    var option = stations.options[stations.selectedIndex];

    GetObservations(option.getAttribute('data-stationid'));
    GetForecast(option.getAttribute('data-locationid'));
    GetWeatherReport('nl');
    GetAnnouncements();
});

var option = stations.options[stations.selectedIndex];

GetObservations(option.getAttribute('data-stationid'));
GetForecast(option.getAttribute('data-locationid'));
GetWeatherReport('nl');
GetAnnouncements();

console.log(stations);