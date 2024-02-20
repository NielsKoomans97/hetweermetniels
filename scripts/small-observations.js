export class SmallObservations {
    constructor() {
        const widget = document.querySelector('.observations.small');
        const icon = widget.querySelector('.icon');
        const location = widget.querySelector('.location');
        const temperature = widget.querySelector('.temperature');

        FetchObservations();

        async function FetchObservations(){
            const data = await fetch('/data/observations/6350');
            const json = await data.json();

            icon.setAttribute('src',`https://cdn.buienradar.nl/resources/images/icons/weather/116x116/${json['iconcode']}.png`);
            location.innerText = json['regio'];
            temperature.innerText = `${json['temperature']}°`;
        }
    }
}


