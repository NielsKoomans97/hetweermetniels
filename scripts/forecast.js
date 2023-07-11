if (HasCookie('location-id')){
    var location_id = GetCookie('location-id').Value;
    GetForecast(location_id);
}
else
{
    SaveCookie(new Cookie('location-id','2756800'))
    var location_id = GetCookie('location-id').Value;
    GetForecast(location_id);
}

function GetForecast(locationId) {
    fetch(`https://forecast.buienradar.nl/2.0/forecast/${locationId}`)
        .then((response) => (response.json()))
        .then((data) => {
            const forecast_days = document.querySelectorAll('.forecast-day');

            for (let i = 0; i < 3; i++) {
                let day = data['days'][i];
                let forecast_day = forecast_days[i];

                CreateIconElement(forecast_day, day);
                CreateDateElement(forecast_day, day);
                CreateTempElement(forecast_day, day);
                CreateWindElement(forecast_day, day);
            }
        });
}

function CreateIconElement(root, day){
    let icon = document.createElement('img');

    icon.className = 'forecast-icon';
    icon.setAttribute('src',`https://cdn.buienradar.nl/resources/images/icons/weather/116x116/${day['iconcode']}.png`);

    root.appendChild(icon);
}

function CreateDateElement(root, day){
    var daysInWeek = ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag' ];
    let pDate = new Date(day['date']);
    let date = document.createElement('h5');

    date.className = 'forecast-date';
    date.innerText = daysInWeek[pDate.getDay()];

    root.appendChild(date);
}

function CreateTempElement(root, day){
    let tempContainer = document.createElement('div');
    tempContainer.className = 'forecast-temp';

    let tempHigh = document.createElement('h6');
    tempHigh.className = 'high';
    tempHigh.innerText = `${day['maxtemp']}°C`;
    tempContainer.appendChild(tempHigh);

    let tempLow = document.createElement('h6');
    tempLow.className = 'low';
    tempLow.innerText = `${day['mintemp']}°C`;
    tempContainer.appendChild(tempLow);

    root.appendChild(tempContainer);
}

function CreateWindElement(root, day){
    let windContainer = document.createElement('div');
    windContainer.className = 'forecast-wind';

    let windDirection = document.createElement('i');
    windDirection.className = 'fas fa-arrow-down icon';
    windDirection.style = `transform: rotate(${day['winddirectiondegrees']}deg);`;

    let windSpeed = document.createElement('h6');
    windSpeed.className = 'speed';
    windSpeed.innerText = `${day['windspeed']} bft`;

    windContainer.appendChild(windDirection);
    windContainer.appendChild(windSpeed);

    root.appendChild(windContainer);
}