if (HasCookie('station-id')){
    let station_id = GetCookie('station-id');
    GetObservations(station_id.Value);
}
else
{
    SaveCookie(new Cookie('station-id','6350'));
    let station_id = GetCookie('station-id');
    GetObservations(station_id.Value);
}

function GetObservations(stationId){
    fetch(`https://observations.buienradar.nl/1.0/actual/weatherstation/${stationId}`)
        .then((response) => (response.json()))
        .then((data) => {
            const actual_temp = document.getElementById('actual-temperature');
            const feel_temp = document.getElementById('feel-temperature');
            const wind_speed = document.getElementById('wind');
            const wind_icon = document.getElementById('wind-arrow')
            const humidity = document.getElementById('humidity');
            const observation_icon = document.getElementById('weather-icon');
            const station_name = document.getElementById('station-name');

            station_name.innerText = `${data['stationname']}`;
            actual_temp.innerText = `${data['temperature']}°`;
            feel_temp.innerText = `${data['feeltemperature']}°`;
            wind_speed.innerText = `${data['windspeedBft']} bft`;
            wind_icon.style = `transform: rotate(${data['winddirectiondegrees']}deg);`;
            humidity.innerText = `${data['humidity']}%`;
            observation_icon.setAttribute('src',`https://cdn.buienradar.nl/resources/images/icons/weather/116x116/${data['iconcode']}.png`);
        });
}
