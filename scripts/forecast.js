export class Forecast{
    constructor(locationId)
    {
        this.LocationId = locationId;
    }

    async GetForecastData(){
        const data = await fetch(`https://forecast.buienradar.nl/2.0/forecast/${this.LocationId}`);
        const json = await data.json();

        return json;
    }

    async Refresh(){
        const forecastDays = document.getElementById('forecast-days');
        const data = await this.GetForecastData();
        const days = data['days'];

        days.forEach(day => {
            BuildForecastDay(forecastDays, day);
        });

        function BuildForecastDay(root, data){

        }
    }
}
