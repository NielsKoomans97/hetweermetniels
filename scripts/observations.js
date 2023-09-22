export class ObservationsWidget {
    constructor(stationId) {
        this.StationId = stationId;
    }

    async GetObservationData(stationId) {
        const data = await fetch(`https://observations.buienradar.nl/1.0/actual/weatherstation/${stationId}`);
        const json = await data.json();

        return json;
    }

    async Refresh() {
        const icon = document.getElementById('icon');
        const temperature = document.getElementById('temperature');
        const precipitation = document.getElementById('precipitation');
        const windDirection = document.getElementById('wind-direction');
        const windSpeed = document.getElementById('wind-speed');
        const json = await this.GetObservationData(this.StationId);

        icon.setAttribute('src', `https://cdn.buienradar.nl/resources/images/icons/weather/116x116/${json['iconcode']}.png`);
        temperature.innerText = `${json['temperature']}°`;
        precipitation.innerText = `${json['precipitationmm']} mm`;
        windSpeed.innerText = `${json['windspeedBft']} bft`;
        windDirection.setAttribute('style', `transform: rotate(${parseInt(json['winddirectiondegrees'])}deg);`);
    }
}
