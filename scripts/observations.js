export class ObservationsWidget {
    constructor(stationId) {
        this.StationId = stationId;
        Refresh();
    }

    async GetObservationData(stationId) {
        const data = await fetch(``);
        const json = await data.json();

        return json;
    }

    async Refresh() {
        const icon = document.getElementById('icon');
        const temperature = document.getElementById('temperature');
        const precipitation = document.getElementById('precipitation');
        const windDirection = document.getElementById('wind-direction');
        const windSpeed = document.getElementById('windspeed');
        const json = this.GetObservationData(this.StationId);

        icon.setAttribute('src', `https://cdn.buienradar.nl/resources/images/icons/weather/116x116/${json['iconcode']}.png`);
        temperature.innerText = `${json['temperature']}°`;
        precipitation.innerText = `${json['precipitationmm']} mm`;
        windSpeed.innerText = `${json['windspeedBft']} bft`;
        windDirection.setAttribute('style', `transform: rotate(${parseInt(json['winddirectiondegrees'])}deg);`);
    }
}
