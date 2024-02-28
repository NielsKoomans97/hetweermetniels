export class SmallObs{
    constructor(location){
        FetchWeather(location);

        async function FetchWeather(location){
            const data = await fetch(`/obs/${location}`);
            const json = await data.json();

            const widget = document.querySelector('.small-obs');
            const icon = widget.querySelector('.cur-ico');
            const temp = widget.querySelector('.cur-temp');

            icon.setAttribute('src', `assets/weathericons/${json['iconcode']}.png`);
            temp.innerText = `${json['temperature']}°`;
        }
    }
}
