function ClearAll(element) {
    var delChild = element.lastChild;
    while (delChild) {
        element.removeChild(delChild);
        delChild = element.lastChild;
    }
}

function GetForecast(locationId) {
    fetch(`https://forecast.buienradar.nl/2.0/forecast/${locationId}`)
        .then((response) => (response.json()))
        .then((data) => {
            let day_count = 0;

            const forecast_days = document.querySelectorAll('.forecast-day');

            if (HasCookie('forecast-count')) {
                const forecast_count = GetCookie('forecast-count');

                console.log(forecast_count);

                switch (forecast_count.Value) {
                    case '3 dagen': day_count = 2; break;
                    case '7 dagen': day_count = 6; break;
                    case '14 dagen': day_count = 13; break;
                }
            }
            else {
                day_count = 3;
            }

            console.log(day_count);

            for (let i = 0; i < day_count; i++) {
                let day = data['days'][i + 1];
                let forecast_day = forecast_days[i];

                ClearAll(forecast_day);

                CreateIconElement(forecast_day, day);
                CreateDateElement(forecast_day, day);
                CreateTempElement(forecast_day, day);
                CreateWindElement(forecast_day, day);
            }

            let dayZero = data['days'][0];
            const hourlyForecast = document.getElementById('hourly-forecast');

            ClearAll(hourlyForecast);

            for (let hour of dayZero['hours']) {
                let forecast_hour = document.createElement('div');
                forecast_hour.className = 'forecast-hour';

                CreateIconElement(forecast_hour, hour);
                CreateTimeElement(forecast_hour, hour);
                CreateHourlyTempElement(forecast_hour, hour);
                CreateWindElement(forecast_hour, hour);
                CreateHumidityElement(forecast_hour, hour);

                hourlyForecast.appendChild(forecast_hour);
            }
        });
}

function GetAnnouncements() {
    const announcements = document.getElementById('announcements');
    const warnings_today = document.getElementById('warnings-today');
    const warning_title = document.getElementById('warning-title');

    fetch('https://data.buienradar.nl/1.0/announcements/apps')
        .then((response) => (response.json()))
        .then((data) => {
            if (data['warnings']['color'] == 'GREEN') {
                announcements.setAttribute('style', 'display:none !important');
                warnings_today.setAttribute('style', 'display:none;');
            }
            else {
                announcements.setAttribute('data-color', data['warnings']['color']);
                warning_title.innerText = data['warnings']['title'];
                warnings_today.setAttribute('src', data['warnings']['daySummaries']['day1']['image']);
            }
        });
}

function GetWeatherReport(country) {
    fetch(`https://data.buienradar.nl/1.1/content/weatherreport/${country}/false`)
        .then((response) => (response.json()))
        .then((data) => {
            const guidance = document.getElementById('guidance-text');
            guidance.innerHTML = data['body'];
        });
}

function CreateIconElement(root, day) {
    let icon = document.createElement('img');

    icon.className = 'forecast-icon';
    icon.setAttribute('src', `https://cdn.buienradar.nl/resources/images/icons/weather/116x116/${day['iconcode']}.png`);

    root.appendChild(icon);
}

function FixInteger(int) {
    if (int < 10) {
        return `0${int}`;
    }

    return int;
}

function CreateTimeElement(root, day) {
    let pTime = new Date(day['datetime']);
    let time = document.createElement('h6');

    time.className = 'forecast-time';
    time.innerText = `${FixInteger(pTime.getHours())}:${FixInteger(pTime.getMinutes())}`;

    root.appendChild(time);
}

function CreateDateElement(root, day) {
    var daysInWeek = ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'];
    let pDate = new Date(day['date']);
    let date = document.createElement('h5');

    date.className = 'forecast-date';
    date.innerText = `${daysInWeek[pDate.getDay()]}`;

    root.appendChild(date);
}

function CreateTempElement(root, day) {
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

function CreateHourlyTempElement(root, day) {
    let tempContainer = document.createElement('div');
    tempContainer.className = 'forecast-temp';

    let temp = document.createElement('h4');
    temp.className = 'hourly';
    temp.innerText = `${day['temperature']}°C`;

    tempContainer.appendChild(temp);
    root.appendChild(tempContainer);
}

function CreateWindElement(root, day) {
    let windContainer = document.createElement('div');
    windContainer.className = 'forecast-wind';

    let windDirection = document.createElement('i');
    windDirection.className = 'fas fa-arrow-down icon';
    windDirection.style = `transform: rotate(${day['winddirectiondegrees']}deg);`;

    let windSpeed = document.createElement('h6');
    windSpeed.className = 'speed';
    windSpeed.innerText = `${day['beaufort']} bft`;

    windContainer.appendChild(windDirection);
    windContainer.appendChild(windSpeed);

    root.appendChild(windContainer);
}

function CreateHumidityElement(root, day) {
    let humidityContainer = document.createElement('div');
    humidityContainer.className = 'forecast-humidity';

    let humidityIcon = document.createElement('i');
    humidityIcon.className = 'fas fa-droplet'

    let humdity = document.createElement('h6');
    humdity.className = 'humidity';
    humdity.innerText = `${day['humidity']}%`;

    humidityContainer.appendChild(humidityIcon);
    humidityContainer.appendChild(humdity);
    root.append(humidityContainer);
}
