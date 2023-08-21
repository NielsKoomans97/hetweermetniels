function GetObservations(stationId){
    fetch(`https://observations.buienradar.nl/1.0/actual/weatherstation/${stationId}`)
        .then((response) => (response.json()))
        .then((data) => {
            const actual_temp = document.getElementById('observation-temp');
            const feel_temp = document.getElementById('observation-feel');
            const wind_speed = document.getElementById('observation-wind');
            const wind_icon = document.querySelector('.fa-arrow-down');
            const humidity = document.getElementById('observation-humid');
            const observation_icon = document.getElementById('observation-icon');
            const pressure = document.getElementById('observation-pressure');
            const rainamt = document.getElementById('observation-rainamt');

            pressure.innerText = `${data['airpressure']} hPa`;
            actual_temp.innerText = `${data['temperature']}°`;
            feel_temp.innerText = `${data['feeltemperature']}°`;
            wind_speed.innerText = `${data['windspeedBft']} bft`;
            wind_icon.setAttribute('style', `transform: rotate(${data['winddirectiondegrees']}deg);`);
            humidity.innerText = `${data['humidity']}%`;
            observation_icon.setAttribute('src',`https://cdn.buienradar.nl/resources/images/icons/weather/116x116/${data['iconcode']}.png`);
            rainamt.innerText = `${data['precipitationmm']} mm`
        });
}
