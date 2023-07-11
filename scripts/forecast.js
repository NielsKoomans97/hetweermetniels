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

                var forecast_icon_container = document.createElement('div');
                forecast_icon_container.className = 'forecast-icon-container';

                var forecast_icon = document.createElement('img');
                forecast_icon.setAttribute('src',`https://cdn.buienradar.nl/resources/images/icons/weather/116x116/${day['iconcode']}.png`);
                forecast_icon.className = 'forecast-icon';

                forecast_icon_container.appendChild(forecast_icon);
                forecast_day.appendChild(forecast_icon_container);

                var forecast_dayText = document.createElement('h5');
                var date = new Date(day['date']);
                var daysInWeek = ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag' ];
                forecast_dayText.innerText = daysInWeek[date.getDay()];
                forecast_dayText.className = 'forecast-date';
                forecast_day.appendChild(forecast_dayText);

                var forecast_shadow_container =document.createElement('div');
                forecast_shadow_container.className = 'forecast-shadow-container';

                var forecast_temp_container = document.createElement('div');
                forecast_temp_container.className = 'forecast-temp-container';

                var forecast_temp_high  = document.createElement('h6');
                forecast_temp_high.innerText = `${day['maxtemp']}°C`;
                forecast_temp_high.className = 'forecast-temp-high';
                forecast_temp_container.appendChild(forecast_temp_high);

                var forecast_temp_low  = document.createElement('h6');
                forecast_temp_low.innerText = `${day['mintemp']}°C`;
                forecast_temp_low.className = 'forecast-temp-low';
                forecast_temp_container.appendChild(forecast_temp_low);

                forecast_shadow_container.appendChild(forecast_temp_container);

                var forecast_wind_container = document.createElement('div');
                forecast_wind_container.className = 'forecast-wind-container';

                var forecast_wind_direction = document.createElement('i');
                forecast_wind_direction.className = 'fas fa-arrow-down forecast-wind-icon';
                forecast_wind_direction.style = `transform: rotate(${day['winddirectiondegrees']}deg);`;
                forecast_wind_container.appendChild(forecast_wind_direction);

                var forecast_wind_speed = document.createElement('h6');
                forecast_wind_speed.className = 'forecast_wind_speed';
                forecast_wind_speed.innerText = `${day['windspeed']} bft`;
                forecast_wind_container.appendChild(forecast_wind_speed);

                forecast_shadow_container.appendChild(forecast_wind_container);

                forecast_day.appendChild(forecast_shadow_container);
            }
        });
}

function CreateIconElement(day, item){
    let forecast_icon = document.createElement('div');
    forecast_icon.className = 'forecast-icon';

    let forecast_icon_img = document.createElement('img');

    forecast_icon_img.setAttribute('src',`https://cdn.buienradar.nl/resources/images/icons/weather/116x116/${day['iconcode']}.png`);
    forecast_icon.appendChild(forecast_icon_img);
    item.appendChild(forecast_icon);
}

function CreateDayElememt(day, item){
    let forecast_day = document.createElement('h5');

    forecast_day.innerText = day['']
}
